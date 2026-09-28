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

  it("filters priority case-insensitively", async () => {
    const response = await request(createApp()).get("/api/tickets?priority=HIGH");
    expect(response.status).toBe(200);
    expect(response.body.total).toBe(2);
    expect(response.body.items.map((ticket: { id: number }) => ticket.id)).toEqual([102, 105]);
  });

  it("rejects repeated priority values", async () => {
    const response = await request(createApp()).get("/api/tickets?priority=high&priority=normal");
    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("INVALID_PRIORITY");
  });

  it("rejects an unsupported priority", async () => {
    const response = await request(createApp()).get("/api/tickets?priority=urgent");
    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("INVALID_PRIORITY");
  });

  it("filters unassigned tickets and composes with priority", async () => {
    const unassigned = await request(createApp()).get("/api/tickets?unassigned=true");
    expect(unassigned.status).toBe(200);
    expect(unassigned.body.items.map((ticket: { id: number }) => ticket.id)).toEqual([102, 104]);

    const composed = await request(createApp()).get("/api/tickets?priority=HIGH&unassigned=true");
    expect(composed.status).toBe(200);
    expect(composed.body.total).toBe(1);
    expect(composed.body.items[0].id).toBe(102);
  });

  it("filters assigned tickets", async () => {
    const response = await request(createApp()).get("/api/tickets?unassigned=false");
    expect(response.status).toBe(200);
    expect(response.body.items.map((ticket: { id: number }) => ticket.id)).toEqual([101, 103, 105]);
  });

  it("rejects invalid or repeated unassigned values", async () => {
    for (const query of ["unassigned=yes", "unassigned=true&unassigned=false"]) {
      const response = await request(createApp()).get(`/api/tickets?${query}`);
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: {
          code: "INVALID_UNASSIGNED",
          message: "unassigned must be true or false",
        },
      });
    }
  });
});
