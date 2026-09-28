import { tickets } from "../data/tickets.js";
import type { Ticket } from "../types/ticket.js";

export function listTickets(): Ticket[] {
  return tickets;
}
