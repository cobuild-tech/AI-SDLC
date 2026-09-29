# ADR-001: Ticket status workflow

Status: Accepted

## Decision

Tickets follow a forward-only workflow:

1. `open` to `in_progress`
2. `in_progress` to `closed`
3. `closed` is terminal

The API returns HTTP 400 when a requested transition is outside this workflow. Reopening a closed ticket is intentionally outside the current scope.

## Rationale

The workshop service has no identity, authorization or audit trail. A reopen operation would require those product decisions before it could be introduced safely.
