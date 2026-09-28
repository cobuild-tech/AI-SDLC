import { Router } from "express";
import { listTickets, updateTicketStatus } from "../services/ticketService.js";
import { isTicketStatus } from "../types/ticket.js";

export const ticketsRouter = Router();

ticketsRouter.get("/", (_request, response) => {
  response.json({ tickets: listTickets() });
});

ticketsRouter.patch("/:id/status", (request, response) => {
  const id = Number(request.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    response.status(400).json({ error: "Invalid ticket id" });
    return;
  }

  const status = request.body?.status;

  if (!isTicketStatus(status)) {
    response.status(400).json({ error: "Invalid status" });
    return;
  }

  const result = updateTicketStatus(id, status);

  if (!result.ok && result.reason === "not_found") {
    response.status(404).json({ error: "Ticket not found" });
    return;
  }

  if (!result.ok) {
    response.status(400).json({ error: "Invalid status transition" });
    return;
  }

  response.json({ ticket: result.ticket });
});
