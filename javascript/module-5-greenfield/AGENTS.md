# Repository instructions

## Architecture boundaries

- Keep HTTP parsing, validation, and response codes in `src/routes`.
- Keep ticket creation and triage rules in `src/services`.
- Access stored tickets only through `TicketRepository`.
- Reuse domain types from `src/types`; do not duplicate string unions.
- Return JSON errors as `{ "error": "..." }`.

## Change discipline

- Implement one approved stage at a time.
- Preserve the product rules and their order; do not invent fallback features.
- Avoid new dependencies unless the task explicitly requires one.
- Do not add authentication, persistence, queues, containers, deployment configuration, or a UI.
- Ask before changing a public response shape or adding scope.

## Verification

- Add unit tests for domain rules and API tests for externally visible behavior.
- Run focused tests while editing.
- Before completion, run `npm test`, `npm run lint`, and `npm run build`.
- Report exact commands and results; never claim a check that was not run.

## Action boundaries

- Read-only inspection and local tests are allowed.
- Propose a plan and wait for approval before broad edits.
- Never commit, push, deploy, access production, or use destructive commands unless explicitly requested.

