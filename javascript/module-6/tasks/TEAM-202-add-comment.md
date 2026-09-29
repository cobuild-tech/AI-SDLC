# TEAM-202: add a comment to a ticket

## Outcome

Support can add a comment to a ticket.

## Acceptance criteria

- `addTicketComment(1, "Needs a screenshot")` returns status 200 and that comment for ticket 1.
- A second comment on ticket 1 is kept alongside the first.
- An unknown ticket id returns status 400 and the standard error envelope with code `UNKNOWN_TICKET`.
- A blank comment returns status 400 and code `EMPTY_COMMENT`.
- Comments on ticket 1 do not appear for ticket 2.

## Boundaries

- Add `src/ticketComments.js` and `test/ticketComments.test.js` only.
- Do not edit `src/ticketQuery.js` or `test/ticketQuery.test.js`.
- Do not write comments into `data/seed-tickets.json`. Keep them in memory.
- Do not change the list query.
- Do not add dependencies.
- Do not modify protected paths.
- Add focused tests and run every repository check.

## Ownership

Human owner: Application Team
