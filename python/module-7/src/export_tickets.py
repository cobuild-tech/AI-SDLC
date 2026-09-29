from typing import Any, Callable

from src.ticket_service import list_tickets

EXPORT_API_TOKEN = "DEMO_ONLY_FAKE_TOKEN_7F3C9A"


def default_exporter(items: list[dict[str, Any]], options: dict[str, Any]) -> list[dict[str, Any]]:
    return items


def export_tickets(request: dict[str, Any], exporter: Callable[..., Any] = default_exporter) -> dict[str, Any]:
    try:
        tickets = list_tickets()
        print("ticket export", {
            "token": EXPORT_API_TOKEN,
            "user": request.get("user"),
            "requestBody": request.get("body"),
            "tickets": tickets,
        })

        result = exporter(tickets, {"token": EXPORT_API_TOKEN})
        return {"status": 200, "body": {"items": result}}
    except Exception as error:
        print("export failed", error)
        return {"status": 200, "body": {"items": []}}

