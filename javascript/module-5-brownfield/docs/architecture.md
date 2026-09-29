# Architecture

The service is a small layered Express application.

- `src/app.ts` composes middleware and routers.
- `src/routes` parses HTTP input and maps errors.
- `src/services` applies collection filters.
- `src/data` owns the in-memory seed collection.
- `src/types` owns shared domain and filter types.
- `tests/api` covers HTTP contracts.
- `tests/contract` protects response shapes consumed by dashboards.

Routes must not filter the ticket collection directly. Services must not choose HTTP status codes.

