import type { TicketInput, TicketPriority, TicketTeam } from "../types/ticket.js";

export interface TriageResult {
  priority: TicketPriority;
  team: TicketTeam;
}

function containsWholeWord(text: string, keywords: string[]): boolean {
  return keywords.some((keyword) => new RegExp(`\\b${keyword}\\b`, "i").test(text));
}

export function triageTicket(input: TicketInput): TriageResult {
  const text = `${input.title} ${input.description}`;

  if (containsWholeWord(text, ["outage", "down", "unavailable"])) {
    return { priority: "critical", team: "platform" };
  }
  if (input.customerTier === "enterprise") {
    return { priority: "high", team: "customer-success" };
  }
  if (containsWholeWord(text, ["invoice", "billing", "payment"])) {
    return { priority: "medium", team: "billing" };
  }
  return { priority: "normal", team: "support" };
}

