from typing import Protocol

from src.models.ticket import Ticket


class TicketRepository(Protocol):
    def next_id(self) -> int: ...

    def save(self, ticket: Ticket) -> Ticket: ...

    def find_by_id(self, ticket_id: int) -> Ticket | None: ...


class InMemoryTicketRepository:
    def __init__(self) -> None:
        self._tickets: dict[int, Ticket] = {}
        self._sequence = 0

    def next_id(self) -> int:
        self._sequence += 1
        return self._sequence

    def save(self, ticket: Ticket) -> Ticket:
        self._tickets[ticket.id] = ticket
        return ticket

    def find_by_id(self, ticket_id: int) -> Ticket | None:
        return self._tickets.get(ticket_id)
