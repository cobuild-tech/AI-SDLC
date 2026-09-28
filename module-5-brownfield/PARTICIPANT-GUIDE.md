# Module 5 — Greenfield and brownfield

**Hands-on · two labs, about 40 minutes each**

- **Greenfield:** build something new from a written specification. The risk is the agent inventing too much.
- **Brownfield:** change code that already exists. The risk is the agent breaking something that works.

Same habit in both: **the agent plans first, you approve, then it builds in small steps.**

---

## Set up (5 min)

You need Node.js 20+, Git, and a coding agent installed (see `SETUP-CHECKLIST.md`).

1. If you haven't already, clone the workshop code. In a terminal, in the folder where you keep your projects, run:

   ```bash
   git clone --branch demo-exercise https://github.com/cobuild-tech/AI-SDLC.git
   ```
2. The two labs are the `AI-SDLC/module-5-greenfield` and `AI-SDLC/module-5-brownfield` folders. Open **one at a time** in VS Code (**File → Open Folder**), and start your agent in that folder. If VS Code asks whether to open the Git repository in a parent folder, click **Yes**.

---

# Lab A: Greenfield

The `module-5-greenfield` folder has no code yet, only specifications in `requirements/`. Skim them first: a small API that routes support tickets to the right team.

## A1. Plan (8 min)

```text
Read everything in requirements/. Do not create or edit any files.
List your questions and assumptions, propose a small architecture,
and give me a step-by-step plan. Map every acceptance criterion to a test.
Stop after the plan.
```

**Before you approve, check:**

- It asks questions or states assumptions.
- The architecture is small: route → service → in-memory store. No database, login or UI.
- Every acceptance criterion has a test.

## A2. Write the rules (5 min)

```text
Draft AGENTS.md for this repository: architecture rules, error format,
testing expectations, commands, no new dependencies, and what needs my approval.
Do not write any application code yet.
```

**Check:** every rule is something you could actually check. Delete vague ones like "write clean code".

## A3. Build it (15 min)

```text
Follow AGENTS.md and the approved plan. Set up the project with the health
endpoint, then implement creating a ticket with triage, from the request
through the service and in-memory store to the response.
Add tests for the happy paths and the edge cases. Run the tests.
```

**Check:** `npm test` passes, and there's nothing extra: no database, login or unused folders.

**Watch the tricky parts:**

- Rules are checked **in order**, and the first match wins.
- Keywords match **whole words** (`download` must not match `down`).
- Unknown fields in the request are rejected.

## A4. Review (5 min)

```text
Review everything you built against requirements/ and AGENTS.md.
Point out anything that wasn't asked for. Then update the README
to describe only what actually works.
```

Open **Source Control** and click through the changes yourself.

**Compare:** run `git switch solution` (commit or discard your changes first). The reference answer is in the same `module-5-greenfield` folder, and the `module-5-greenfield-one-shot` folder next to it shows what a single "build everything" prompt produces. Run `git switch demo-exercise` to go back. Look at both only once you're done.

---

# Lab B: Brownfield

The `module-5-brownfield` folder is an existing ticket service with two tasks in `tasks/`: a bug (`BUG-104`) and a feature (`FEATURE-105`).

In the terminal, run:

```bash
npm install
npm test
```

You should see **4 passed**.

## B1. Map the code (7 min)

```text
Do not edit files. Read AGENTS.md, then map this repository: how a request
to GET /api/tickets flows through the code, the conventions, the tests,
and any documentation that looks outdated. Cite file paths.
```

**Check:**

- It traces route → service → data.
- It notices the README's "page size 50" claim is wrong (there's no paging).
- It treats `docs/archive/` as outdated.

## B2. Prove the bug first (7 min)

```text
Look at tasks/BUG-104-priority-filter.md. Add one test that reproduces the bug.
Run only that test and show me it fails. Do not fix the bug yet.
```

**Check:** the test fails because `HIGH` is rejected, not because the test itself is broken.

## B3. Fix it, smallest change (8 min)

```text
Propose the smallest fix for BUG-104 that keeps the response shape the same.
After I approve, make the change and run the focused test, then npm test and npm run lint.
```

**Check:** only the query parsing and tests changed.

## B4. Add the feature (10 min, if you have time)

```text
Do the same for tasks/FEATURE-105-unassigned-filter.md: plan, tests first,
then the smallest change. Do not refactor unrelated code.
```

**Check:** tests cover `true`, `false`, an invalid value, and combining it with the priority filter.

## B5. Review (5 min)

```text
Compare your changes with both task files and AGENTS.md. Report what changed,
tests added, commands run, and any remaining risks. Fix the README's outdated paging claim.
```

Open **Source Control** and click through the changes yourself.

**Compare:** the reference answer is in the same `module-5-brownfield` folder on the `solution` branch. Run `git switch solution` to see it (commit or discard your changes first), and `git switch demo-exercise` to go back. Look at it only once you're done.

---

## Wrap-up (5 min)

Be ready to share one answer:

- What was the biggest risk in greenfield, and what was it in brownfield?
- Where did a test catch something a written instruction didn't?

---

**Source Control says there's no git repository?** Open the lab's folder from inside the `AI-SDLC` folder the clone created, and click **Yes** when VS Code offers to open the repository in the parent folder. Don't use GitHub's **Download ZIP** button, because that zip has no `.git` folder.

**Stuck?** To throw away all your changes and start again, open **Source Control**, hover over **Changes**, and click the **Discard All Changes** arrow (↶).
