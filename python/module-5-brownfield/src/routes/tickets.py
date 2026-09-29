from typing import cast

from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse

from src.models.ticket import TicketFilters, TicketList, TicketPriority
from src.services.ticket_query_service import list_tickets

SUPPORTED_PRIORITIES = {"normal", "medium", "high", "critical"}

router = APIRouter()


def invalid_query(code: str, message: str) -> JSONResponse:
    return JSONResponse(status_code=400, content={"error": {"code": code, "message": message}})


@router.get("", response_model=None)
def get_tickets(request: Request) -> TicketList | JSONResponse:
    priority = request.query_params.getlist("priority")
    unassigned = request.query_params.getlist("unassigned")

    if len(priority) > 1 or (priority and priority[0].lower() not in SUPPORTED_PRIORITIES):
        return invalid_query("INVALID_PRIORITY", "priority must be normal, medium, high, or critical")

    if len(unassigned) > 1 or (unassigned and unassigned[0] not in ("true", "false")):
        return invalid_query("INVALID_UNASSIGNED", "unassigned must be true or false")

    return list_tickets(
        TicketFilters(
            priority=cast(TicketPriority, priority[0].lower()) if priority else None,
            unassigned=unassigned[0] == "true" if unassigned else None,
        )
    )
