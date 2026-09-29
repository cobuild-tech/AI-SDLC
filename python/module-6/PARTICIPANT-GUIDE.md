# Module 6 — Team operating model (Python)

**Hands-on · about 35 minutes**

When a team uses agents, passing tests aren't enough. You'll work the way a team would: one agent session builds, a **separate** session reviews, and a person (you) approves.

**Plan → Build → Independent review → Human approval**

---

## 1. Set up (5 min)

You need Python 3.11+, Git, and a coding agent installed (see `SETUP-CHECKLIST.md`).

1. If you haven't already, clone the workshop code. In a terminal, in the folder where you keep your projects, run:

   ```bash
   git clone --branch demo-exercise https://github.com/cobuild-tech/AI-SDLC.git
   ```

   This creates an `AI-SDLC` folder with a `javascript` and a `python` folder, each with one folder per module.
2. In VS Code, choose **File → Open Folder** and open the `AI-SDLC/python/module-6` folder. If VS Code asks whether to open the Git repository in a parent folder, click **Yes**.
3. Open the terminal (**Terminal → New Terminal**) and run:

```bash
python3 -m venv .venv          # Windows: py -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements-dev.txt
pytest
```

You should see **3 passed**. The service uses only the Python standard library; pytest is the only thing you install. You're on the `demo-exercise` branch, which is where you work.

Now start your coding agent **in the `module-6` folder**, from this terminal so it uses the same virtual environment.

Take two minutes to read `tasks/TEAM-201-priority-filter.md` (the task) and `AGENTS.md` (the team's rules). Note the **protected paths**: files agents must not touch.

---

## 2. Step 1: Plan (7 min)

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
- Every acceptance criterion has a test, **including an invalid value**.

---

## 3. Step 2: Build (7 min)

```text
Implement the approved plan. Add focused tests. Do not commit.
Run pytest, python -m compileall -q src tests and python scripts/check_boundaries.py.
Write ai/worklogs/TEAM-201/implementation-report.md with files changed,
commands run, results and risks.
```

**Check:** all three commands pass. `check_boundaries.py` fails if a protected file was changed.

---

## 4. Step 3: Independent review (7 min)

Open a **new chat**. The reviewer shouldn't share the builder's assumptions; `AGENTS.md` requires this.

```text
Act as a critical reviewer. Do not edit code.
Review the uncommitted TEAM-201 change against the task, AGENTS.md,
docs/architecture.md and the tests. Look for changed response or error formats,
missing tests, protected-file edits and claims without evidence.
List findings by severity with file evidence. Do not approve if evidence is missing.
```

If it finds problems, paste the findings into your **first chat** and ask it to fix them. Then run the three checks again.

---

## 5. Step 4: You approve (3 min)

The agent can recommend. Only a person can approve.

Create `ai/worklogs/TEAM-201/human-approval.md` **yourself** with three lines: your decision, the evidence you looked at, and any risk you're accepting.

---

## 6. Compare with the reference (3 min)

A reference run of the same task is on the `solution` branch, as three commits to the `python/module-6` folder:

- `feat: add priority filter for TEAM-201`: a change whose tests pass but that breaks the error format
- `review: block TEAM-201 on error contract`: the review that caught it
- `fix: close TEAM-201 review findings`: the fix and the human approval record

Look at them only once you're done. To list them, run `git log --oneline solution -- .` in the `module-6` folder, then `git show <commit id>` to see one. To see the final state, run `git switch solution` (commit or discard your changes first), and `git switch demo-exercise` to go back.

---

## 7. Wrap-up (5 min)

Be ready to share one answer:

- Which control caught a problem in your session: a test, the boundary check, the review, or you?
- Which of these controls is your own team missing today?

---

**Source Control says there's no git repository?** Open the `module-6` folder from inside the `AI-SDLC` folder the clone created, and click **Yes** when VS Code offers to open the repository in the parent folder. Don't use GitHub's **Download ZIP** button, because that zip has no `.git` folder.

**Stuck?** To throw away all your changes and start again, open **Source Control**, hover over **Changes**, and click the **Discard All Changes** arrow (↶).
