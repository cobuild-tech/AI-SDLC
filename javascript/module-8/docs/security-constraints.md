# Security constraints

## Data classification

- `requesterEmail` is personal data.
- `summary` may contain customer or operationally sensitive data.
- API keys are secrets.
- Ticket routing metadata is internal but permitted in the audit stream.

## Required controls

- Ticket endpoints require the existing API-key check.
- Request bodies remain limited to 32 KiB.
- Audit events must use an allowlist; do not log the complete ticket or request.
- HTTP errors must not include stack traces or secrets.
- No production, network or cloud access is needed for this lab.

## Human approvals

- Support Operations must approve policy semantics and rule precedence.
- Security must approve the audit-event schema.
- Service Reliability must approve the P1 routing change before production release.
