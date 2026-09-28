# Module 3 — Context, memory and skills

**Hands-on · about 40 minutes**

In Module 1 the agent did well partly because the repo gave it good context. This time you'll see that directly. You'll give the agent a weak request, then good context, a reusable procedure (a "skill") and clear limits, and watch how its work changes.

**Weak prompt → Context → Skill → Build → Evidence**

---

## 1. Set up (5 min)

You need Node.js 20+, Git, and a coding agent installed (see `SETUP-CHECKLIST.md`).

1. If you haven't already, clone the workshop code. In a terminal, in the folder where you keep your projects, run:

   ```bash
   git clone --branch demo-exercise https://github.com/cobuild-tech/AI-SDLC.git
   ```

   This creates an `AI-SDLC` folder with one folder per module.
2. In VS Code, choose **File → Open Folder** and open the `AI-SDLC/module-3` folder. If VS Code asks whether to open the Git repository in a parent folder, click **Yes**.
3. Open the terminal (**Terminal → New Terminal**) and run:

```bash
npm install
npm test
```

You should see **2 passed**. You're on the `demo-exercise` branch, which is where you work.

Now start your coding agent **in the `module-3` folder**.

---

## 2. What's in this repo

This is the same ticket service as Module 1, with extra context the agent can use:

- `tasks/M3-001-ticket-status-update.md`: the task you'll build
- `AGENTS.md`: the rules, including which source wins when documents disagree
- `docs/decisions/ADR-001-...`: an accepted decision about how status changes work
- `docs/archive/...`: an old, **outdated** note that contradicts the decision
- `docs/project-memory.md`: facts the team wants every agent session to remember
- `.agent/skills/api-change/SKILL.md`: a step-by-step procedure for API changes

---

## 3. Step 1: A weak prompt (3 min)

Paste this, and **don't let the agent change any files**:

```text
Add an endpoint to update a ticket status.
```

Notice what it has to guess, for example which status changes are allowed and which errors to return. If it changed anything, open **Source Control** and click **Discard All Changes** (↶).

---

## 4. Step 2: Give it context (7 min)

Start a **new chat** so the weak prompt doesn't carry over, then paste:

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

## 5. Step 3: Use the skill (5 min)

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

## 6. Step 4: Build within limits (7 min)

```text
Plan approved. Implement the smallest change that meets the task.

You may edit files and run the project's tests.
Do not add dependencies, use the network, commit or push. Ask me first if you need to.

Run the focused tests first, then the full checks.
```

**Watch:** does it stay inside those limits, and does it ask before crossing one?

---

## 7. Step 5: Ask for evidence (5 min)

```text
Give me your evidence:
- each acceptance criterion and whether it is met
- files changed and why
- commands you ran and their results
- things you chose not to do because of the limits I set
```

Then check for yourself:

- Run `npm test`. More than 2 tests should pass.
- Open **Source Control** and click each changed file.

---

## 8. Compare with the solution (3 min)

Want to see a reference answer? It's in the same `module-3` folder on the `solution` branch: run `git switch solution` to see it, and `git switch demo-exercise` to go back. Commit or discard your changes first. Compare it with your own changes in **Source Control**: what did your agent do differently?

Look at it only once you're done.

---

## 9. Wrap-up (5 min)

Be ready to share one answer from your own session:

- What went wrong with the one-line prompt, and was that the model's fault or missing context?
- What would you add to `docs/project-memory.md` after this task?

---

**Source Control says there's no git repository?** Open the `module-3` folder from inside the `AI-SDLC` folder the clone created, and click **Yes** when VS Code offers to open the repository in the parent folder. Don't use GitHub's **Download ZIP** button, because that zip has no `.git` folder.

**Stuck?** To throw away all your changes and start again, open **Source Control**, hover over **Changes**, and click the **Discard All Changes** arrow (↶).
