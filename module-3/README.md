# Ticket Service: Context, Memory and Skills Lab

A small TypeScript and Express API used in the Module 3 hands-on lab.

## Requirements

- Node.js 20 or later
- npm 10 or later

## Setup

```bash
npm install
npm test
npm run lint
```

## Run the API

```bash
npm run dev
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

Work starts in this folder on the `demo-exercise` branch. The `solution` branch holds a reference answer in the same folder.
