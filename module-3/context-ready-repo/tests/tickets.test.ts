import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";

describe("GET /api/tickets", () => {
  it("returns all tickets", async () => {
    const response = await request(createApp()).get("/api/tickets");

    expect(response.status).toBe(200);
    expect(response.body.tickets).toHaveLength(4);
    expect(response.body.tickets.map((ticket: { id: number }) => ticket.id)).toEqual([
      1, 2, 3, 4
    ]);
  });
});

describe("PATCH /api/tickets/:id/status", () => {
  it("moves an open ticket to in progress", async () => {
    const response = await request(createApp())
      .patch("/api/tickets/1/status")
      .send({ status: "in_progress" });

    expect(response.status).toBe(200);
    expect(response.body.ticket).toMatchObject({ id: 1, status: "in_progress" });
  });

  it("moves an in-progress ticket to closed", async () => {
    const response = await request(createApp())
      .patch("/api/tickets/2/status")
      .send({ status: "closed" });

    expect(response.status).toBe(200);
    expect(response.body.ticket).toMatchObject({ id: 2, status: "closed" });
  });

  it("rejects a transition outside the workflow", async () => {
    const response = await request(createApp())
      .patch("/api/tickets/3/status")
      .send({ status: "open" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Invalid status transition" });
  });

  it("rejects an unsupported status", async () => {
    const response = await request(createApp())
      .patch("/api/tickets/4/status")
      .send({ status: "blocked" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Invalid status" });
  });

  it("returns not found for an unknown ticket", async () => {
    const response = await request(createApp())
      .patch("/api/tickets/999/status")
      .send({ status: "in_progress" });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Ticket not found" });
  });

  it.each(["0", "-1", "1.5", "not-a-number"])(
    "rejects the invalid ticket id %s",
    async (id) => {
      const response = await request(createApp())
        .patch(`/api/tickets/${id}/status`)
        .send({ status: "in_progress" });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "Invalid ticket id" });
    }
  );
});

describe("unknown routes", () => {
  it("returns a JSON 404 response", async () => {
    const response = await request(createApp()).get("/missing");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Not found" });
  });
});
