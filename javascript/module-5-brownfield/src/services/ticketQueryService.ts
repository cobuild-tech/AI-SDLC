import { tickets } from "../data/tickets.js";
import type { TicketFilters, TicketList } from "../types/ticket.js";

export function listTickets(filters: TicketFilters = {}): TicketList {
  const items = tickets.filter((ticket) => {
    if (filters.priority && ticket.priority !== filters.priority) return false;
    if (filters.unassigned === true && ticket.owner !== null) return false;
    if (filters.unassigned === false && ticket.owner === null) return false;
    return true;
  });

  return { items, total: items.length };
}
