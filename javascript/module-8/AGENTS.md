# Repository instructions for coding agents

## Working agreement

1. Explore the repository and read all files in `docs/` before proposing changes.
2. State assumptions and unresolved questions.
3. Produce a short implementation and risk plan before editing.
4. Reproduce the reported defect with a failing test before fixing it.
5. Keep the change small and preserve the current architecture.
6. Run focused tests after each behavioral change, then run `npm run validate`.
7. Review the final diff for unrelated changes.
8. Report commands run, results, residual risks and human approvals required.

## Commands

- Tests: `npm test`
- Lint: `npm run lint`
- Full validation: `npm run validate`
- Start locally: `LAB_API_KEY=local-demo-key npm start`

## Architectural constraints

- Use Node.js built-in modules only.
- Keep triage policy in `src/domain/triage.js`.
- Keep HTTP concerns in `src/app.js`.
- Keep persistence behind the store interface.
- Do not replace the in-memory store or add a framework.

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
