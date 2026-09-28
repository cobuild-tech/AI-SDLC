import assert from "node:assert/strict";
import test from "node:test";
import { listTickets } from "../src/ticketService.js";

test("lists the seeded tickets", () => {
  assert.equal(listTickets().length, 2);
});

