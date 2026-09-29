# Ticket query service

A small repository used in the Module 6 hands-on lab on team operating models.

## Commands

```bash
pytest
python -m compileall -q src tests
python scripts/check_boundaries.py
```

The service itself uses only the Python standard library. The only thing to install is pytest:

```bash
python3 -m venv .venv          # Windows: py -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements-dev.txt
```

## Workflow

Work begins from an approved task contract. Each agent task uses its own branch or worktree. This lab has two tasks: TEAM-201 filters the ticket list, and TEAM-202 adds a comment. They edit different files. Material changes require a plan. A human owner reviews the final change after CI and an independent critical review.

See `AGENTS.md` for repository rules and `tasks/` for active work.

## Branches

- `demo-exercise` branch: where you work
- `solution` branch: a reference run of the same task, one commit per stage (implementation, critical review, approved). See them with `git log --oneline solution -- .`
