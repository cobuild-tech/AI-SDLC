# Acceptance criteria

## Health

- `GET /health` returns HTTP 200 and `{ "status": "ok" }`.

## Create and triage

- `POST /api/tickets` accepts `title`, `description`, and `customerTier`.
- `customerTier` is one of `standard` or `enterprise`.
- `title` is a non-empty string of at most 120 characters after trimming.
- `description` is a non-empty string of at most 2,000 characters after trimming.
- A valid request returns HTTP 201 with a numeric ID, normalized inputs, `status: open`, and the computed team and priority.
- Invalid input returns HTTP 400 with `{ "error": "Invalid ticket" }`.
- Request bodies containing unknown properties are rejected with the same error.

## Retrieve

- `GET /api/tickets/:id` returns the created ticket.
- A missing ticket returns HTTP 404 with `{ "error": "Ticket not found" }`.
- A non-positive or non-integer ID returns HTTP 400 with `{ "error": "Invalid ticket id" }`.

## Quality

- Business rules are unit tested.
- Externally visible behavior is covered by API integration tests.
- `pytest` and `mypy` pass.
- The README and `docs/API.md` contain runnable examples.

