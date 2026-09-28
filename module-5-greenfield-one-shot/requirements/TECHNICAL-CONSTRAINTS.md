# Technical constraints

- Use Node.js 20+, TypeScript, Express, and Vitest.
- Use an in-memory repository behind an interface so persistence can change later.
- Keep HTTP parsing and response codes in routes.
- Keep triage rules and ticket creation in services.
- Keep shared domain types in `src/types`.
- Return JSON errors in the form `{ "error": "..." }`.
- Do not add dependencies beyond those already approved in the reference stack.
- Do not add authentication, a database, queues, containers, deployment configuration, or a UI.


## Quality gates

Before declaring a stage complete, report the exact result of `npm test`, `npm run lint`, and `npm run build`. Review the diff for changes outside the approved stage, new dependencies, unrequested architecture, duplicated domain types, unhandled validation paths, and documentation that claims unimplemented behavior.
