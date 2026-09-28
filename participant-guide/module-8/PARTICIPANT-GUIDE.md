# Module 8 — Capstone

**Hands-on · about 70 minutes**

Everything from the workshop, in one piece of work. You're taking over a small service you haven't seen before. It has a reported bug, a feature request and security rules. Use your agent to make the **smallest safe change**, with evidence at every step.

**Understand → Plan → Prove the bug → Build → Check → Review → Pull request**

How you work matters as much as the final code.

---

## 1. Set up (5 min)

You need Node.js 20+, Git, and a coding agent installed (see `SETUP-CHECKLIST.md`).

1. If you haven't already, clone the workshop code. In a terminal, in the folder where you keep your projects, run:

   ```bash
   git clone --branch demo-exercise https://github.com/cobuild-tech/AI-SDLC.git
   ```

   This creates an `AI-SDLC` folder with one folder per module.
2. In VS Code, choose **File → Open Folder** and open the `AI-SDLC/module-8` folder. If VS Code asks whether to open the Git repository in a parent folder, click **Yes**.
3. Open the terminal (**Terminal → New Terminal**) and run:

```bash
npm run validate
```

You should see **pass 5**. No `npm install` is needed. You're on the `demo-exercise` branch, which is where you work.

Now start your coding agent **in the `module-8` folder**.

---

## 2. Step 1: Understand and map (10 min)

```text
Read AGENTS.md and every file in docs/. Do not edit anything.
1. Restate the requirement in your own words. List questions, assumptions
   and non-goals.
2. Map how POST /tickets flows through the code, with file paths.
3. Name the smallest set of files that need to change.
```

**Check. Did it notice:**

- Critical tickets beat platinum tickets when both apply?
- Every ticket needs a list of reasons (`decisionReasons`)?
- The audit log currently records the customer's email and summary, which the security rules forbid? The feature request doesn't mention this.

---

## 3. Step 2: Plan (5 min)

```text
Give me a small plan: for each step, the file, the change, the test and the risk.
Include what a person must approve. Do not edit yet.
```

**Check:** it changes only `src/domain/triage.js`, `src/app.js` and tests. No new packages, no rewrite.

---

## 4. Step 3: Prove the bug first (7 min)

```text
Add one test that reproduces the bug in docs/reported-defect.md.
Run only that test and show me it fails. Do not fix anything yet.
```

**Check:** it fails because `" Critical "` isn't recognised, not because the test is broken.

---

## 5. Step 4: Build (15 min)

```text
Implement the approved plan in small steps. Keep the current structure.
Add tests for: mixed-case input, platinum + blocked routing,
critical beating platinum, reasons on every ticket, and the audit log
containing only allowed fields. Run the relevant tests after each step.
```

**Watch:**

- Is the trimming and lowercasing applied to **all three** fields, not just severity?
- Does critical still win over platinum?
- Is the audit log fixed with a list of **allowed** fields? A list of removed fields breaks as soon as someone adds a new one.

---

## 6. Step 5: Check (8 min)

```text
Run npm run validate. Show me each command and its real result.
List anything that is still untested.
```

Then check for yourself:

- Run `npm run validate`. More than 5 tests should pass.
- Open **Source Control** and click each changed file.

---

## 7. Step 6: Independent review (7 min)

Open a **new chat**, so the reviewer doesn't share the builder's assumptions:

```text
Act as a critical reviewer. Do not edit code. Read docs/ and review
all uncommitted changes. Look for wrong rule order, missing reasons,
personal data in logs, weakened security, unneeded changes and weak tests.
List findings by severity with file evidence.
```

Fix anything real in your first chat.

---

## 8. Step 7: Pull request and approvals (5 min)

```text
Write a pull-request description: what changed and why, tests and commands run,
security impact, risks, and who must approve. Separate facts from recommendations.
```

**Check:** it *asks* for approvals and doesn't claim them. Who must approve? See `docs/security-constraints.md`.

---

## 9. Compare with the solution (3 min)

Want to see a reference answer? It's in the same `module-8` folder on the `solution` branch: run `git switch solution` to see it, and `git switch demo-exercise` to go back. Commit or discard your changes first. Compare it with your own changes in **Source Control**: what did your agent do differently?

Look at it only once you're done.

---

## 10. Wrap-up (5 min)

Be ready to share one answer:

- What did exploring the code reveal that the feature request didn't mention?
- Which decision in this task must a person make, not the agent?

---

**Source Control says there's no git repository?** Open the `module-8` folder from inside the `AI-SDLC` folder the clone created, and click **Yes** when VS Code offers to open the repository in the parent folder. Don't use GitHub's **Download ZIP** button, because that zip has no `.git` folder.

**Stuck?** To throw away all your changes and start again, open **Source Control**, hover over **Changes**, and click the **Discard All Changes** arrow (↶).
