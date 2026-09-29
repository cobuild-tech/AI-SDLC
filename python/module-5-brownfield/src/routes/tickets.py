from typing import cast

from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse

from src.models.ticket import TicketFilters, TicketList, TicketPriority
from src.services.ticket_query_service import list_tickets

SUPPORTED_PRIORITIES = {"normal", "medium", "high", "critical"}

router = APIRouter()


@router.get("", response_model=None)
def get_tickets(request: Request) -> TicketList | JSONResponse:
    priority = request.query_params.getlist("priority")

    if priority and (len(priority) != 1 or priority[0] not in SUPPORTED_PRIORITIES):
        return JSONResponse(
            status_code=400,
            content={
                "error": {
                    "code": "INVALID_PRIORITY",
                    "message": "priority must be normal, medium, high, or critical",
                },
            },
        )

    return list_tickets(TicketFilters(priority=cast(TicketPriority, priority[0]) if priority else None))
