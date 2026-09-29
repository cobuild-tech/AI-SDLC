# Ticket Service: Context, Memory and Skills Lab

A small Python and FastAPI API used in the Module 3 hands-on lab.

## Requirements

- Python 3.11 or later

## Setup

```bash
python3 -m venv .venv          # Windows: py -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements-dev.txt
pytest
mypy
```

## Run the API

```bash
python -m src.server
```

The server listens on `http://localhost:3000` by default.

## Endpoints

### Health check

```http
GET /health
```

### List tickets

```http
GET /api/tickets
```

The endpoint returns every ticket in the in-memory store.

### Update ticket status

```http
PATCH /api/tickets/:id/status
Content-Type: application/json

{ "status": "in_progress" }
```

Tickets follow a forward-only workflow: `open` to `in_progress`, then `in_progress` to `closed`. A closed ticket is terminal.

## Starting branch

Work starts in this folder (`python/module-3/context-ready-repo`) on the `demo-exercise` branch. The `solution` branch holds a reference answer in the same folder.
