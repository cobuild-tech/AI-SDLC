import assert from "node:assert/strict";
import test from "node:test";
import { handleListTickets } from "../src/ticketQuery.js";

test("lists all tickets when filters are omitted", () => {
  const result = handleListTickets();
  assert.equal(result.status, 200);
  assert.equal(result.body.total, 5);
});

test("filters by status case-insensitively", () => {
  const result = handleListTickets({ status: "OPEN" });
  assert.equal(result.status, 200);
  assert.deepEqual(result.body.items.map((ticket) => ticket.id), [1, 2, 4]);
});

test("uses the standard error envelope for an invalid status", () => {
  const result = handleListTickets({ status: "waiting" });
  assert.deepEqual(result, {
    status: 400,
    body: { error: { code: "INVALID_STATUS", message: "status is not supported" } },
  });
});

test("filters by priority case-insensitively and composes with status", () => {
  const high = handleListTickets({ priority: "HIGH" });
  assert.deepEqual(high.body.items.map((ticket) => ticket.id), [2, 5]);

  const composed = handleListTickets({ status: "open", priority: "high" });
  assert.deepEqual(composed.body.items.map((ticket) => ticket.id), [2]);
});
