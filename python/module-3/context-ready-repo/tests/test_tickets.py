import pytest
from fastapi.testclient import TestClient

from src.app import create_app


def test_get_tickets_returns_all_tickets() -> None:
    response = TestClient(create_app()).get("/api/tickets")

    assert response.status_code == 200
    tickets = response.json()["tickets"]
    assert len(tickets) == 4
    assert [ticket["id"] for ticket in tickets] == [1, 2, 3, 4]


def test_unknown_route_returns_a_json_404_response() -> None:
    response = TestClient(create_app()).get("/missing")

    assert response.status_code == 404
    assert response.json() == {"error": "Not found"}


def test_patch_moves_an_open_ticket_to_in_progress() -> None:
    response = TestClient(create_app()).patch("/api/tickets/1/status", json={"status": "in_progress"})

    assert response.status_code == 200
    assert response.json()["ticket"] == {"id": 1, "title": "Cannot sign in", "status": "in_progress"}


def test_patch_moves_an_in_progress_ticket_to_closed() -> None:
    response = TestClient(create_app()).patch("/api/tickets/2/status", json={"status": "closed"})

    assert response.status_code == 200
    assert response.json()["ticket"]["status"] == "closed"


def test_patch_rejects_a_transition_outside_the_workflow() -> None:
    response = TestClient(create_app()).patch("/api/tickets/3/status", json={"status": "open"})

    assert response.status_code == 400
    assert response.json() == {"error": "Invalid status transition"}


def test_patch_rejects_an_unsupported_status() -> None:
    response = TestClient(create_app()).patch("/api/tickets/4/status", json={"status": "blocked"})

    assert response.status_code == 400
    assert response.json() == {"error": "Invalid status"}


def test_patch_returns_not_found_for_an_unknown_ticket() -> None:
    response = TestClient(create_app()).patch("/api/tickets/999/status", json={"status": "in_progress"})

    assert response.status_code == 404
    assert response.json() == {"error": "Ticket not found"}


@pytest.mark.parametrize("ticket_id", ["0", "-1", "1.5", "not-a-number"])
def test_patch_rejects_an_invalid_ticket_id(ticket_id: str) -> None:
    response = TestClient(create_app()).patch(f"/api/tickets/{ticket_id}/status", json={"status": "in_progress"})

    assert response.status_code == 400
    assert response.json() == {"error": "Invalid ticket id"}
