import assert from "node:assert/strict";
import test from "node:test";
import { exportTickets } from "../src/exportTickets.js";

test("exports tickets", async () => {
  const result = await exportTickets({
    user: { id: "user-12", roles: ["viewer"] },
    body: { includeInternal: true },
  });

  assert.ok(result);
});

