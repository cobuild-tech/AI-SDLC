import json
from pathlib import Path
from typing import Any

DATA_FILE = Path(__file__).resolve().parent.parent / "data" / "tickets.json"
tickets: list[dict[str, Any]] = json.loads(DATA_FILE.read_text(encoding="utf-8"))


def list_tickets() -> list[dict[str, Any]]:
    return list(tickets)
