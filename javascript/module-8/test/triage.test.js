import test from "node:test";
import assert from "node:assert/strict";
import { triageTicket } from "../src/domain/triage.js";

test("critical tickets route to incident response", () => {
  const result = triageTicket({
    severity: "critical",
    customerTier: "standard",
    serviceImpact: "degraded",
  });

  assert.equal(result.priority, "P1");
  assert.equal(result.queue, "incident-response");
});

test("high-severity tickets route to specialist support", () => {
  const result = triageTicket({
    severity: "high",
    customerTier: "gold",
    serviceImpact: "degraded",
  });

  assert.equal(result.priority, "P2");
  assert.equal(result.queue, "specialist-support");
});

test("unsupported severity is rejected", () => {
  assert.throws(
    () =>
      triageTicket({
        severity: "urgent",
        customerTier: "standard",
        serviceImpact: "none",
      }),
    /invalid severity/,
  );
});
