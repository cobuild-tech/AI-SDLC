import logging
from typing import Any, Callable, Protocol

from src.authorization import has_role
from src.ticket_service import list_tickets


class ExportLogger(Protocol):
    def info(self, message: str, metadata: dict[str, Any]) -> None: ...

    def error(self, message: str, metadata: dict[str, Any]) -> None: ...


class StandardLogger:
    def __init__(self) -> None:
        self._logger = logging.getLogger(__name__)

    def info(self, message: str, metadata: dict[str, Any]) -> None:
        self._logger.info("%s %s", message, metadata)

    def error(self, message: str, metadata: dict[str, Any]) -> None:
        self._logger.error("%s %s", message, metadata)


def error(status: int, code: str, message: str) -> dict[str, Any]:
    return {"status": status, "body": {"error": {"code": code, "message": message}}}


def to_export_record(ticket: dict[str, Any]) -> dict[str, Any]:
    return {
        "id": ticket["id"],
        "title": ticket["title"],
        "status": ticket["status"],
        "priority": ticket["priority"],
    }


def default_exporter(items: list[dict[str, Any]]) -> list[dict[str, Any]]:
    return items


def export_tickets(
    request: dict[str, Any],
    exporter: Callable[[list[dict[str, Any]]], Any] = default_exporter,
    logger: ExportLogger = StandardLogger(),
) -> dict[str, Any]:
    user = request.get("user")
    if not has_role(user, "manager"):
        return error(403, "FORBIDDEN", "manager role required")

    actor_id = user["id"]
    try:
        safe_tickets = [to_export_record(ticket) for ticket in list_tickets()]
        logger.info("ticket export completed", {"actorId": actor_id, "itemCount": len(safe_tickets)})
        result = exporter(safe_tickets)
        return {"status": 200, "body": {"items": result}}
    except Exception as failure:
        logger.error("ticket export failed", {"actorId": actor_id, "errorName": type(failure).__name__})
        return error(500, "EXPORT_FAILED", "ticket export failed")
