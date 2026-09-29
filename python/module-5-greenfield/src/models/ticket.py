from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

CustomerTier = Literal["standard", "enterprise"]
TicketPriority = Literal["normal", "medium", "high", "critical"]
TicketTeam = Literal["support", "billing", "customer-success", "platform"]


class TicketInput(BaseModel):
    model_config = ConfigDict(frozen=True)

    title: str
    description: str
    customer_tier: CustomerTier = Field(alias="customerTier")


class Ticket(TicketInput):
    id: int
    status: Literal["open"]
    priority: TicketPriority
    team: TicketTeam
