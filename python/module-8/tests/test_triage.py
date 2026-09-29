import pytest

from src.domain.triage import triage_ticket


def test_critical_tickets_route_to_incident_response() -> None:
    result = triage_ticket({"severity": "critical", "customerTier": "standard", "serviceImpact": "degraded"})

    assert result["priority"] == "P1"
    assert result["queue"] == "incident-response"


def test_high_severity_tickets_route_to_specialist_support() -> None:
    result = triage_ticket({"severity": "high", "customerTier": "gold", "serviceImpact": "degraded"})

    assert result["priority"] == "P2"
    assert result["queue"] == "specialist-support"


def test_unsupported_severity_is_rejected() -> None:
    with pytest.raises(ValueError, match="invalid severity"):
        triage_ticket({"severity": "urgent", "customerTier": "standard", "serviceImpact": "none"})
