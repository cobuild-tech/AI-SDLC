import { describe, expect, it } from "vitest";
import { triageTicket } from "../src/services/triageService.js";

describe("triageTicket", () => {
  it("gives an outage precedence over enterprise routing", () => {
    expect(triageTicket({
      title: "PRODUCTION unavailable",
      description: "All users are blocked",
      customerTier: "enterprise",
    })).toEqual({ priority: "critical", team: "platform" });
  });

  it("matches billing keywords as whole words", () => {
    expect(triageTicket({
      title: "Invoice question",
      description: "Please explain this charge",
      customerTier: "standard",
    })).toEqual({ priority: "medium", team: "billing" });

    expect(triageTicket({
      title: "New billington office",
      description: "Address update",
      customerTier: "standard",
    })).toEqual({ priority: "normal", team: "support" });
  });
});

