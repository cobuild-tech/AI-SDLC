# Repository instructions

## Sources of truth

Use this precedence when repository sources disagree:

1. Active task contract under `tasks/`
2. Accepted decisions under `docs/decisions/`
3. Current tests and architecture documentation
4. Existing implementation
5. README and archived documentation

Report conflicts instead of silently choosing a convenient source.

## Conventions

- Routes own query parsing, transport validation, and HTTP response codes.
- Services own filtering and collection behavior.
- Data modules own the in-memory store.
- Reuse domain types from `src/models`.
- Error responses use `{ "error": { "code": string, "message": string } }`.
- Preserve the list response shape `{ "items": Ticket[], "total": number }`.
- Add externally visible behavior tests for public API changes.
- Avoid dependencies and broad refactors unless an active task requires them.

## Workflow

- Map the repository and trace the relevant execution path before editing.
- Reproduce a reported defect with a focused failing test.
- Propose a minimal plan and wait for approval before production changes.
- Run focused tests, then `pytest` and `mypy`.
- Review the final diff for unrelated changes and summarize residual risk.

## Boundaries

- Read-only exploration and local tests are allowed.
- Ask before changing a public contract, adding dependencies, or altering persistence.
- Never commit, push, deploy, or access production unless explicitly requested.

