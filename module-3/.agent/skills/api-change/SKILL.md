# API change skill

Use this procedure for a change to an HTTP endpoint.

## 1. Establish the contract

Read the active task, repository instructions, accepted decisions and current API documentation. Report conflicts and the precedence rule used.

## 2. Map the change surface

Identify the route, service, domain types, data owner, tests and documentation that are relevant. Do not edit yet.

## 3. Design acceptance tests

List success, boundary and failure cases. Tie every case to a stated acceptance criterion.

## 4. Implement the smallest coherent change

Keep validation at the route boundary and domain behavior in the service. Avoid unrelated cleanup.

## 5. Verify progressively

Run the focused API tests first, then lint and the full test suite. Inspect the final diff.

## 6. Return an evidence packet

Report the result, files changed, checks run, assumptions, unresolved risks and any decision that still needs human approval.
