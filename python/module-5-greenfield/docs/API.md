# API contract

## `GET /health`

Response: `200 OK`

```json
{ "status": "ok" }
```

## `POST /api/tickets`

Request:

```json
{
  "title": "Production unavailable",
  "description": "Checkout is down",
  "customerTier": "enterprise"
}
```

Response: `201 Created`

```json
{
  "id": 1,
  "title": "Production unavailable",
  "description": "Checkout is down",
  "customerTier": "enterprise",
  "status": "open",
  "priority": "critical",
  "team": "platform"
}
```

Invalid input returns `400` with `{ "error": "Invalid ticket" }`.

## `GET /api/tickets/:id`

Returns a created ticket with `200`. A missing ticket returns `404` with `{ "error": "Ticket not found" }`. Invalid IDs return `400` with `{ "error": "Invalid ticket id" }`.

