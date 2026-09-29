import pytest
from fastapi.testclient import TestClient

from src.app import create_app


def test_get_tickets_returns_all_tickets() -> None:
    response = TestClient(create_app()).get("/api/tickets")

    assert response.status_code == 200
    tickets = response.json()["tickets"]
    assert len(tickets) == 4
    assert [ticket["id"] for ticket in tickets] == [1, 2, 3, 4]


@pytest.mark.parametrize(
    ("status", "expected_ids"),
    [("open", [1, 4]), ("in_progress", [2]), ("closed", [3])],
)
def test_get_tickets_filters_by_status(status: str, expected_ids: list[int]) -> None:
    response = TestClient(create_app()).get("/api/tickets", params={"status": status})

    assert response.status_code == 200
    tickets = response.json()["tickets"]
    assert [ticket["id"] for ticket in tickets] == expected_ids
    assert all(ticket["status"] == status for ticket in tickets)


def test_get_tickets_rejects_an_unsupported_status() -> None:
    response = TestClient(create_app()).get("/api/tickets", params={"status": "waiting"})

    assert response.status_code == 400
    assert response.json() == {"error": "status must be one of: open, in_progress, closed"}


def test_unknown_route_returns_a_json_404_response() -> None:
    response = TestClient(create_app()).get("/missing")

    assert response.status_code == 404
    assert response.json() == {"error": "Not found"}
