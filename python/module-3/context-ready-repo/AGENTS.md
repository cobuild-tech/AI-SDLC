# Repository instructions

## Context precedence

When repository sources disagree, use this order:

1. The active task contract under `tasks/`
2. Accepted decisions under `docs/decisions/`
3. Current architecture documentation
4. Existing implementation and tests

Files under `docs/archive/` are historical context only. Identify material conflicts instead of silently choosing a rule.

- Keep API routes thin. Put collection logic in `src/services`.
- Reuse types from `src/models` instead of duplicating `Literal` values.
- Validate request input at the route boundary.
- Return JSON errors in the form `{ "error": "..." }`.
- Add behavior-focused API tests for every externally visible change.
- Run `pytest` and `mypy` before declaring completion.
- Avoid new dependencies unless the task clearly requires one.

## Action boundaries

- Read-only exploration and focused tests are allowed without approval.
- Propose a plan and wait for approval before editing files.
- Ask before adding dependencies, changing an established API contract, using network access, or running destructive commands.
- Never commit, push, deploy, or access production systems unless explicitly requested.
