# Spec B — structured

## Goal

Let a requester reopen a ticket whose fix didn't hold, without raising a new ticket.

## Function

`reopenTicket(id: number, reason: string, now: Date = new Date()): Ticket` in `src/ticketService.ts`.

## Rules

1. Only a `resolved` ticket can be reopened. `open`, `in_progress` and `closed` tickets throw.
2. It must be within 7 days of `resolvedAt`. Later than that throws. The requester should raise a new ticket instead.
3. `reason` is required (not empty or whitespace).
4. On success: `status` becomes `open`, `resolution` and `resolvedAt` are cleared, and the reason is appended to `description` as `\n\n[Reopened] <reason>`.
5. `assignedTeam` and `priority` are unchanged.

## Acceptance

- Reopening ticket 6 (resolved) with a reason works.
- Reopening ticket 9 (closed) throws.
- Reopening a ticket 8 days after it was resolved throws.
