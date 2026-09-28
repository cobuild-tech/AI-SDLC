import { Router } from "express";
import { listTickets } from "../services/ticketQueryService.js";
import type { TicketPriority } from "../types/ticket.js";

const supportedPriorities = new Set(["normal", "medium", "high", "critical"]);

export const ticketsRouter = Router();

ticketsRouter.get("/", (request, response) => {
  const priority = request.query.priority;
  const unassigned = request.query.unassigned;

  if (priority !== undefined && typeof priority !== "string") {
    return response.status(400).json({
      error: {
        code: "INVALID_PRIORITY",
        message: "priority must be normal, medium, high, or critical",
      },
    });
  }

  const normalizedPriority = priority?.toLowerCase();
  if (normalizedPriority !== undefined && !supportedPriorities.has(normalizedPriority)) {
    return response.status(400).json({
      error: {
        code: "INVALID_PRIORITY",
        message: "priority must be normal, medium, high, or critical",
      },
    });
  }

  if (unassigned !== undefined && unassigned !== "true" && unassigned !== "false") {
    return response.status(400).json({
      error: {
        code: "INVALID_UNASSIGNED",
        message: "unassigned must be true or false",
      },
    });
  }

  return response.json(listTickets({
    priority: normalizedPriority as TicketPriority | undefined,
    unassigned: unassigned === undefined ? undefined : unassigned === "true",
  }));
});
