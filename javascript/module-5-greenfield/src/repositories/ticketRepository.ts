import type { Ticket } from "../types/ticket.js";

export interface TicketRepository {
  nextId(): number;
  save(ticket: Ticket): Ticket;
  findById(id: number): Ticket | undefined;
}

export class InMemoryTicketRepository implements TicketRepository {
  private readonly tickets = new Map<number, Ticket>();
  private sequence = 0;

  nextId(): number {
    this.sequence += 1;
    return this.sequence;
  }

  save(ticket: Ticket): Ticket {
    this.tickets.set(ticket.id, ticket);
    return ticket;
  }

  findById(id: number): Ticket | undefined {
    return this.tickets.get(id);
  }
}

