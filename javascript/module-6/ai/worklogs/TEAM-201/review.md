# TEAM-201 critical review

## Decision

Changes requested.

## Findings

### High: invalid priority breaks the public error contract

Evidence:

- `src/ticketQuery.js` returns `{ "message": "Invalid priority" }`.
- `AGENTS.md` and `docs/architecture.md` require `{ "error": { "code", "message" } }`.
- TEAM-201 explicitly forbids changing the error envelope.

Required action: use the existing `invalidQuery` helper with code `INVALID_PRIORITY`.

### Medium: invalid priority lacks a regression test

Evidence:

- The new test covers uppercase success and composition.
- No assertion protects the error status, code, and envelope.
- The preferred query filter pattern requires invalid-value coverage.

Required action: add a behavior test for an unsupported priority.

## Checks observed

- Tests: passed, but the suite misses the contract failure above.
- Syntax checks: passed.
- Protected-path check: passed.
- Protected files: unchanged.
- Dependencies: unchanged.

## Residual risk

The handler assumes scalar query values. A production HTTP adapter should reject repeated values before calling this transport-neutral function.

