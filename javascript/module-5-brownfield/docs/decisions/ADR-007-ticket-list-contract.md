# ADR-007: preserve ticket list compatibility

Status: Accepted

## Decision

The public list response remains:

```json
{ "items": [], "total": 0 }
```

The domain field remains `owner`, where `null` means unassigned. Filters are optional and may compose. Transport validation occurs at the route boundary.

## Rationale

Several internal dashboards parse this response without a version-negotiation mechanism. Renaming fields or wrapping pagination metadata would be a breaking change.

