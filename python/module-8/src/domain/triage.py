from collections.abc import Mapping
from typing import Any

ALLOWED_SEVERITIES = {"low", "medium", "high", "critical"}
ALLOWED_CUSTOMER_TIERS = {"standard", "gold", "platinum"}
ALLOWED_SERVICE_IMPACTS = {"none", "degraded", "blocked"}


def require_enum(name: str, value: Any, allowed: set[str]) -> str:
    if not isinstance(value, str) or value not in allowed:
        raise ValueError(f"invalid {name}")
    return value


def triage_ticket(ticket: Mapping[str, Any]) -> dict[str, Any]:
    severity = require_enum("severity", ticket.get("severity"), ALLOWED_SEVERITIES)
    customer_tier = require_enum("customerTier", ticket.get("customerTier"), ALLOWED_CUSTOMER_TIERS)
    service_impact = require_enum("serviceImpact", ticket.get("serviceImpact"), ALLOWED_SERVICE_IMPACTS)

    if severity == "critical":
        return {
            "severity": severity,
            "customerTier": customer_tier,
            "serviceImpact": service_impact,
            "priority": "P1",
            "queue": "incident-response",
        }

    if severity == "high":
        return {
            "severity": severity,
            "customerTier": customer_tier,
            "serviceImpact": service_impact,
            "priority": "P2",
            "queue": "specialist-support",
        }

    return {
        "severity": severity,
        "customerTier": customer_tier,
        "serviceImpact": service_impact,
        "priority": "P3",
        "queue": "general-support",
    }
