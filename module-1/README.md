# Ticket Service: Agentic Coding Lab

A small TypeScript and Express API used in the Module 1 hands-on lab.

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

## Starting branch

Work starts on the `demo-start` branch. To discard all local changes and return to it:

```bash
git switch demo-start
git reset --hard demo-start
git clean -fd
```
