import type { TicketRepository } from "../repositories/ticketRepository.js";
import type { Ticket, TicketInput } from "../types/ticket.js";
import { triageTicket } from "./triageService.js";

export class TicketService {
  constructor(private readonly repository: TicketRepository) {}

  create(input: TicketInput): Ticket {
    const triage = triageTicket(input);
    return this.repository.save({
      id: this.repository.nextId(),
      ...input,
      status: "open",
      ...triage,
    });
  }

  getById(id: number): Ticket | undefined {
    return this.repository.findById(id);
  }
}

