import express from "express";
import { ticketsRouter } from "./routes/tickets.js";

export function createApp() {
  const app = express();

  app.use(express.json());
  app.get("/health", (_request, response) => {
    response.json({ status: "ok" });
  });
  app.use("/api/tickets", ticketsRouter);

  app.use((_request, response) => {
    response.status(404).json({ error: "Not found" });
  });

  return app;
}
