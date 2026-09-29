# Architecture constraints

- Runtime: Python 3.11 or newer.
- Runtime dependencies: FastAPI and Uvicorn only, as listed in `requirements.txt`. Everything else comes from the Python standard library.
- Triage policy belongs in `src/domain/triage.py`.
- HTTP parsing, routing and response handling belong in `src/app.py`.
- Persistence must continue to use the store interface in `src/domain/store.py`.
- Public routes and response status codes must remain compatible.
- Avoid broad refactoring; the expected change should fit within the existing module boundaries.
- Any new reason code must be stable and machine-readable.
