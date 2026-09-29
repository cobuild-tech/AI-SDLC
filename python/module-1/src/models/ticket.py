from typing import Literal, TypeGuard

from pydantic import BaseModel

TicketStatus = Literal["open", "in_progress", "closed"]

TICKET_STATUSES: tuple[TicketStatus, ...] = ("open", "in_progress", "closed")


def is_ticket_status(value: object) -> TypeGuard[TicketStatus]:
    return isinstance(value, str) and value in TICKET_STATUSES


class Ticket(BaseModel):
    id: int
    title: str
    status: TicketStatus
