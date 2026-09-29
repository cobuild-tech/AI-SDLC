from typing import Literal

from pydantic import BaseModel

TicketStatus = Literal["open", "in_progress", "closed"]


class Ticket(BaseModel):
    id: int
    title: str
    status: TicketStatus
