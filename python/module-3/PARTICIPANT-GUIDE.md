# Module 3 — Context, memory and skills (Python)

**Hands-on · about 45 minutes**

In Module 1 the agent did well partly because the repo gave it good context. This time you'll see that directly. You'll build the same feature twice, in two copies of the same ticket service:

| Folder | Context in the repo | Prompt |
|---|---|---|
| `python/module-3/baseline-repo` | None: no rules, no task, no decisions. Just the code and one old note. | A one-line request |
| `python/module-3/context-ready-repo` | Rules (`AGENTS.md`), a task contract, a decision record, project memory and a skill | A structured request that points the agent at that context |

The code in both folders is identical. At the end, one command scores both results against the same acceptance criteria, so you can see exactly what the context changed.

**Baseline build → Context-ready: read context → skill → build → evidence → Compare**

---

## 1. Set up (5 min)

You need Python 3.11+, Git, and a coding agent installed (see `SETUP-CHECKLIST.md`).

1. If you haven't already, clone the workshop code. In a terminal, in the folder where you keep your projects, run:

   ```bash
   git clone --branch demo-exercise https://github.com/cobuild-tech/AI-SDLC.git
   ```

   This creates an `AI-SDLC` folder with a `javascript` and a `python` folder, each with one folder per module.
2. Open a terminal in `AI-SDLC/python/module-3` and set up both repos. Each has its own virtual environment:

   ```bash
   cd baseline-repo
   python3 -m venv .venv          # Windows: py -m venv .venv
   source .venv/bin/activate      # Windows: .venv\Scripts\activate
   pip install -r requirements-dev.txt
   pytest
   deactivate
   cd ../context-ready-repo
   python3 -m venv .venv          # Windows: py -m venv .venv
   source .venv/bin/activate      # Windows: .venv\Scripts\activate
   pip install -r requirements-dev.txt
   pytest
   deactivate
   cd ..
   ```

   Each should show **2 passed**. You're on the `demo-exercise` branch, which is where you work.

---

## 2. Baseline: build with no context (8 min)

1. In VS Code, choose **File → Open Folder** and open **`AI-SDLC/python/module-3/baseline-repo`**. Open exactly this folder, not `module-3`. If VS Code asks whether to open the Git repository in a parent folder, click **Yes**.
2. Open a terminal in this folder and activate its environment: `source .venv/bin/activate` (Windows: `.venv\Scripts\activate`). Start your coding agent from that terminal, in a **new chat**, and allow it to edit files and run commands.
3. Type this exactly as written, the way a busy beginner would, and nothing else:

```text
can you add an api to change the status of a ticket
```

If it asks you a question, reply only `just do whatever makes sense`. Don't give it any extra detail. Let it finish.

While it works, notice what it has to guess:

- Which status changes are allowed? Can a closed ticket be reopened?
- What URL, and what HTTP method?
- Which error codes and messages?
- Where does the logic go: the route or the service?
- Does it add tests? Does it update the README?

**Don't discard anything.** You'll score this result in step 7.

---

## 3. Context-ready: read the context first (7 min)

1. Choose **File → New Window**, then **File → Open Folder** and open **`AI-SDLC/python/module-3/context-ready-repo`**.
2. Open a terminal here, activate this folder's environment the same way, and start your agent from it in a **new chat** so nothing carries over from the baseline.

Have a quick look at what this repo has that the baseline didn't:

- `tasks/M3-001-ticket-status-update.md`: the task you'll build
- `AGENTS.md`: the rules, including which source wins when documents disagree
- `docs/decisions/ADR-001-...`: an accepted decision about how status changes work
- `docs/archive/...`: the same old note the baseline had, now marked **outdated**
- `docs/architecture.md`: where each kind of code belongs
- `docs/project-memory.md`: facts the team wants every agent session to remember
- `.agent/skills/api-change/SKILL.md`: a step-by-step procedure for API changes

Paste:

```text
Do not edit files yet.

Read AGENTS.md and the active task under tasks/. Tell me:
- the outcome and acceptance criteria
- which sources you trusted, and why
- the files you would change
- any outdated or conflicting information
- decisions that still need a person

Then propose a plan and wait for my approval.
```

**Check:**

- It found the task `M3-001` and the decision `ADR-001`.
- It noticed that the archived note conflicts with the decision, and it followed the decision.
- It named specific files and didn't edit anything.

---

## 4. Context-ready: use the skill (5 min)

```text
Use the API change procedure in .agent/skills/api-change/SKILL.md.
Say which step you are on as you work.
Stay read-only and give me an updated plan. Wait for my approval.
```

**Notice the difference:**

- `AGENTS.md` = rules that always apply.
- The skill = a procedure you pull in for one kind of job.

Approve the plan when you're happy with it.

---

## 5. Context-ready: build within limits (7 min)

```text
Plan approved. Implement the smallest change that meets the task.

You may edit files and run the project's tests.
Do not add dependencies, use the network, commit or push. Ask me first if you need to.

Run the focused tests first, then the full checks.
```

**Watch:** does it stay inside those limits, and does it ask before crossing one?

---

## 6. Context-ready: ask for evidence (5 min)

```text
Give me your evidence:
- each acceptance criterion and whether it is met
- files changed and why
- commands you ran and their results
- things you chose not to do because of the limits I set
```

Then check for yourself: run `pytest` in `context-ready-repo` (more than 2 tests should pass), and click each changed file in **Source Control**.

---

## 7. Compare the two repos (5 min)

In a terminal in `AI-SDLC/python/module-3`, run:

```bash
python3 compare_results.py     # Windows: py compare_results.py
```

It starts each repo's API, sends the same requests to both, runs a few checks on the code, and scores both against the acceptance criteria in `M3-001`. You'll see a table like this:

```text
Acceptance check                            Baseline  Context-ready
-------------------------------------------------------------------
open → in_progress works                    PASS      PASS
Reopening a closed ticket is refused (400)  FAIL      PASS
Workflow rules live in the service layer    FAIL      PASS
...
Score                                       4/12      12/12
```

Below the table, every failed check shows what was expected and what actually happened. Go through the baseline's failures and ask for each one: **was that the model's fault, or information it never had?** Then find the file in `context-ready-repo` that supplied that information.

Finally, open the two versions of `src/routes/tickets.py` side by side and compare them.

---

## 8. Compare with the solution (3 min)

Want to see a reference answer? It's in `python/module-3/context-ready-repo` on the `solution` branch. Commit or discard your changes first, then run `git switch solution` to see it, and `git switch demo-exercise` to go back. Look at it only once you're done.

---

## 9. Wrap-up (5 min)

Be ready to share one answer from your own session:

- Which baseline failure surprised you most, and which context file would have prevented it?
- The baseline had an old note and nothing saying it was out of date. What did the agent do with it, and how did the context-ready repo handle the same note?
- What would you add to `docs/project-memory.md` after this task?

---

**Source Control says there's no git repository?** Open the repo folder from inside the `AI-SDLC` folder the clone created, and click **Yes** when VS Code offers to open the repository in the parent folder. Don't use GitHub's **Download ZIP** button, because that zip has no `.git` folder.

**`compare_results.py` says a repo couldn't be scored?** Create that folder's `.venv` and run `pip install -r requirements-dev.txt` in it (see step 1). If the server didn't start, the agent's change probably broke the app: activate that folder's environment and run `python -m src.server` to see the error.

**Stuck?** To throw away all your changes and start again, open **Source Control**, hover over **Changes**, and click the **Discard All Changes** arrow (↶). This resets both repos.
