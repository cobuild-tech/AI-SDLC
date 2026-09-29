# Ticket Service: Agentic Coding Lab

A small Python and FastAPI API used in the Module 1 hands-on lab.

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

Filter the response by supplying an optional `status` query parameter:

```http
GET /api/tickets?status=open
```

Allowed values are `open`, `in_progress`, and `closed`. The API returns HTTP
400 with a JSON error when the value is unsupported.

## Starting over

Work starts in this folder on the `demo-exercise` branch. The `solution` branch holds a reference answer in the same folder. To discard all your changes in this folder:

```bash
git restore --staged --worktree -- .
git clean -fd -- .
```
