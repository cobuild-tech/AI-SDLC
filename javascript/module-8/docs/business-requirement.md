# Business requirement

The internal Support Operations team uses this API to create and route customer support tickets. The service must assign a priority and queue immediately so that urgent incidents enter the correct response workflow.

The organization is adding a premium response commitment for platinum customers. A platinum customer whose service is blocked must receive rapid response even when the submitted severity is not `critical`.

The change must preserve existing behavior for other customers and remain safe for deployment into the current service.

## Stakeholders

- Support Operations owns the triage policy.
- Platform Engineering owns the service.
- Security approves changes to audit data.
- Service Reliability approves changes to P1 routing.

## Non-goals

- Replacing the HTTP layer or data store
- Adding a user interface
- Adding a new dependency or external service
- Redesigning all triage rules
