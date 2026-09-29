# Agentic Coding across the SDLC: Workshop Kit

Every module is hands-on. You drive your own coding agent on your own laptop.

## Pick your path

The workshop runs in two languages. The exercises, tasks, planted bugs and reference answers are the same in both. Only the code is different.

| Path | Folder | Stack |
|---|---|---|
| **JavaScript** | [`javascript/`](javascript/) | Node.js 20+, TypeScript, Express, Vitest |
| **Python** | [`python/`](python/) | Python 3.11+, FastAPI, pytest, mypy |

Choose the language you're more comfortable reading, and stay on that path for the whole workshop.

## What's where

The repository has two branches:

- **[`demo-exercise`](https://github.com/cobuild-tech/AI-SDLC/tree/demo-exercise)** (this page): the starting code for every module. This is where you work.
- **[`solution`](https://github.com/cobuild-tech/AI-SDLC/tree/solution)**: the same folders with the reference answers. Look at it only once you're done.

Each module folder has its own `PARTICIPANT-GUIDE.md`. [`SETUP-CHECKLIST.md`](SETUP-CHECKLIST.md) covers the whole workshop, for both paths.

Modules 2, 4 and 9 are slide-only and have no code here.

## Modules

| Module | JavaScript | Python | Also on the `solution` branch |
|---|---|---|---|
| 1. First supervised agent session | [`javascript/module-1/`](javascript/module-1/PARTICIPANT-GUIDE.md) | [`python/module-1/`](python/module-1/PARTICIPANT-GUIDE.md) | |
| 3. Context, memory and skills | [`javascript/module-3/`](javascript/module-3/PARTICIPANT-GUIDE.md) | [`python/module-3/`](python/module-3/PARTICIPANT-GUIDE.md) | |
| 5. Greenfield | [`javascript/module-5-greenfield/`](javascript/module-5-greenfield/PARTICIPANT-GUIDE.md) | [`python/module-5-greenfield/`](python/module-5-greenfield/PARTICIPANT-GUIDE.md) | `module-5-greenfield-one-shot/` in each path: what a single "build everything" prompt produces |
| 5. Brownfield | [`javascript/module-5-brownfield/`](javascript/module-5-brownfield/PARTICIPANT-GUIDE.md) | [`python/module-5-brownfield/`](python/module-5-brownfield/PARTICIPANT-GUIDE.md) | |
| 6. Team operating model | [`javascript/module-6/`](javascript/module-6/PARTICIPANT-GUIDE.md) | [`python/module-6/`](python/module-6/PARTICIPANT-GUIDE.md) | One commit per stage: implementation, critical review, approval |
| 7. Guardrails (review an agent's work) | [`javascript/module-7/`](javascript/module-7/PARTICIPANT-GUIDE.md) | [`python/module-7/`](python/module-7/PARTICIPANT-GUIDE.md) | `ANSWER-KEY.md` and the corrected code |
| 8. Capstone | [`javascript/module-8/`](javascript/module-8/PARTICIPANT-GUIDE.md) | [`python/module-8/`](python/module-8/PARTICIPANT-GUIDE.md) | |

Each link opens that module's guide.

## How to get started

You don't need a GitHub account.

### 1. Set up your laptop (once, before the workshop)

Follow [`SETUP-CHECKLIST.md`](SETUP-CHECKLIST.md). You need Git, VS Code, a coding agent, and either Node.js 20+ (JavaScript path) or Python 3.11+ (Python path).

### 2. Get the code (once, for every module)

Open a terminal in the folder where you keep your projects, and run:

```bash
git clone --branch demo-exercise https://github.com/cobuild-tech/AI-SDLC.git
```

This creates an `AI-SDLC` folder with a `javascript` and a `python` folder, each with one folder per module, already on the `demo-exercise` branch where you work.

Use `git clone`, not GitHub's **Download ZIP** button. A downloaded zip has no `.git` folder, so it has no branches and VS Code's Source Control can't show your changes.

### 3. Open a module and start working

1. In VS Code, choose **File → Open Folder** and open the module's folder for your path (for example `AI-SDLC/javascript/module-1` or `AI-SDLC/python/module-1`).
2. If VS Code asks whether to open the Git repository found in a parent folder, click **Yes**. Otherwise Source Control can't show your changes.
3. Open the module's `PARTICIPANT-GUIDE.md` and follow it step by step. The guide tells you which commands to run: usually `npm install` and `npm test` for JavaScript, or creating a virtual environment and running `pytest` for Python.
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
- **`pip install` fails.** Check `python3 --version` (Windows: `py --version`) shows 3.11 or higher, and that the module's virtual environment is active. If you're on a work network without PyPI access, ask your facilitator for an internal package mirror.
- **`pytest` or `mypy` says "command not found".** The module's virtual environment isn't active in this terminal. Run `source .venv/bin/activate` (Windows: `.venv\Scripts\activate`) in the module folder.
- **Want to start a module over?** Inside the module folder, run `git restore --staged --worktree -- .` and then `git clean -fd -- .`. This resets only that module. It keeps `node_modules` and `.venv`, because Git ignores them.

## For maintainers: updating the module code

`solution` is built on top of `demo-exercise`, with one commit per module solution for each path.

- **A change to the starting code or a guide**: commit it on `demo-exercise`, then merge `demo-exercise` into `solution` so both branches have it.
- **A change to a reference answer**: commit it on `solution` only.
- **A change to one path**: make the matching change in the other path too, so the two stay equivalent.

Module 7's review compares the agent's commit, `SEC-301: add ticket export`, with the commit before it, in each path's `module-7` folder. Don't squash or rewrite those commits.
