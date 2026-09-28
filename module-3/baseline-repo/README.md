# Ticket Service

A small TypeScript and Express API.

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
