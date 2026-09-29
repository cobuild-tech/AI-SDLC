# FEATURE-105: filter unassigned tickets

## Outcome

Support leads need to find work that has no owner.

## Contract

- `GET /api/tickets?unassigned=true` returns only tickets whose `owner` is `null`.
- `GET /api/tickets?unassigned=false` returns only tickets with a non-null owner.
- The filter composes with the priority filter.
- Omitted `unassigned` preserves existing behavior.
- Any value other than one `true` or `false` returns HTTP 400 with:

```json
{
  "error": {
    "code": "INVALID_UNASSIGNED",
    "message": "unassigned must be true or false"
  }
}
```

## Constraints

- Keep the established `owner` field; do not rename it.
- Preserve response and error envelopes.
- Avoid unrelated refactors.

