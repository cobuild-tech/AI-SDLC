import copy
from datetime import datetime, timezone
from typing import Any, Protocol


class TicketStore(Protocol):
    def create(self, ticket: dict[str, Any]) -> dict[str, Any]: ...

    def get_by_id(self, ticket_id: str) -> dict[str, Any] | None: ...


class InMemoryTicketStore:
    def __init__(self) -> None:
        self._tickets: dict[str, dict[str, Any]] = {}
        self._sequence = 1000

    def create(self, ticket: dict[str, Any]) -> dict[str, Any]:
        self._sequence += 1
        stored = {
            **ticket,
            "id": f"T-{self._sequence}",
            "createdAt": datetime.now(timezone.utc).isoformat(timespec="milliseconds").replace("+00:00", "Z"),
        }
        self._tickets[stored["id"]] = stored
        return copy.deepcopy(stored)

    def get_by_id(self, ticket_id: str) -> dict[str, Any] | None:
        ticket = self._tickets.get(ticket_id)
        return copy.deepcopy(ticket) if ticket else None


def create_in_memory_ticket_store() -> InMemoryTicketStore:
    return InMemoryTicketStore()
