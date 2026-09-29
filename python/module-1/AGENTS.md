# Repository instructions

- Keep API routes thin. Put collection logic in `src/services`.
- Reuse types from `src/models` instead of duplicating `Literal` values.
- Validate request input at the route boundary.
- Return JSON errors in the form `{ "error": "..." }`.
- Add behavior-focused API tests for every externally visible change.
- Run `pytest` and `mypy` before declaring completion.
- Avoid new dependencies unless the task clearly requires one.
