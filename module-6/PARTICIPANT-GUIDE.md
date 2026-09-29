# Module 6 — Team operating model

**Hands-on · about 50 minutes**

When a team uses agents, passing tests aren't enough. You'll work the way a team would: one agent session builds, a **separate** session reviews, and a person (you) approves.

Two tasks run at the same time. Each one gets its own copy of the repo, called a **worktree**, so the agents edit different files.

**Two worktrees → Plan → Build → Independent review → Human approval**

---

## 1. Set up (5 min)

You need Node.js 20+, Git, and a coding agent installed (see `SETUP-CHECKLIST.md`).

1. If you haven't already, clone the workshop code. In a terminal, in the folder where you keep your projects, run:

   ```bash
   git clone --branch demo-exercise https://github.com/cobuild-tech/AI-SDLC.git
   ```

   This creates an `AI-SDLC` folder with one folder per module.
2. In VS Code, choose **File → Open Folder** and open the `AI-SDLC/module-6` folder. If VS Code asks whether to open the Git repository in a parent folder, click **Yes**.
3. Open the terminal (**Terminal → New Terminal**) and run:

```bash
npm test
```

You should see **pass 3**. No `npm install` is needed. You're on the `demo-exercise` branch, which is where you work. Don't edit files in this folder. The two tasks happen in the copies you create next.

---

## 2. Two worktrees (8 min)

A worktree is another copy of this same repo, on its own branch. Each task gets one. Two agents in one folder would mix both tasks into one set of changes.

In the terminal, go up to the `AI-SDLC` folder and create the copies:

```bash
cd ..
git status
git worktree add -b team-201 ../AI-SDLC-team-201
git worktree add -b team-202 ../AI-SDLC-team-202
git worktree list
```

`git status` should be clean. You should see three copies: this folder, plus the two you just added.

Open each copy in its own VS Code window (**File → New Window**, then **File → Open Folder**):

- `AI-SDLC-team-201/module-6` is **TEAM-201**, the priority filter. It may edit `src/ticketQuery.js` and `test/ticketQuery.test.js`.
- `AI-SDLC-team-202/module-6` is **TEAM-202**, add a comment. It may add `src/ticketComments.js` and `test/ticketComments.test.js`. It must not edit the query files.

If VS Code asks whether to open the Git repository in a parent folder, click **Yes**. Start one coding agent in each window.

Take two minutes to read both task files and `AGENTS.md`. Note the **protected paths**: files agents must not touch.

---

## 3. Plan both (8 min)

In the **team-201** chat:

```text
Read tasks/TEAM-201-priority-filter.md, AGENTS.md, docs/architecture.md
and docs/patterns/query-filter.md. Do not edit files.

Show me which files you will change and which are protected,
map each acceptance criterion to a test, and propose a small plan.
Wait for my approval.
```

**Before you approve, check:**

- It lists the protected files and leaves them alone.
- It follows the filter pattern in `docs/patterns/query-filter.md`.
- It does not plan to edit `src/ticketComments.js`.
- Every acceptance criterion has a test, **including an invalid value**.

In the **team-202** chat:

```text
Read tasks/TEAM-202-add-comment.md, AGENTS.md and docs/architecture.md.
Do not edit files.

Show me which files you will change and which are protected,
map each acceptance criterion to a test, and propose a small plan.
Wait for my approval.
```

**Before you approve, check:**

- It only plans to add `src/ticketComments.js` and `test/ticketComments.test.js`.
- It leaves `src/ticketQuery.js` and `data/seed-tickets.json` alone.
- Every acceptance criterion has a test.

---

## 4. Build both (10 min)

You can run these at the same time, one in each window.

In the **team-201** chat:

```text
Implement the approved plan. Add focused tests. Do not commit.
Run npm test, npm run lint and npm run check:boundaries.
Write ai/worklogs/TEAM-201/implementation-report.md with files changed,
commands run, results and risks.
```

In the **team-202** chat:

```text
Implement the approved plan. Add focused tests. Do not commit.
Run npm test, npm run lint and npm run check:boundaries.
Also run node --check src/ticketComments.js and node --check test/ticketComments.test.js.
Write ai/worklogs/TEAM-202/implementation-report.md with files changed,
commands run, results and risks.
```

**Check:** in each folder, the commands pass. `check:boundaries` fails if a protected file was changed. `git status` in the team-201 copy lists the query files. `git status` in the team-202 copy lists the comment files, and does not list `src/ticketQuery.js`.

---

## 5. Independent review (7 min)

Open a **new chat in the team-201 window**. The reviewer shouldn't share the builder's assumptions; `AGENTS.md` requires this. A chat in the other copy cannot see this change.

```text
Act as a critical reviewer. Do not edit code.
Review the uncommitted TEAM-201 change against the task, AGENTS.md,
docs/architecture.md and the tests. Look for changed response or error formats,
missing tests, protected-file edits and claims without evidence.
List findings by severity with file evidence. Do not approve if evidence is missing.
```

If it finds problems, paste the findings into your **team-201 builder chat** and ask it to fix them. Then run the three checks again.

In the team-202 window, run `git status` and confirm `src/ticketQuery.js` is not in the list.

---

## 6. You approve (3 min)

The agent can recommend. Only a person can approve.

In each copy, create `ai/worklogs/<task-id>/human-approval.md` **yourself** with three lines: your decision, the evidence you looked at, and any risk you're accepting.

---

## 7. Compare with the reference (3 min)

A reference run of the priority-filter task is on the `solution` branch, as three commits to the `module-6` folder:

- `feat: add priority filter for TEAM-201`: a change whose tests pass but that breaks the error format
- `review: block TEAM-201 on error contract`: the review that caught it
- `fix: close TEAM-201 review findings`: the fix and the human approval record

Look at them only once you're done. Use the original `AI-SDLC` folder, the one still on `demo-exercise`. Your task copies keep their own changes. To list the commits, run `git log --oneline solution -- module-6`, then `git show <commit id>` to see one. To see the final state, run `git switch solution`, and `git switch demo-exercise` to go back.

---

## 8. Wrap-up (5 min)

Be ready to share one answer:

- Which control caught a problem in your session: a test, the boundary check, the review, or you?
- What goes wrong if both agents edit `src/ticketQuery.js` in the same folder?

---

**Source Control says there's no git repository?** Open the module folder from inside the copy the worktree created, and click **Yes** when VS Code offers to open the repository in the parent folder. Don't use GitHub's **Download ZIP** button, because that zip has no `.git` folder.

**`git worktree add` says the branch is already checked out?** `demo-exercise` is already in use in the original folder. Each task needs its own branch, as in the commands above. Create the copies next to `AI-SDLC`, not inside it.

**Stuck?** To throw away one task, open **Source Control** in that window, hover over **Changes**, and click the **Discard All Changes** arrow (↶). To remove a copy, go back to the original `AI-SDLC` folder and run `git worktree remove ../AI-SDLC-team-201` (or `team-202`).
