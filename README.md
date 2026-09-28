# Agentic Coding across the SDLC: Workshop Kit

Every module is hands-on. You drive your own coding agent on your own laptop.

## What's where

The repository has two branches:

- **[`demo-exercise`](https://github.com/cobuild-tech/AI-SDLC/tree/demo-exercise)** (this page): the starting code for every module, one folder per module. This is where you work.
- **[`solution`](https://github.com/cobuild-tech/AI-SDLC/tree/solution)**: the same folders with the reference answers. Look at it only once you're done.

Both branches have [`participant-guide/`](participant-guide/), with one `PARTICIPANT-GUIDE.md` per module plus [`SETUP-CHECKLIST.md`](participant-guide/SETUP-CHECKLIST.md) for the whole workshop. Read these directly on GitHub.

Modules 2, 4 and 9 are slide-only and have no code here.

## Modules

| Module | Guide | Folder | Also on the `solution` branch |
|---|---|---|---|
| 1. First supervised agent session | [Guide](participant-guide/module-1/PARTICIPANT-GUIDE.md) | [`module-1/`](https://github.com/cobuild-tech/AI-SDLC/tree/demo-exercise/module-1) | |
| 3. Context, memory and skills | [Guide](participant-guide/module-3/PARTICIPANT-GUIDE.md) | [`module-3/`](https://github.com/cobuild-tech/AI-SDLC/tree/demo-exercise/module-3) | |
| 5. Greenfield | [Guide](participant-guide/module-5/PARTICIPANT-GUIDE.md) | [`module-5-greenfield/`](https://github.com/cobuild-tech/AI-SDLC/tree/demo-exercise/module-5-greenfield) | [`module-5-greenfield-one-shot/`](https://github.com/cobuild-tech/AI-SDLC/tree/solution/module-5-greenfield-one-shot): what a single "build everything" prompt produces |
| 5. Brownfield | [Guide](participant-guide/module-5/PARTICIPANT-GUIDE.md) | [`module-5-brownfield/`](https://github.com/cobuild-tech/AI-SDLC/tree/demo-exercise/module-5-brownfield) | |
| 6. Team operating model | [Guide](participant-guide/module-6/PARTICIPANT-GUIDE.md) | [`module-6/`](https://github.com/cobuild-tech/AI-SDLC/tree/demo-exercise/module-6) | One commit per stage: implementation, critical review, approval |
| 7. Guardrails (review an agent's work) | [Guide](participant-guide/module-7/PARTICIPANT-GUIDE.md) | [`module-7/`](https://github.com/cobuild-tech/AI-SDLC/tree/demo-exercise/module-7) | [`module-7/ANSWER-KEY.md`](https://github.com/cobuild-tech/AI-SDLC/blob/solution/module-7/ANSWER-KEY.md) and the corrected code |
| 8. Capstone | [Guide](participant-guide/module-8/PARTICIPANT-GUIDE.md) | [`module-8/`](https://github.com/cobuild-tech/AI-SDLC/tree/demo-exercise/module-8) | |

## How to get started

You don't need a GitHub account.

### 1. Set up your laptop (once, before the workshop)

Follow [`participant-guide/SETUP-CHECKLIST.md`](participant-guide/SETUP-CHECKLIST.md). You need Node.js 20+, Git, VS Code and a coding agent.

### 2. Get the code (once, for every module)

Open a terminal in the folder where you keep your projects, and run:

```bash
git clone --branch demo-exercise https://github.com/cobuild-tech/AI-SDLC.git
```

This creates an `AI-SDLC` folder with one folder per module, already on the `demo-exercise` branch where you work.

Use `git clone`, not GitHub's **Download ZIP** button. A downloaded zip has no `.git` folder, so it has no branches and VS Code's Source Control can't show your changes.

### 3. Open a module and start working

1. In VS Code, choose **File → Open Folder** and open the module's folder inside `AI-SDLC` (for example `AI-SDLC/module-1`).
2. If VS Code asks whether to open the Git repository found in a parent folder, click **Yes**. Otherwise Source Control can't show your changes.
3. Open the module's **Guide** from the table and follow it step by step. The guide tells you which commands to run (usually `npm install` and `npm test`).
4. Start your coding agent **in that same module folder**.

### 4. Compare with the solution

At the end of most modules, the guide asks you to look at the `solution` branch. In the terminal, inside the module folder:

```bash
git switch solution         # look at the reference answer
git switch demo-exercise    # go back to your work
```

Or in VS Code: click the branch name in the **bottom-left corner**, and pick `solution` from the list.

Commit or discard your own changes before you switch. Otherwise Git may refuse to switch.

When you finish a module, commit or discard your changes and switch back to `demo-exercise`. Every module shares one repository, so leftover changes show up in the next module's Source Control.

## Troubleshooting

- **VS Code's Source Control says there's no git repository.** Open the module folder from inside the `AI-SDLC` folder the clone created, and click **Yes** when VS Code offers to open the repository in the parent folder. If there's no offer, set **Git: Open Repository In Parent Folders** to `always` in VS Code's Settings and reopen the folder. If you used **Download ZIP**, clone again instead.
- **`git clone` says "Remote branch not found".** Check the branch name is `demo-exercise`. Names are case-sensitive.
- **`npm install` fails.** Check `node --version` shows 20 or higher. If you're on a work network without npm access, ask your facilitator for an internal package mirror.
- **Want to start a module over?** Inside the module folder, run `git restore --staged --worktree -- .` and then `git clean -fd -- .`. This resets only that module.

## For maintainers: updating the module code

`solution` is built on top of `demo-exercise`, with one commit per module solution.

- **A change to the starting code or a guide**: commit it on `demo-exercise`, then merge `demo-exercise` into `solution` so both branches have it.
- **A change to a reference answer**: commit it on `solution` only.

Module 7's review compares the agent's commit, `SEC-301: add ticket export`, with the commit before it. Don't squash or rewrite that commit.
