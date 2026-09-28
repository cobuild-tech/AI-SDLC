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

describe("unknown routes", () => {
  it("returns a JSON 404 response", async () => {
    const response = await request(createApp()).get("/missing");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Not found" });
  });
});
