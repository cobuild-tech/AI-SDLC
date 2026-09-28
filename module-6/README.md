# Ticket query service

A small repository used in the Module 6 hands-on lab on team operating models.

## Commands

```bash
npm test
npm run lint
npm run check:boundaries
```

No `npm install` is needed. These commands use only Node.js built-ins.

## Workflow

Work begins from an approved task contract. Each agent task uses its own branch or worktree. Material changes require a plan. A human owner reviews the final change after CI and an independent critical review.

See `AGENTS.md` for repository rules and `tasks/` for active work.

## Branches

- `demo-exercise` branch: where you work
- `solution` branch: a reference run of the same task, one commit per stage (implementation, critical review, approved). See them with `git log --oneline solution -- .`
