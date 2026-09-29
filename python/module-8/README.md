# Support Ticket Operations API — Capstone Starter

This is the participant repository for Module 8 of the Agentic Coding across the SDLC workshop.

The repository is intentionally incomplete. It contains an existing service, a reported defect, an enhancement request, architectural constraints and security constraints. Your task is to use an agent to make the smallest safe change that satisfies the acceptance criteria.

## Prerequisites

- Python 3.11 or newer
- An agentic coding tool approved by your organization

## Quick start

```bash
python3 -m venv .venv          # Windows: py -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements-dev.txt
python scripts/validate.py
LAB_API_KEY=local-demo-key python -m src.server
```

On Windows PowerShell, start the server with `$env:LAB_API_KEY="local-demo-key"; python -m src.server`.

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
| `pytest` | Run the existing test suite |
| `python scripts/lint.py` | Perform dependency-free source checks |
| `python scripts/validate.py` | Run all local quality gates |
| `python -m src.server` | Start the API on port 3000 |

## API

- `POST /tickets` — create and triage a ticket
- `GET /tickets/{id}` — retrieve a ticket
- `GET /health` — liveness check; does not require authentication

All ticket endpoints require the `x-api-key` header.

## Branches

- `demo-exercise`: where you work
- `solution`: a reference answer, in the same folder
