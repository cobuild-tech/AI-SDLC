from fastapi import APIRouter

from src.models.ticket import Ticket
from src.services.ticket_service import list_tickets

router = APIRouter()


@router.get("")
def get_tickets() -> dict[str, list[Ticket]]:
    return {"tickets": list_tickets()}
