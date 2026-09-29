import json
import re
from typing import Any, Protocol

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from src.domain.store import TicketStore
from src.domain.triage import triage_ticket
from src.security.auth import is_authorized

MAX_BODY_BYTES = 32 * 1024


class AuditSink(Protocol):
    def write(self, event: dict[str, Any]) -> None: ...


class HttpError(Exception):
    def __init__(self, status_code: int, message: str) -> None:
        super().__init__(message)
        self.status_code = status_code


async def read_json_body(request: Request) -> Any:
    chunks = []
    size = 0

    async for chunk in request.stream():
        size += len(chunk)
        if size > MAX_BODY_BYTES:
            raise HttpError(413, "payload too large")
        chunks.append(chunk)

    try:
        return json.loads(b"".join(chunks))
    except ValueError:
        raise HttpError(400, "invalid JSON") from None


def validate_details(body: Any) -> None:
    details = body if isinstance(body, dict) else {}
    summary = details.get("summary")
    if not isinstance(summary, str) or len(summary.strip()) < 5:
        raise ValueError("invalid summary")
    email = details.get("requesterEmail")
    if not isinstance(email, str) or "@" not in email:
        raise ValueError("invalid requesterEmail")


def create_app(*, api_key: str | None, store: TicketStore, audit_sink: AuditSink) -> FastAPI:
    app = FastAPI()

    async def not_found(_request: Request, _error: Exception) -> JSONResponse:
        return JSONResponse(status_code=404, content={"error": "not found"})

    app.add_exception_handler(404, not_found)
    app.add_exception_handler(405, not_found)

    @app.get("/health")
    def health() -> dict[str, str]:
        return {"status": "ok"}

    @app.post("/tickets")
    async def create_ticket(request: Request) -> JSONResponse:
        if not is_authorized(request.headers, api_key):
            return JSONResponse(status_code=401, content={"error": "unauthorized"})

        try:
            body = await read_json_body(request)
            validate_details(body)
            triage = triage_ticket(body)
        except HttpError as error:
            return JSONResponse(status_code=error.status_code, content={"error": str(error)})
        except ValueError as error:
            return JSONResponse(status_code=400, content={"error": str(error)})

        ticket = store.create(
            {
                **triage,
                "summary": body["summary"].strip(),
                "requesterEmail": body["requesterEmail"].strip(),
            }
        )

        audit_sink.write(
            {
                "action": "ticket.created",
                "ticketId": ticket["id"],
                "priority": ticket["priority"],
                "queue": ticket["queue"],
                "reasonCodes": ticket["decisionReasons"],
            }
        )
        return JSONResponse(status_code=201, content=ticket)

    @app.get("/tickets/{ticket_id}")
    def get_ticket(ticket_id: str, request: Request) -> JSONResponse:
        if not is_authorized(request.headers, api_key):
            return JSONResponse(status_code=401, content={"error": "unauthorized"})

        ticket = store.get_by_id(ticket_id) if re.fullmatch(r"T-\d+", ticket_id) else None
        if ticket is None:
            return JSONResponse(status_code=404, content={"error": "not found"})
        return JSONResponse(content=ticket)

    return app
