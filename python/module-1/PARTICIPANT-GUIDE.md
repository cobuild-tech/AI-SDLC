# Module 1 — Your first supervised agent session (Python)

**Hands-on · about 35 minutes**

You will ask a coding agent to add a small feature, and you approve each step before it moves on:

**Plan → Build → Check**

The feature is deliberately small. What matters is how you supervise the agent.

---

## 1. Set up (5 min)

You need Python 3.11+, Git, and a coding agent installed (see `SETUP-CHECKLIST.md`). You don't need a GitHub account. Everything runs on your own machine.

1. Clone the workshop code. In a terminal, in the folder where you keep your projects, run:

   ```bash
   git clone --branch demo-exercise https://github.com/cobuild-tech/AI-SDLC.git
   ```

   This creates an `AI-SDLC` folder with a `javascript` and a `python` folder, each with one folder per module. You only need to clone once for the whole workshop.
2. In VS Code, choose **File → Open Folder** and open the `AI-SDLC/python/module-1` folder. If VS Code asks whether to open the Git repository in a parent folder, click **Yes**.
3. Open the terminal (**Terminal → New Terminal**) and run:

```bash
python3 -m venv .venv          # Windows: py -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements-dev.txt
pytest
```

You should see **2 passed**. You're on the `demo-exercise` branch, which is where you work.

Now start your coding agent **in the `module-1` folder**, from this terminal so it uses the same virtual environment.

Take one minute to open `AGENTS.md`. It holds the project's rules for coding agents: 7 short lines. You'll use it to check the agent's plan.

---

## 2. The feature

Add an optional `status` filter to `GET /api/tickets`:

- `?status=open` returns tickets 1 and 4
- `?status=in_progress` returns ticket 2
- `?status=closed` returns ticket 3
- any other value returns an **HTTP 400** error
- no `status` returns all tickets, the same as today

---

## 3. Step 1: Plan, with no changes yet (8 min)

Paste this into your agent:

```text
Add an optional status filter to GET /api/tickets.
Allowed values: open, in_progress, closed. Return HTTP 400 for any other value.
Keep current behavior when status is omitted.

First read the repository and follow the rules in AGENTS.md.
Then tell me your plan and any open questions.
Do not change any files until I approve.
```

**Before you approve, check:**

- It changed no files yet.
- It follows the rules in `AGENTS.md`.
- It plans to add tests.
- It adds no new libraries.

If something's wrong, say so and ask for a new plan. Approve only when you're happy with it.

---

## 4. Step 2: Build (5 min)

```text
Go ahead with the approved plan. Add tests and update the README.
```

**Watch:** does it only touch the files it said it would?

---

## 5. Step 3: Check (7 min)

Ask the agent for proof:

```text
Run pytest and mypy. Show me the results and list every file you changed.
```

Then check for yourself. Don't just take the agent's word for it:

- Run `pytest` in the terminal. More than 2 tests should pass.
- Open the **Source Control** panel in VS Code (the branch icon on the left, or `Ctrl+Shift+G` / `Cmd+Shift+G`). It lists every file the agent changed. Click a file to see the old and new versions side by side.
- Can you explain every change? If not, ask the agent.

**Done** when the tests pass and you'd approve this change as a pull request.

---

## 6. Compare with the solution (3 min)

Want to see a reference answer? It's in the same `python/module-1` folder on the `solution` branch: run `git switch solution` to see it, and `git switch demo-exercise` to go back. Commit or discard your changes first. Compare it with your own changes in **Source Control**: what did your agent do differently?

Look at it only once you're done.

---

## 7. Wrap-up (5 min)

Be ready to share one answer from your own session:

- What decision did **you** make that the agent couldn't?
- What convinced you it actually worked?

---

**Source Control says there's no git repository?** Open the `module-1` folder from inside the `AI-SDLC` folder the clone created, and click **Yes** when VS Code offers to open the repository in the parent folder. Don't use GitHub's **Download ZIP** button, because that zip has no `.git` folder.

**`pytest` or `mypy` says "command not found"?** The virtual environment isn't active in this terminal. Run `source .venv/bin/activate` (Windows: `.venv\Scripts\activate`), then restart your agent from this terminal.

**Stuck?** To throw away all your changes and start again, open **Source Control**, hover over **Changes**, and click the **Discard All Changes** arrow (↶).
