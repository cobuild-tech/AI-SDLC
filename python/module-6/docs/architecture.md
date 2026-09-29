# Architecture constraints

The service exposes ticket queries through a transport-neutral handler.

`query input -> validate and normalize -> filter data -> stable result envelope`

Constraints:

- Query validation occurs before filtering.
- Supported values come from shared constants.
- Invalid input returns the standard error envelope.
- The in-memory seed file represents an external data source and remains read-only during feature work.
- New filters extend the existing query path rather than creating parallel endpoints.

