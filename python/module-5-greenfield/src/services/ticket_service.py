from src.models.ticket import Ticket, TicketInput
from src.repositories.ticket_repository import TicketRepository
from src.services.triage_service import triage_ticket


class TicketService:
    def __init__(self, repository: TicketRepository) -> None:
        self._repository = repository

    def create(self, ticket_input: TicketInput) -> Ticket:
        triage = triage_ticket(ticket_input)
        return self._repository.save(
            Ticket(
                id=self._repository.next_id(),
                title=ticket_input.title,
                description=ticket_input.description,
                customerTier=ticket_input.customer_tier,
                status="open",
                priority=triage.priority,
                team=triage.team,
            )
        )

    def get_by_id(self, ticket_id: int) -> Ticket | None:
        return self._repository.find_by_id(ticket_id)
