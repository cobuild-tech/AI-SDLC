from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from src.repositories.ticket_repository import InMemoryTicketRepository
from src.routes.tickets import create_tickets_router
from src.services.ticket_service import TicketService


async def not_found(_request: Request, _error: Exception) -> JSONResponse:
    return JSONResponse(status_code=404, content={"error": "Not found"})


def create_app() -> FastAPI:
    app = FastAPI()
    service = TicketService(InMemoryTicketRepository())

    @app.get("/health")
    def health() -> dict[str, str]:
        return {"status": "ok"}

    app.include_router(create_tickets_router(service), prefix="/api/tickets")
    app.add_exception_handler(404, not_found)
    app.add_exception_handler(405, not_found)
    return app
