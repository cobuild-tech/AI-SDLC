# Preferred query filter pattern

1. Accept one optional string value.
2. Normalize case at the query boundary.
3. Validate against the shared supported-value list.
4. Return the standard invalid-query error when validation fails.
5. Apply the filter in the existing collection pass.
6. Test omission, a valid normalized value, and an invalid value.

Avoid new dependencies for parsing a single query value.

