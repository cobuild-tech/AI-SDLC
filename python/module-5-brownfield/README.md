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

The default page size is 50. Query filtering is not yet documented; consult the implementation when maintaining this service.
