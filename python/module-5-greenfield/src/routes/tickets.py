from typing import Any

from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse

from src.models.ticket import TicketInput
from src.services.ticket_service import TicketService

ALLOWED_KEYS = {"title", "description", "customerTier"}


def trimmed(value: Any) -> str:
    return value.strip() if isinstance(value, str) else ""


def parse_ticket_input(value: Any) -> TicketInput | None:
    if not isinstance(value, dict) or not set(value) <= ALLOWED_KEYS:
        return None

    title = trimmed(value.get("title"))
    description = trimmed(value.get("description"))
    customer_tier = value.get("customerTier")

    if not title or len(title) > 120 or not description or len(description) > 2000:
        return None
    if customer_tier not in ("standard", "enterprise"):
        return None

    return TicketInput(title=title, description=description, customerTier=customer_tier)


def parse_ticket_id(value: str) -> int | None:
    if not (value.isascii() and value.isdigit()):
        return None
    ticket_id = int(value)
    return ticket_id if ticket_id > 0 else None


def create_tickets_router(service: TicketService) -> APIRouter:
    router = APIRouter()

    @router.post("")
    async def create_ticket(request: Request) -> JSONResponse:
        try:
            body = await request.json()
        except ValueError:
            body = None
        ticket_input = parse_ticket_input(body)
        if ticket_input is None:
            return JSONResponse(status_code=400, content={"error": "Invalid ticket"})
        ticket = service.create(ticket_input)
        return JSONResponse(status_code=201, content=ticket.model_dump(by_alias=True))

    @router.get("/{ticket_id}")
    def get_ticket(ticket_id: str) -> JSONResponse:
        parsed_id = parse_ticket_id(ticket_id)
        if parsed_id is None:
            return JSONResponse(status_code=400, content={"error": "Invalid ticket id"})
        ticket = service.get_by_id(parsed_id)
        if ticket is None:
            return JSONResponse(status_code=404, content={"error": "Ticket not found"})
        return JSONResponse(content=ticket.model_dump(by_alias=True))

    return router
