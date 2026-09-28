# TEAM-201 implementation plan

## Evidence reviewed

- Task: `tasks/TEAM-201-priority-filter.md`
- Repository rules: `AGENTS.md`
- Architecture: `docs/architecture.md`
- Pattern: `docs/patterns/query-filter.md`
- Current implementation and tests

## Change map

- `src/ticketQuery.js`: normalize and validate priority, then compose it with status filtering.
- `test/ticketQuery.test.js`: add focused coverage for uppercase priority and combined filters.

## Protected paths

No protected file needs modification.

## Assumptions

- Query values arrive as optional strings.
- Existing result ordering remains unchanged.

## Validation

Run `npm test`, `npm run lint`, and `npm run check:boundaries`.

