import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../../src/app.js";

describe("ticket list contract", () => {
  it("preserves the dashboard response envelope", async () => {
    const response = await request(createApp()).get("/api/tickets");
    expect(Object.keys(response.body).sort()).toEqual(["items", "total"]);
    expect(Object.keys(response.body.items[0]).sort()).toEqual([
      "id", "owner", "priority", "status", "title"
    ]);
  });
});

