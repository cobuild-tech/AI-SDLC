import { Router } from "express";
import type { TicketService } from "../services/ticketService.js";
import type { CustomerTier, TicketInput } from "../types/ticket.js";

const allowedKeys = new Set(["title", "description", "customerTier"]);

function parseTicketInput(value: unknown): TicketInput | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
  const body = value as Record<string, unknown>;
  if (Object.keys(body).some((key) => !allowedKeys.has(key))) return undefined;

  const title = typeof body.title === "string" ? body.title.trim() : "";
  const description = typeof body.description === "string" ? body.description.trim() : "";
  const customerTier = body.customerTier;
  const validTier = customerTier === "standard" || customerTier === "enterprise";

  if (!title || title.length > 120 || !description || description.length > 2000 || !validTier) {
    return undefined;
  }

  return { title, description, customerTier: customerTier as CustomerTier };
}

export function createTicketsRouter(service: TicketService): Router {
  const router = Router();

  router.post("/", (request, response) => {
    const input = parseTicketInput(request.body);
    if (!input) return response.status(400).json({ error: "Invalid ticket" });
    return response.status(201).json(service.create(input));
  });

  router.get("/:id", (request, response) => {
    const id = Number(request.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return response.status(400).json({ error: "Invalid ticket id" });
    }
    const ticket = service.getById(id);
    if (!ticket) return response.status(404).json({ error: "Ticket not found" });
    return response.json(ticket);
  });

  return router;
}

