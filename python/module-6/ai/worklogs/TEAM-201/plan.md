# TEAM-201 implementation plan

## Evidence reviewed

- Task: `tasks/TEAM-201-priority-filter.md`
- Repository rules: `AGENTS.md`
- Architecture: `docs/architecture.md`
- Pattern: `docs/patterns/query-filter.md`
- Current implementation and tests

## Change map

- `src/ticket_query.py`: normalize and validate priority, then compose it with status filtering.
- `tests/test_ticket_query.py`: add focused coverage for uppercase priority and combined filters.

## Protected paths

No protected file needs modification.

## Assumptions

- Query values arrive as optional strings.
- Existing result ordering remains unchanged.

## Validation

Run `pytest`, `python -m compileall -q src tests`, and `python scripts/check_boundaries.py`.

