from fastapi import APIRouter
from fastapi.responses import JSONResponse

from src.models.ticket import Ticket, is_ticket_status
from src.services.ticket_service import list_tickets

router = APIRouter()


@router.get("", response_model=None)
def get_tickets(status: str | None = None) -> dict[str, list[Ticket]] | JSONResponse:
    if status is not None and not is_ticket_status(status):
        return JSONResponse(
            status_code=400,
            content={"error": "status must be one of: open, in_progress, closed"},
        )

    return {"tickets": list_tickets(status)}
