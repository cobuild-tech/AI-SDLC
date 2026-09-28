# M3-001: Update ticket status

## Outcome

Add `PATCH /api/tickets/:id/status` so a client can move a ticket through the supported workflow.

## Context

- Ticket data is intentionally stored in memory for this workshop.
- `docs/decisions/ADR-001-ticket-status-workflow.md` is the authoritative workflow decision.
- Existing API and error conventions remain in force.

## Constraints

- Accept a JSON body containing only a supported `status` value.
- Keep the route thin and place transition logic in the service layer.
- Do not add a dependency or redesign persistence.
- Preserve the existing list endpoint.

## Acceptance criteria

- `open` can move to `in_progress`.
- `in_progress` can move to `closed`.
- A transition outside the workflow returns HTTP 400 with `{ "error": "Invalid status transition" }`.
- An unsupported status returns HTTP 400 with `{ "error": "Invalid status" }`.
- A missing ticket returns HTTP 404 with `{ "error": "Ticket not found" }`.
- A non-positive or non-integer ID returns HTTP 400 with `{ "error": "Invalid ticket id" }`.
- Behavior-focused API tests cover success and failure paths.
- README documentation describes the endpoint.

## Boundaries

- Ask before changing any response shape listed above.
- Do not add reopening, deletion, authentication, persistence, or audit logging.
- Stop and report a conflict if an authoritative source contradicts this contract.
