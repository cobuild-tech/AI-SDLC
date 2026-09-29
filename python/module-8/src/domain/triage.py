from collections.abc import Mapping
from typing import Any

ALLOWED_SEVERITIES = {"low", "medium", "high", "critical"}
ALLOWED_CUSTOMER_TIERS = {"standard", "gold", "platinum"}
ALLOWED_SERVICE_IMPACTS = {"none", "degraded", "blocked"}


def require_enum(name: str, value: Any, allowed: set[str]) -> str:
    normalized = value.strip().lower() if isinstance(value, str) else ""
    if normalized not in allowed:
        raise ValueError(f"invalid {name}")
    return normalized


def triage_ticket(ticket: Mapping[str, Any]) -> dict[str, Any]:
    severity = require_enum("severity", ticket.get("severity"), ALLOWED_SEVERITIES)
    customer_tier = require_enum("customerTier", ticket.get("customerTier"), ALLOWED_CUSTOMER_TIERS)
    service_impact = require_enum("serviceImpact", ticket.get("serviceImpact"), ALLOWED_SERVICE_IMPACTS)

    is_platinum_blocked = customer_tier == "platinum" and service_impact == "blocked"

    if severity == "critical":
        return {
            "severity": severity,
            "customerTier": customer_tier,
            "serviceImpact": service_impact,
            "priority": "P1",
            "queue": "incident-response",
            "decisionReasons": [
                "critical-severity",
                *(["platinum-blocked-service"] if is_platinum_blocked else []),
            ],
        }

    if is_platinum_blocked:
        return {
            "severity": severity,
            "customerTier": customer_tier,
            "serviceImpact": service_impact,
            "priority": "P1",
            "queue": "rapid-response",
            "decisionReasons": ["platinum-blocked-service"],
        }

    if severity == "high":
        return {
            "severity": severity,
            "customerTier": customer_tier,
            "serviceImpact": service_impact,
            "priority": "P2",
            "queue": "specialist-support",
            "decisionReasons": ["high-severity"],
        }

    return {
        "severity": severity,
        "customerTier": customer_tier,
        "serviceImpact": service_impact,
        "priority": "P3",
        "queue": "general-support",
        "decisionReasons": ["standard-routing"],
    }
