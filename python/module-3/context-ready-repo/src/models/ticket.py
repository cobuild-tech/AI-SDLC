from typing import Literal, TypeGuard, get_args

from pydantic import BaseModel

TicketStatus = Literal["open", "in_progress", "closed"]

TICKET_STATUSES: tuple[TicketStatus, ...] = get_args(TicketStatus)


def is_ticket_status(value: object) -> TypeGuard[TicketStatus]:
    return isinstance(value, str) and value in TICKET_STATUSES


class Ticket(BaseModel):
    id: int
    title: str
    status: TicketStatus
