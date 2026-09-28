# Module 3: Context, memory and skills

The same ticket service in two folders, so you can build one feature twice and see what repository context changes.

- [`baseline-repo/`](baseline-repo/): no context. No rules, no task contract, no decisions, one old note. Built from a one-line prompt.
- [`context-ready-repo/`](context-ready-repo/): full context. Rules, task contract, decision record, architecture notes, project memory and a skill. Built from a structured prompt.
- [`compare-results.mjs`](compare-results.mjs): scores both folders against the same acceptance criteria. Run `node compare-results.mjs` from this folder.

Follow [`PARTICIPANT-GUIDE.md`](PARTICIPANT-GUIDE.md). Start your agent inside `baseline-repo` or `context-ready-repo`, never in this folder.
