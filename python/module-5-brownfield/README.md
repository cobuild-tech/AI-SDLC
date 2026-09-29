# Legacy ticket query service

Internal API used by support dashboards to query tickets.

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

## API

`GET /api/tickets` returns `{ "items": [...], "total": number }`.

Optional filters:

- `priority=normal|medium|high|critical`, matched case-insensitively
- `unassigned=true|false`

Filters compose. Invalid or repeated values return the standard JSON error envelope. The service does not currently paginate results.
