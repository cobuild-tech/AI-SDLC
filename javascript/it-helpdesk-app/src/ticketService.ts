import type { NewTicketInput, Team, Ticket, TicketStatus } from "./types.ts";
import { tickets, users } from "./data.ts";

export interface TicketFilter {
  status?: TicketStatus;
  requesterId?: string;
  assignedTeam?: Team;
}

export function getTicket(id: number): Ticket {
  const ticket = tickets.find((t) => t.id === id);
  if (!ticket) throw new Error(`Ticket ${id} not found`);
  return ticket;
}

export function createTicket(input: NewTicketInput): Ticket {
  if (!users.some((u) => u.id === input.requesterId)) {
    throw new Error(`Unknown requester ${input.requesterId}`);
  }
  if (!input.title.trim()) throw new Error("Title is required");

  const ticket: Ticket = {
    id: Math.max(0, ...tickets.map((t) => t.id)) + 1,
    requesterId: input.requesterId,
    title: input.title.trim(),
    description: input.description.trim(),
    priority: input.priority ?? "medium",
    status: "open",
    assignedTeam: "service-desk",
    createdAt: new Date().toISOString(),
  };
  tickets.push(ticket);
  return ticket;
}

export function listTickets(filter: TicketFilter = {}): Ticket[] {
  return tickets.filter(
    (t) =>
      (!filter.status || t.status === filter.status) &&
      (!filter.requesterId || t.requesterId === filter.requesterId) &&
      (!filter.assignedTeam || t.assignedTeam === filter.assignedTeam),
  );
}

export function assignTicket(id: number, team: Team): Ticket {
  const ticket = getTicket(id);
  if (ticket.status === "resolved" || ticket.status === "closed") {
    throw new Error(`Ticket ${id} is ${ticket.status} and cannot be reassigned`);
  }
  ticket.assignedTeam = team;
  ticket.status = "in_progress";
  return ticket;
}

export function resolveTicket(id: number, resolution: string): Ticket {
  const ticket = getTicket(id);
  if (ticket.status === "resolved" || ticket.status === "closed") {
    throw new Error(`Ticket ${id} is already ${ticket.status}`);
  }
  if (!resolution.trim()) throw new Error("A resolution note is required");
  ticket.status = "resolved";
  ticket.resolution = resolution.trim();
  ticket.resolvedAt = new Date().toISOString();
  return ticket;
}

export function closeTicket(id: number): Ticket {
  const ticket = getTicket(id);
  ticket.status = "closed";
  return ticket;
}
