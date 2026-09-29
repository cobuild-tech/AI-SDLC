# Repository instructions for coding agents

## Working agreement

1. Explore the repository and read all files in `docs/` before proposing changes.
2. State assumptions and unresolved questions.
3. Produce a short implementation and risk plan before editing.
4. Reproduce the reported defect with a failing test before fixing it.
5. Keep the change small and preserve the current architecture.
6. Run focused tests after each behavioral change, then run `python scripts/validate.py`.
7. Review the final diff for unrelated changes.
8. Report commands run, results, residual risks and human approvals required.

## Commands

- Tests: `pytest`
- Lint: `python scripts/lint.py`
- Full validation: `python scripts/validate.py`
- Start locally: `LAB_API_KEY=local-demo-key python -m src.server`

## Architectural constraints

- Use FastAPI, Uvicorn and the Python standard library only.
- Keep triage policy in `src/domain/triage.py`.
- Keep HTTP concerns in `src/app.py`.
- Keep persistence behind the store interface.
- Do not replace the in-memory store or the HTTP layer.

## Security constraints

- Never log ticket summaries, requester email addresses, API keys or request bodies.
- Do not hard-code credentials.
- Do not weaken authentication or payload limits.
- Do not expose stack traces in HTTP responses.

## Files agents must not modify

- `docs/business-requirement.md`
- `docs/reported-defect.md`
- `docs/enhancement-request.md`
- `docs/acceptance-criteria.md`
- `docs/architecture-constraints.md`
- `docs/security-constraints.md`

If a requirement appears inconsistent, stop and ask rather than silently editing the brief.
