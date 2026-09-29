import assert from "node:assert/strict";
import test from "node:test";
import { addTicketComment } from "../src/ticketComments.js";

test("adds a comment to a known ticket", () => {
  const store = new Map();
  const result = addTicketComment(1, "Needs a screenshot", store);
  assert.deepEqual(result, {
    status: 200,
    body: { ticketId: 1, comments: ["Needs a screenshot"] },
  });
});

test("keeps a second comment on the same ticket", () => {
  const store = new Map();
  addTicketComment(1, "Needs a screenshot", store);
  const result = addTicketComment(1, "Still blocked", store);
  assert.deepEqual(result.body.comments, ["Needs a screenshot", "Still blocked"]);
});

test("rejects an unknown ticket", () => {
  const result = addTicketComment(99, "Hello", new Map());
  assert.deepEqual(result, {
    status: 400,
    body: { error: { code: "UNKNOWN_TICKET", message: "ticket was not found" } },
  });
});

test("rejects a blank comment", () => {
  const result = addTicketComment(1, "   ", new Map());
  assert.deepEqual(result, {
    status: 400,
    body: { error: { code: "EMPTY_COMMENT", message: "comment is required" } },
  });
});

test("keeps comments for each ticket separate", () => {
  const store = new Map();
  addTicketComment(1, "Needs a screenshot", store);
  const result = addTicketComment(2, "Check the logs", store);
  assert.deepEqual(result.body.comments, ["Check the logs"]);
});
