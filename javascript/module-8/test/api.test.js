import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { once } from "node:events";
import { createApp } from "../src/app.js";
import { createInMemoryTicketStore } from "../src/domain/store.js";

async function withServer(run) {
  const events = [];
  const app = createApp({
    apiKey: "test-key",
    store: createInMemoryTicketStore(),
    auditSink: { write: (event) => events.push(event) },
  });
  const server = createServer(app);
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const { port } = server.address();

  try {
    await run({ baseUrl: `http://127.0.0.1:${port}`, events });
  } finally {
    server.close();
    await once(server, "close");
  }
}

test("ticket routes require authentication", async () => {
  await withServer(async ({ baseUrl }) => {
    const response = await fetch(`${baseUrl}/tickets/T-1001`);
    assert.equal(response.status, 401);
  });
});

test("creates and retrieves a ticket", async () => {
  await withServer(async ({ baseUrl }) => {
    const createResponse = await fetch(`${baseUrl}/tickets`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": "test-key",
      },
      body: JSON.stringify({
        severity: "high",
        customerTier: "gold",
        serviceImpact: "degraded",
        summary: "Search latency is elevated",
        requesterEmail: "sam@example.test",
      }),
    });

    assert.equal(createResponse.status, 201);
    const created = await createResponse.json();
    assert.equal(created.priority, "P2");

    const getResponse = await fetch(`${baseUrl}/tickets/${created.id}`, {
      headers: { "x-api-key": "test-key" },
    });
    assert.equal(getResponse.status, 200);
    assert.deepEqual(await getResponse.json(), created);
  });
});
