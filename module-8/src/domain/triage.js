const allowedSeverities = new Set(["low", "medium", "high", "critical"]);
const allowedCustomerTiers = new Set(["standard", "gold", "platinum"]);
const allowedServiceImpacts = new Set(["none", "degraded", "blocked"]);

function requireEnum(name, value, allowed) {
  if (typeof value !== "string" || !allowed.has(value)) {
    throw new Error(`invalid ${name}`);
  }
  return value;
}

export function triageTicket(input) {
  const severity = requireEnum("severity", input.severity, allowedSeverities);
  const customerTier = requireEnum(
    "customerTier",
    input.customerTier,
    allowedCustomerTiers,
  );
  const serviceImpact = requireEnum(
    "serviceImpact",
    input.serviceImpact,
    allowedServiceImpacts,
  );

  if (severity === "critical") {
    return {
      severity,
      customerTier,
      serviceImpact,
      priority: "P1",
      queue: "incident-response",
    };
  }

  if (severity === "high") {
    return {
      severity,
      customerTier,
      serviceImpact,
      priority: "P2",
      queue: "specialist-support",
    };
  }

  return {
    severity,
    customerTier,
    serviceImpact,
    priority: "P3",
    queue: "general-support",
  };
}
