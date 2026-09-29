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

The default page size is 50. Query filtering is not yet documented; consult the implementation when maintaining this service.

