# TEAM-201: filter tickets by priority

## Outcome

Support leads can filter the ticket list by priority.

## Acceptance criteria

- `handleListTickets({ priority: "high" })` returns only high-priority tickets.
- Priority matching is case-insensitive.
- Omitting priority preserves current behavior.
- Unsupported values return status 400 and the standard error envelope with code `INVALID_PRIORITY`.
- Existing status filtering continues to work.
- Status and priority filters compose.

## Boundaries

- Do not change the result or error envelope.
- Do not add dependencies.
- Do not modify protected paths.
- Add focused tests and run every repository check.

## Ownership

Human owner: Application Team

