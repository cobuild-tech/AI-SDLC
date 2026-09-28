import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { once } from "node:events";
import { triageTicket } from "../src/domain/triage.js";
import { createApp } from "../src/app.js";
import { createInMemoryTicketStore } from "../src/domain/store.js";

test("normalizes critical severity and routes it to incident response", () => {
  const result = triageTicket({
    severity: " Critical ",
    customerTier: " Standard ",
    serviceImpact: " DEGRADED ",
  });

  assert.equal(result.severity, "critical");
  assert.equal(result.priority, "P1");
  assert.equal(result.queue, "incident-response");
  assert.deepEqual(result.decisionReasons, ["critical-severity"]);
});

test("routes platinum blocked service to rapid response", () => {
  const result = triageTicket({
    severity: "medium",
    customerTier: "platinum",
    serviceImpact: "blocked",
  });

  assert.equal(result.priority, "P1");
  assert.equal(result.queue, "rapid-response");
  assert.deepEqual(result.decisionReasons, ["platinum-blocked-service"]);
});

test("critical routing wins while preserving both applicable reasons", () => {
  const result = triageTicket({
    severity: "critical",
    customerTier: "platinum",
    serviceImpact: "blocked",
  });

  assert.equal(result.queue, "incident-response");
  assert.deepEqual(result.decisionReasons, [
    "critical-severity",
    "platinum-blocked-service",
  ]);
});

test("audit event uses the approved allowlist and excludes personal data", async () => {
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
    const response = await fetch(`http://127.0.0.1:${port}/tickets`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": "test-key",
      },
      body: JSON.stringify({
        severity: "medium",
        customerTier: "platinum",
        serviceImpact: "blocked",
        summary: "Sensitive customer incident details",
        requesterEmail: "private@example.test",
      }),
    });

    assert.equal(response.status, 201);
    assert.equal(events.length, 1);
    assert.deepEqual(Object.keys(events[0]).sort(), [
      "action",
      "priority",
      "queue",
      "reasonCodes",
      "ticketId",
    ]);
    const serialized = JSON.stringify(events[0]);
    assert.doesNotMatch(serialized, /private@example\.test/);
    assert.doesNotMatch(serialized, /Sensitive customer incident details/);
  } finally {
    server.close();
    await once(server, "close");
  }
});
