# Enhancement request: platinum blocked-service routing

When a platinum customer reports that their service is blocked, route the ticket to rapid response.

## Rule

If `customerTier` is `platinum` and `serviceImpact` is `blocked`:

- priority must be `P1`
- queue must be `rapid-response`
- the response must include `decisionReasons` containing `platinum-blocked-service`

## Precedence

The critical-incident rule has higher precedence. If a ticket is both critical and platinum/blocked, route it to `incident-response` and include both applicable reasons.

## Explainability

Every newly created ticket must include a non-empty `decisionReasons` array using stable machine-readable reason codes.
