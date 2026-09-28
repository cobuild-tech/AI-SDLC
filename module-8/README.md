# Support Ticket Operations API — Capstone Starter

This is the participant repository for Module 8 of the Agentic Coding across the SDLC workshop.

The repository is intentionally incomplete. It contains an existing service, a reported defect, an enhancement request, architectural constraints and security constraints. Your task is to use an agent to make the smallest safe change that satisfies the acceptance criteria.

## Prerequisites

- Node.js 20 or newer
- npm
- An agentic coding tool approved by your organization

No external packages are required.

## Quick start

```bash
npm test
npm run lint
LAB_API_KEY=local-demo-key npm start
```

Example request:

```bash
curl -s http://localhost:3000/tickets \
  -H 'content-type: application/json' \
  -H 'x-api-key: local-demo-key' \
  -d '{
    "severity": "high",
    "customerTier": "standard",
    "serviceImpact": "degraded",
    "summary": "Checkout is intermittently slow",
    "requesterEmail": "alex@example.test"
  }'
```

## Start here

Read these files before changing code:

1. `AGENTS.md`
2. `docs/business-requirement.md`
3. `docs/reported-defect.md`
4. `docs/enhancement-request.md`
5. `docs/acceptance-criteria.md`
6. `docs/architecture-constraints.md`
7. `docs/security-constraints.md`

## Useful commands

| Command | Purpose |
| --- | --- |
| `npm test` | Run the existing test suite |
| `npm run lint` | Perform dependency-free source checks |
| `npm run validate` | Run all local quality gates |
| `npm start` | Start the API on port 3000 |

## API

- `POST /tickets` — create and triage a ticket
- `GET /tickets/:id` — retrieve a ticket
- `GET /health` — liveness check; does not require authentication

All ticket endpoints require the `x-api-key` header.

## Branches

- `main`: where you work
- `solution`: a reference answer
