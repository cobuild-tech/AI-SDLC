# Project memory

Durable facts that should be recovered in future agent sessions:

- Ticket status values are defined by `TicketStatus` in `src/types/ticket.ts`.
- Status transitions are forward-only and governed by ADR-001.
- API error bodies use `{ "error": "..." }`.
- Routes validate transport input; services own workflow rules.
- The repository has no database, authentication or audit subsystem.

This file contains team-reviewed project knowledge. Session observations and speculative ideas do not belong here.
