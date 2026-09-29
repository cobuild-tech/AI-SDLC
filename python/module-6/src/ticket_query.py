import json
from pathlib import Path
from typing import Any

SEED_FILE = Path(__file__).resolve().parent.parent / "data" / "seed-tickets.json"
tickets: list[dict[str, Any]] = json.loads(SEED_FILE.read_text(encoding="utf-8"))

VALID_STATUSES = ["open", "in_progress", "closed"]
VALID_PRIORITIES = ["normal", "medium", "high", "critical"]


def invalid_query(code: str, message: str) -> dict[str, Any]:
    return {"status": 400, "body": {"error": {"code": code, "message": message}}}


def handle_list_tickets(query: dict[str, str] | None = None) -> dict[str, Any]:
    query = query or {}
    status = query.get("status", "").lower()
    if status and status not in VALID_STATUSES:
        return invalid_query("INVALID_STATUS", "status is not supported")

    priority = query.get("priority", "").lower()
    if priority and priority not in VALID_PRIORITIES:
        return invalid_query("INVALID_PRIORITY", "priority is not supported")

    items = [
        ticket
        for ticket in tickets
        if (not status or ticket["status"] == status)
        and (not priority or ticket["priority"] == priority)
    ]
    return {"status": 200, "body": {"items": items, "total": len(items)}}
