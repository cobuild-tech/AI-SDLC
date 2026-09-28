# Module 7 — Guardrails: review an agent's work

**Hands-on · about 30 minutes**

An agent has finished a feature and says it's **complete and safe to merge**. Your job is to check whether that's true before anything gets approved.

**Read the brief → Review the change → Get a second opinion → Decide**

All credentials and customer data in this repo are fake.

---

## 1. Set up (5 min)

You need Node.js 20+, Git, and a coding agent installed (see `SETUP-CHECKLIST.md`).

1. If you haven't already, clone the workshop code. In a terminal, in the folder where you keep your projects, run:

   ```bash
   git clone --branch demo-exercise https://github.com/cobuild-tech/AI-SDLC.git
   ```

   This creates an `AI-SDLC` folder with one folder per module.
2. In VS Code, choose **File → Open Folder** and open the `AI-SDLC/module-7` folder. If VS Code asks whether to open the Git repository in a parent folder, click **Yes**.
3. Open the terminal (**Terminal → New Terminal**). **Don't run `npm install`.** It's not needed, and it fails on purpose.

You're on the `demo-exercise` branch, which holds the agent's work.

---

## 2. Step 1: Read the brief (3 min)

- `tasks/SEC-301-ticket-export.md`: what was asked for
- `AGENTS.md`: the security rules
- `agent-completion-report.md`: what the agent **claims** it did

---

## 3. Step 2: Review the change yourself (10 min)

These are the files the agent changed. Open each one:

- `src/exportTickets.js`
- `src/ticketService.js`
- `test/exportTickets.test.js`
- `package.json`
- `.github/workflows/quality.yml`
- `agent-completion-report.md`

Run the checks:

```bash
npm test
npm run lint
npm run security
```

**Look for:**

- Who is allowed to export? Is that actually checked?
- What data comes back, and what gets written to logs?
- Any passwords or tokens in the code?
- New packages that aren't approved (see `docs/approved-dependencies.md`)?
- What happens when something fails?
- Do the tests prove anything useful?
- Were the CI or security checks changed?
- Changes the task didn't ask for?
- Is each claim in the agent's report actually true?

**Write down each problem:** the file, what's wrong, and how serious it is.

---

## 4. Step 3: Get a second opinion (5 min)

```text
Act as a security reviewer. Do not edit any files.
Review the agent's change: the commit "SEC-301: add ticket export" in this folder
(find it with git log --oneline -- .), compared with the commit before it,
against tasks/SEC-301-ticket-export.md and AGENTS.md.
List every problem by severity, with the file and the evidence.
Check each claim in agent-completion-report.md.
```

Compare with your own list. What did it find that you missed, and what did you find that it missed? Its review is a claim too, so check it.

---

## 5. Step 4: Decide (2 min)

Pick one: **approve**, **request changes**, or **escalate**. Write one line explaining why.

---

## 6. Compare with the answer key (3 min)

Both are in the same `module-7` folder on the `solution` branch:

- `ANSWER-KEY.md` lists every planted problem
- the rest of the folder is the corrected code

Look at them only once you've decided. Run `git switch solution` to see them, and `git switch demo-exercise` to go back.

---

## 7. Wrap-up (5 min)

Be ready to share one answer:

- Which of the agent's claims sounded true until you checked it?
- Which problem could a tool have caught, and which needed a person?
