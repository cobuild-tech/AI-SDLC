from dataclasses import dataclass
from typing import Literal

from pydantic import BaseModel

TicketPriority = Literal["normal", "medium", "high", "critical"]


class Ticket(BaseModel):
    id: int
    title: str
    priority: TicketPriority
    owner: str | None
    status: Literal["open", "in_progress", "closed"]


@dataclass(frozen=True)
class TicketFilters:
    priority: TicketPriority | None = None


class TicketList(BaseModel):
    items: list[Ticket]
    total: int
