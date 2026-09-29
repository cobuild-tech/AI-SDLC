from typing import Any

from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse

from src.models.ticket import Ticket, is_ticket_status
from src.services.ticket_service import list_tickets, update_ticket_status

router = APIRouter()


def error(status_code: int, message: str) -> JSONResponse:
    return JSONResponse(status_code=status_code, content={"error": message})


def parse_ticket_id(value: str) -> int | None:
    if not (value.isascii() and value.isdigit()):
        return None
    ticket_id = int(value)
    return ticket_id if ticket_id > 0 else None


async def read_json(request: Request) -> Any:
    try:
        return await request.json()
    except ValueError:
        return None


@router.get("")
def get_tickets() -> dict[str, list[Ticket]]:
    return {"tickets": list_tickets()}


@router.patch("/{ticket_id}/status", response_model=None)
async def patch_ticket_status(ticket_id: str, request: Request) -> dict[str, Ticket] | JSONResponse:
    parsed_id = parse_ticket_id(ticket_id)

    if parsed_id is None:
        return error(400, "Invalid ticket id")

    body = await read_json(request)
    status = body.get("status") if isinstance(body, dict) else None

    if not is_ticket_status(status):
        return error(400, "Invalid status")

    result = update_ticket_status(parsed_id, status)

    if result == "not_found":
        return error(404, "Ticket not found")

    if result == "invalid_transition":
        return error(400, "Invalid status transition")

    return {"ticket": result}
