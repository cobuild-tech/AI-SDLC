import { Router } from "express";
import { listTickets } from "../services/ticketService.js";

export const ticketsRouter = Router();

ticketsRouter.get("/", (_request, response) => {
  response.json({ tickets: listTickets() });
});
