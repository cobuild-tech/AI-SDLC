import assert from "node:assert/strict";
import test from "node:test";
import { exportTickets } from "../src/exportTickets.js";

test("rejects users without the manager role", async () => {
  const result = await exportTickets({
    user: { id: "user-12", roles: ["viewer"] },
  });
  assert.deepEqual(result, {
    status: 403,
    body: { error: { code: "FORBIDDEN", message: "manager role required" } },
  });
});

test("exports only approved fields for managers", async () => {
  const logs = [];
  const logger = {
    info: (message, metadata) => logs.push({ message, metadata }),
    error: () => assert.fail("unexpected error log"),
  };
  const result = await exportTickets(
    { user: { id: "manager-7", roles: ["manager"] } },
    async (items) => items,
    logger,
  );
  assert.equal(result.status, 200);
  assert.deepEqual(Object.keys(result.body.items[0]).sort(), ["id", "priority", "status", "title"]);
  assert.deepEqual(logs, [{ message: "ticket export completed", metadata: { actorId: "manager-7", itemCount: 2 } }]);
});

test("returns a standard failure without exposing the exception", async () => {
  const logger = { info: () => {}, error: () => {} };
  const result = await exportTickets(
    { user: { id: "manager-7", roles: ["manager"] } },
    async () => { throw new Error("synthetic exporter failure"); },
    logger,
  );
  assert.deepEqual(result, {
    status: 500,
    body: { error: { code: "EXPORT_FAILED", message: "ticket export failed" } },
  });
});
