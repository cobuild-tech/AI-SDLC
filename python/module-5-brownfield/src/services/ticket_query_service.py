from src.data.tickets import tickets
from src.models.ticket import TicketFilters, TicketList


def list_tickets(filters: TicketFilters = TicketFilters()) -> TicketList:
    items = [
        ticket
        for ticket in tickets
        if not filters.priority or ticket.priority == filters.priority
    ]

    return TicketList(items=items, total=len(items))
