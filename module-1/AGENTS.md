# Repository instructions

- Keep API routes thin. Put collection logic in `src/services`.
- Reuse types from `src/types` instead of duplicating string unions.
- Validate request input at the route boundary.
- Return JSON errors in the form `{ "error": "..." }`.
- Add behavior-focused API tests for every externally visible change.
- Run `npm test` and `npm run lint` before declaring completion.
- Avoid new dependencies unless the task clearly requires one.
