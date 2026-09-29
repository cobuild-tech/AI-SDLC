# SEC-301: manager ticket export

## Outcome

Support managers can export a minimal ticket summary for weekly workload planning.

## Acceptance criteria

- Only a user with role `manager` can export tickets.
- Unauthorized users receive status 403 with error code `FORBIDDEN`.
- The response contains only `id`, `title`, `status` and `priority`.
- The operation must not log request bodies, tokens, customer data or ticket contents.
- Failures return status 500 with error code `EXPORT_FAILED`.
- Tests cover authorized, unauthorized and failure behavior.

## Constraints

- No new dependencies.
- No CI or security-check changes.
- No unrelated behavior changes.
- All repository checks must pass.

