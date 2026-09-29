# Reported defect: mixed-case critical severity is not escalated

## Incident report

An upstream integration submitted a ticket with severity `" Critical "`. The API rejected the request as an invalid severity, so the critical incident never entered the `P1` incident-response workflow.

## Expected behavior

Supported enumeration values are case-insensitive and may contain leading or trailing whitespace. A critical ticket must always be routed to:

- priority: `P1`
- queue: `incident-response`

## Reproduction payload

```json
{
  "severity": " Critical ",
  "customerTier": "standard",
  "serviceImpact": "degraded",
  "summary": "Production checkout unavailable",
  "requesterEmail": "operator@example.test"
}
```

No regression test currently covers this input variation.
