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

- `demo-start`: where you work
- `implementation`, `critical-review`, `approved`: a reference run of the same task, one stage per branch
