import { tickets } from "../data/tickets.js";
import type { Ticket, TicketStatus } from "../types/ticket.js";

export function listTickets(): Ticket[] {
  return tickets;
}

export type UpdateTicketStatusResult =
  | { ok: true; ticket: Ticket }
  | { ok: false; reason: "not_found" | "invalid_transition" };

const allowedTransitions: Partial<Record<TicketStatus, TicketStatus>> = {
  open: "in_progress",
  in_progress: "closed"
};

export function updateTicketStatus(
  id: number,
  nextStatus: TicketStatus
): UpdateTicketStatusResult {
  const ticket = tickets.find((candidate) => candidate.id === id);

  if (!ticket) {
    return { ok: false, reason: "not_found" };
  }

  if (allowedTransitions[ticket.status] !== nextStatus) {
    return { ok: false, reason: "invalid_transition" };
  }

  ticket.status = nextStatus;
  return { ok: true, ticket };
}
