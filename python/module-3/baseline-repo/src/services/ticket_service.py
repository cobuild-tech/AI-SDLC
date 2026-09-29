from src.data.tickets import tickets
from src.models.ticket import Ticket


def list_tickets() -> list[Ticket]:
    return tickets
