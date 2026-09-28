import { tickets } from "../data/tickets.js";
import type { Ticket, TicketStatus } from "../types/ticket.js";

export function listTickets(status?: TicketStatus): Ticket[] {
  if (status === undefined) {
    return tickets;
  }

  return tickets.filter((ticket) => ticket.status === status);
}
