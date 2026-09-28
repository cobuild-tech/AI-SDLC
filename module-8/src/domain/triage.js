const allowedSeverities = new Set(["low", "medium", "high", "critical"]);
const allowedCustomerTiers = new Set(["standard", "gold", "platinum"]);
const allowedServiceImpacts = new Set(["none", "degraded", "blocked"]);

function requireEnum(name, value, allowed) {
  const normalized = typeof value === "string" ? value.trim().toLowerCase() : "";
  if (!allowed.has(normalized)) {
    throw new Error(`invalid ${name}`);
  }
  return normalized;
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

  const isPlatinumBlocked =
    customerTier === "platinum" && serviceImpact === "blocked";

  if (severity === "critical") {
    return {
      severity,
      customerTier,
      serviceImpact,
      priority: "P1",
      queue: "incident-response",
      decisionReasons: [
        "critical-severity",
        ...(isPlatinumBlocked ? ["platinum-blocked-service"] : []),
      ],
    };
  }

  if (isPlatinumBlocked) {
    return {
      severity,
      customerTier,
      serviceImpact,
      priority: "P1",
      queue: "rapid-response",
      decisionReasons: ["platinum-blocked-service"],
    };
  }

  if (severity === "high") {
    return {
      severity,
      customerTier,
      serviceImpact,
      priority: "P2",
      queue: "specialist-support",
      decisionReasons: ["high-severity"],
    };
  }

  return {
    severity,
    customerTier,
    serviceImpact,
    priority: "P3",
    queue: "general-support",
    decisionReasons: ["standard-routing"],
  };
}
