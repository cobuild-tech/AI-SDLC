import json
from pathlib import Path
from typing import Any

SEED_FILE = Path(__file__).resolve().parent.parent / "data" / "seed-tickets.json"
tickets: list[dict[str, Any]] = json.loads(SEED_FILE.read_text(encoding="utf-8"))

_comments: dict[int, list[str]] = {}


def _invalid_comment(code: str, message: str) -> dict[str, Any]:
    return {"status": 400, "body": {"error": {"code": code, "message": message}}}


def add_ticket_comment(
    ticket_id: int, message: str, store: dict[int, list[str]] | None = None
) -> dict[str, Any]:
    comments_by_ticket = _comments if store is None else store
    text = message.strip() if isinstance(message, str) else ""
    if not text:
        return _invalid_comment("EMPTY_COMMENT", "comment is required")

    if not any(ticket["id"] == ticket_id for ticket in tickets):
        return _invalid_comment("UNKNOWN_TICKET", "ticket was not found")

    comments = [*comments_by_ticket.get(ticket_id, []), text]
    comments_by_ticket[ticket_id] = comments
    return {"status": 200, "body": {"ticketId": ticket_id, "comments": comments}}
