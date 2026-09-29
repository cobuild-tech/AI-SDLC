from typing import Any

from fastapi.testclient import TestClient

from src.app import create_app
from src.domain.store import create_in_memory_ticket_store


class RecordingAuditSink:
    def __init__(self) -> None:
        self.events: list[dict[str, Any]] = []

    def write(self, event: dict[str, Any]) -> None:
        self.events.append(event)


def make_client() -> TestClient:
    app = create_app(api_key="test-key", store=create_in_memory_ticket_store(), audit_sink=RecordingAuditSink())
    return TestClient(app)


def test_ticket_routes_require_authentication() -> None:
    response = make_client().get("/tickets/T-1001")
    assert response.status_code == 401


def test_creates_and_retrieves_a_ticket() -> None:
    client = make_client()
    create_response = client.post(
        "/tickets",
        headers={"x-api-key": "test-key"},
        json={
            "severity": "high",
            "customerTier": "gold",
            "serviceImpact": "degraded",
            "summary": "Search latency is elevated",
            "requesterEmail": "sam@example.test",
        },
    )

    assert create_response.status_code == 201
    created = create_response.json()
    assert created["priority"] == "P2"

    get_response = client.get(f"/tickets/{created['id']}", headers={"x-api-key": "test-key"})
    assert get_response.status_code == 200
    assert get_response.json() == created
