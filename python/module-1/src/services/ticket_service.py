from src.data.tickets import tickets
from src.models.ticket import Ticket, TicketStatus


def list_tickets(status: TicketStatus | None = None) -> list[Ticket]:
    if status is None:
        return tickets

    return [ticket for ticket in tickets if ticket.status == status]
