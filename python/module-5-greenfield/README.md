# Ticket triage API

A small Python and FastAPI API that applies deterministic routing rules when an internal support ticket is created.

## Setup

```bash
python3 -m venv .venv          # Windows: py -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements-dev.txt
pytest
mypy
```

## Run

```bash
python -m src.server
```

The API listens on `http://localhost:3000` by default.

## Example

```bash
curl -s http://localhost:3000/api/tickets \
  -H 'content-type: application/json' \
  -d '{"title":"Production unavailable","description":"Checkout is down","customerTier":"enterprise"}'
```

The outage rule has precedence, so the ticket is routed to `platform` with `critical` priority. See `docs/API.md` for the complete contract.

## Architecture

- Routes validate transport input and select response codes.
- Services apply triage and creation rules.
- The repository owns in-memory storage.
- Domain types are shared from `src/models`.

Authentication, persistence, ticket updates, search, and a UI are intentionally outside this release.
