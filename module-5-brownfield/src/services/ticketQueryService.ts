import { tickets } from "../data/tickets.js";
import type { TicketFilters, TicketList } from "../types/ticket.js";

export function listTickets(filters: TicketFilters = {}): TicketList {
  const items = tickets.filter((ticket) => {
    if (filters.priority && ticket.priority !== filters.priority) return false;
    return true;
  });

  return { items, total: items.length };
}

