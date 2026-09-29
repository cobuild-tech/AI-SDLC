# Architecture

The first release is deliberately a small layered service.

`HTTP request -> route validation -> ticket service -> repository -> response`

- `src/routes` owns HTTP concerns.
- `src/services` owns deterministic domain behavior.
- `src/repositories` owns storage access.
- `src/models` owns reusable domain contracts.

The `TicketRepository` interface is the seam for a future persistence decision. No database abstraction, dependency injection container, or generic rule engine is needed for the current scope.

