import { Router } from "express";
import { listTickets } from "../services/ticketQueryService.js";
import type { TicketPriority } from "../types/ticket.js";

const supportedPriorities = new Set(["normal", "medium", "high", "critical"]);

export const ticketsRouter = Router();

ticketsRouter.get("/", (request, response) => {
  const priority = request.query.priority;

  if (priority !== undefined && (typeof priority !== "string" || !supportedPriorities.has(priority))) {
    return response.status(400).json({
      error: {
        code: "INVALID_PRIORITY",
        message: "priority must be normal, medium, high, or critical",
      },
    });
  }

  return response.json(listTickets({ priority: priority as TicketPriority | undefined }));
});

