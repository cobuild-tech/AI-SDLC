import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../../src/app.js";

describe("GET /api/tickets", () => {
  it("returns all tickets when no filter is supplied", async () => {
    const response = await request(createApp()).get("/api/tickets");
    expect(response.status).toBe(200);
    expect(response.body.total).toBe(5);
    expect(response.body.items).toHaveLength(5);
  });

  it("filters by a lower-case priority", async () => {
    const response = await request(createApp()).get("/api/tickets?priority=high");
    expect(response.status).toBe(200);
    expect(response.body.total).toBe(2);
    expect(response.body.items.map((ticket: { id: number }) => ticket.id)).toEqual([102, 105]);
  });

  it("rejects an unsupported priority", async () => {
    const response = await request(createApp()).get("/api/tickets?priority=urgent");
    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("INVALID_PRIORITY");
  });
});

