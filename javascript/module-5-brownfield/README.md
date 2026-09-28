# Legacy ticket query service

Internal API used by support dashboards to query tickets.

## Setup

```bash
npm ci
npm test
npm run lint
npm run build
```

## Run

```bash
npm run dev
```

## API

`GET /api/tickets` returns `{ "items": [...], "total": number }`.

Optional filters:

- `priority=normal|medium|high|critical`, matched case-insensitively
- `unassigned=true|false`

Filters compose. Invalid or repeated values return the standard JSON error envelope. The service does not currently paginate results.
