# Ticket service architecture

The service is deliberately small, but it keeps transport and domain behavior separate.

- `src/routes` owns HTTP parsing, validation and response codes.
- `src/services` owns ticket lookup, collection operations and workflow rules.
- `src/data` owns the in-memory store.
- `src/types` owns reusable domain types.
- `tests` verifies externally visible API behavior.

Routes must not mutate the ticket collection directly. The service layer returns enough information for the route to select an HTTP response without duplicating workflow logic.
