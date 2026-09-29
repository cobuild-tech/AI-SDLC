import json
from typing import Any

from fastapi.testclient import TestClient

from src.app import create_app
from src.domain.store import create_in_memory_ticket_store
from src.domain.triage import triage_ticket


def test_normalizes_critical_severity_and_routes_it_to_incident_response() -> None:
    result = triage_ticket({"severity": " Critical ", "customerTier": " Standard ", "serviceImpact": " DEGRADED "})

    assert result["severity"] == "critical"
    assert result["priority"] == "P1"
    assert result["queue"] == "incident-response"
    assert result["decisionReasons"] == ["critical-severity"]


def test_routes_platinum_blocked_service_to_rapid_response() -> None:
    result = triage_ticket({"severity": "medium", "customerTier": "platinum", "serviceImpact": "blocked"})

    assert result["priority"] == "P1"
    assert result["queue"] == "rapid-response"
    assert result["decisionReasons"] == ["platinum-blocked-service"]


def test_critical_routing_wins_while_preserving_both_applicable_reasons() -> None:
    result = triage_ticket({"severity": "critical", "customerTier": "platinum", "serviceImpact": "blocked"})

    assert result["queue"] == "incident-response"
    assert result["decisionReasons"] == ["critical-severity", "platinum-blocked-service"]


def test_audit_event_uses_the_approved_allowlist_and_excludes_personal_data() -> None:
    events: list[dict[str, Any]] = []

    class RecordingAuditSink:
        def write(self, event: dict[str, Any]) -> None:
            events.append(event)

    app = create_app(api_key="test-key", store=create_in_memory_ticket_store(), audit_sink=RecordingAuditSink())
    response = TestClient(app).post(
        "/tickets",
        headers={"x-api-key": "test-key"},
        json={
            "severity": "medium",
            "customerTier": "platinum",
            "serviceImpact": "blocked",
            "summary": "Sensitive customer incident details",
            "requesterEmail": "private@example.test",
        },
    )

    assert response.status_code == 201
    assert len(events) == 1
    assert sorted(events[0]) == ["action", "priority", "queue", "reasonCodes", "ticketId"]
    serialized = json.dumps(events[0])
    assert "private@example.test" not in serialized
    assert "Sensitive customer incident details" not in serialized
