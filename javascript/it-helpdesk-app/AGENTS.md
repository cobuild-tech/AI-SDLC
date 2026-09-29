# AGENTS.md

Guidance for AI coding agents working in this repo.

## What this is

A small IT helpdesk ticketing library in TypeScript. There is no server and
no database: `src/data.ts` holds in-memory arrays, and `src/ticketService.ts`
holds plain functions over them.

## Commands

- `npm test` runs every test (`node --test`). Run it before you say you're done.
- There is no build step. Node runs `.ts` files directly (type stripping).

## TypeScript rules (Node type stripping)

- Import local files with the `.ts` extension: `import { x } from "./data.ts"`.
- Use `import type` for type-only imports.
- Do not use `enum`, `namespace`, or constructor parameter properties. Use
  string-literal unions and plain objects instead.

## Conventions

- Validation failures `throw new Error("...")` with a message that names the
  ticket and the reason, e.g. `Ticket 4 is closed and cannot be reassigned`.
- Tests use `node:test` and `node:assert/strict`, and call `resetData()` in
  `beforeEach` so every test starts from the seed data.
- Anything time-dependent takes a `now: Date` parameter (default
  `new Date()`), and tests always pass `now` explicitly.
- Never delete tickets. Change their status instead; the history is the
  audit trail.

## Status lifecycle

| From | To | Via |
|---|---|---|
| open | in_progress | `assignTicket` |
| open, in_progress | resolved | `resolveTicket` (resolution note required) |
| resolved | closed | `closeTicket` |

Any transition not in this table is a bug.
