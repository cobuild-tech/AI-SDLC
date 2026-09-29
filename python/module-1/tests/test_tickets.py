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
