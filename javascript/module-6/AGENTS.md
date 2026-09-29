# Repository instructions

## Commands

- Tests: `npm test`
- Syntax checks: `npm run lint`
- Protected-path check: `npm run check:boundaries`

Run all three before requesting review. Report the exact command and outcome.

## Architecture

- `src/ticketQuery.js` owns query parsing and filtering for this workshop service.
- Public results use `{ status, body }` so transport adapters can preserve response contracts.
- Errors use `{ "error": { "code": string, "message": string } }`.
- Reuse `VALID_PRIORITIES`; do not duplicate supported values.
- Follow the filter pattern in `docs/patterns/query-filter.md`.

## Change discipline

- Create one branch or worktree for each task.
- Parallel tasks must not edit the same files.
- Produce a plan before material edits and wait for approval.
- Keep commits small and limited to the active task.
- State assumptions and unresolved questions.
- Do not add dependencies without explicit approval.
- Do not combine implementation and critical review in the same agent session.

## Protected paths

Agents must not modify these paths unless a human owner explicitly approves the change:

- `.github/workflows/`
- `.github/CODEOWNERS`
- `data/seed-tickets.json`
- `docs/architecture.md`

## Completion report

Record changed files, validation results, assumptions, and residual risks under `ai/worklogs/<task-id>/`. A human owner remains accountable for approval and merge.

