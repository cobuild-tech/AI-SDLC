# Repository instructions

## Commands

- Tests: `pytest`
- Syntax checks: `python -m compileall -q src tests`
- Security checks: `python scripts/secret_scan.py`

Report exact results. Never claim a check that was skipped or failed.

## Security and data

- Never store credentials or tokens in source, tests, prompts or logs.
- Treat customer email and internal notes as confidential.
- Export endpoints require a manager role.
- Export responses may contain only ticket ID, title, status and priority.
- Errors use `{ "error": { "code", "message" } }` and preserve failure status.
- Use only dependencies in `docs/approved-dependencies.md`.

## Change discipline

- Limit the diff to the active task.
- Do not modify CI or security checks without Security Engineering approval.
- Do not weaken assertions or suppress errors to make a check pass.
- A human reviewer must approve security-sensitive changes.

