# Spec C — structured, plus project context

Read `AGENTS.md` first and follow its conventions (error messages, tests,
status lifecycle, no deletes).

Then implement Spec B (`2-structured.md`) exactly. Additionally:

- Add the tests first, in `tests/ticketService.test.ts`, under a
  `describe("reopenTicket")` block — one test per rule in Spec B. Run them
  and confirm they fail before writing the implementation.
- Pass `now` explicitly in every test; never depend on the real clock.
- Update the status lifecycle table in `AGENTS.md` to include the new
  `resolved → open` transition.
- Finish only when `npm test` passes.
