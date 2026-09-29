# Product requirement: internal support-ticket triage API

## Problem

The internal support desk receives tickets through several channels. Agents spend time deciding which team should receive each ticket and how urgently it should be handled.

## Outcome

Build a small HTTP API that accepts a support ticket, applies transparent deterministic triage rules, stores it in memory, and returns the created ticket.

## Users

- Internal support tooling that creates tickets
- Support leads who need consistent initial routing
- Developers who will extend the service later

## Initial scope

- Health check
- Create and triage a ticket
- Retrieve a ticket by ID
- In-memory storage only
- JSON request and response bodies

## Triage rules

Rules are evaluated in the order listed.

1. If the title or description contains `outage`, `down`, or `unavailable`, assign `priority: critical` and `team: platform`.
2. Otherwise, if `customerTier` is `enterprise`, assign `priority: high` and `team: customer-success`.
3. Otherwise, if the title or description contains `invoice`, `billing`, or `payment`, assign `priority: medium` and `team: billing`.
4. Otherwise, assign `priority: normal` and `team: support`.

Keyword matching is case-insensitive and matches whole words. The first matching rule wins.

## Non-goals

- Authentication or authorization
- Database persistence
- Machine-learning classification
- Ticket updates, deletion, search, or pagination
- Notifications or third-party integrations
- A browser user interface

