# Architecture constraints

- Runtime: Node.js 20 or newer.
- Runtime dependencies: none. Use Node.js built-in modules only.
- Triage policy belongs in `src/domain/triage.js`.
- HTTP parsing, routing and response handling belong in `src/app.js`.
- Persistence must continue to use the store interface in `src/domain/store.js`.
- Public routes and response status codes must remain compatible.
- Avoid broad refactoring; the expected change should fit within the existing module boundaries.
- Any new reason code must be stable and machine-readable.
