import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";

describe("ticket API", () => {
  it("reports health", async () => {
    const response = await request(createApp()).get("/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });

  it("creates, triages, and retrieves a ticket", async () => {
    const app = createApp();
    const created = await request(app).post("/api/tickets").send({
      title: " Production unavailable ",
      description: "Checkout is down",
      customerTier: "enterprise",
    });

    expect(created.status).toBe(201);
    expect(created.body).toEqual({
      id: 1,
      title: "Production unavailable",
      description: "Checkout is down",
      customerTier: "enterprise",
      status: "open",
      priority: "critical",
      team: "platform",
    });

    const found = await request(app).get("/api/tickets/1");
    expect(found.status).toBe(200);
    expect(found.body).toEqual(created.body);
  });

  it("rejects invalid or expanded input", async () => {
    const app = createApp();
    const missing = await request(app).post("/api/tickets").send({ title: "Only a title" });
    const expanded = await request(app).post("/api/tickets").send({
      title: "Question",
      description: "Please help",
      customerTier: "standard",
      admin: true,
    });
    expect(missing.status).toBe(400);
    expect(expanded.status).toBe(400);
    expect(expanded.body).toEqual({ error: "Invalid ticket" });
  });

  it("handles missing and invalid IDs", async () => {
    const app = createApp();
    const missing = await request(app).get("/api/tickets/99");
    const invalid = await request(app).get("/api/tickets/nope");
    expect(missing.status).toBe(404);
    expect(missing.body).toEqual({ error: "Ticket not found" });
    expect(invalid.status).toBe(400);
    expect(invalid.body).toEqual({ error: "Invalid ticket id" });
  });
});

