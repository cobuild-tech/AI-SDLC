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

  it.each([
    ["open", [1, 4]],
    ["in_progress", [2]],
    ["closed", [3]]
  ])("filters tickets with status=%s", async (status, expectedIds) => {
    const response = await request(createApp())
      .get("/api/tickets")
      .query({ status });

    expect(response.status).toBe(200);
    expect(response.body.tickets.map((ticket: { id: number }) => ticket.id)).toEqual(
      expectedIds
    );
    expect(
      response.body.tickets.every(
        (ticket: { status: string }) => ticket.status === status
      )
    ).toBe(true);
  });

  it("rejects an unsupported status", async () => {
    const response = await request(createApp())
      .get("/api/tickets")
      .query({ status: "waiting" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "status must be one of: open, in_progress, closed"
    });
  });
});

describe("unknown routes", () => {
  it("returns a JSON 404 response", async () => {
    const response = await request(createApp()).get("/missing");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Not found" });
  });
});
