import express from "express";
import { InMemoryTicketRepository } from "./repositories/ticketRepository.js";
import { createTicketsRouter } from "./routes/tickets.js";
import { TicketService } from "./services/ticketService.js";

export function createApp() {
  const app = express();
  const service = new TicketService(new InMemoryTicketRepository());

  app.use(express.json());
  app.get("/health", (_request, response) => response.json({ status: "ok" }));
  app.use("/api/tickets", createTicketsRouter(service));
  app.use((_request, response) => response.status(404).json({ error: "Not found" }));
  return app;
}

