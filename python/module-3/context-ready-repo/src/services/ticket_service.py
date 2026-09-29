from typing import Literal

from src.data.tickets import tickets
from src.models.ticket import Ticket, TicketStatus


def list_tickets() -> list[Ticket]:
    return tickets


UpdateTicketStatusFailure = Literal["not_found", "invalid_transition"]

ALLOWED_TRANSITIONS: dict[TicketStatus, TicketStatus] = {
    "open": "in_progress",
    "in_progress": "closed",
}


def update_ticket_status(
    ticket_id: int, next_status: TicketStatus
) -> Ticket | UpdateTicketStatusFailure:
    ticket = next((candidate for candidate in tickets if candidate.id == ticket_id), None)

    if ticket is None:
        return "not_found"

    if ALLOWED_TRANSITIONS.get(ticket.status) != next_status:
        return "invalid_transition"

    ticket.status = next_status
    return ticket
