# BUG-104: priority filter fails for dashboard values

## Report

The support dashboard sends uppercase priority values. `GET /api/tickets?priority=HIGH` returns an empty collection even though high-priority tickets exist.

## Expected behavior

- Priority values are accepted case-insensitively.
- Supported values are `normal`, `medium`, `high`, and `critical`.
- A supported value returns matching tickets and the matching total.
- An unsupported or repeated priority query returns HTTP 400 with:

```json
{
  "error": {
    "code": "INVALID_PRIORITY",
    "message": "priority must be normal, medium, high, or critical"
  }
}
```

## Constraints

- Preserve the response shape and existing lower-case behavior.
- Do not redesign filtering or add a dependency.
- Add a focused regression test before changing production code.

