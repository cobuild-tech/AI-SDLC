import { Router } from "express";
import { listTickets } from "../services/ticketService.js";
import { isTicketStatus } from "../types/ticket.js";

export const ticketsRouter = Router();

ticketsRouter.get("/", (request, response) => {
  const { status } = request.query;

  if (status !== undefined && !isTicketStatus(status)) {
    response.status(400).json({
      error: "status must be one of: open, in_progress, closed"
    });
    return;
  }

  response.json({ tickets: listTickets(status) });
});
