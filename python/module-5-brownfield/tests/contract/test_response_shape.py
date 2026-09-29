from fastapi.testclient import TestClient

from src.app import create_app


def test_preserves_the_dashboard_response_envelope() -> None:
    response = TestClient(create_app()).get("/api/tickets")
    assert sorted(response.json()) == ["items", "total"]
    assert sorted(response.json()["items"][0]) == ["id", "owner", "priority", "status", "title"]
