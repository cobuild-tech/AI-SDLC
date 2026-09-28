export type CustomerTier = "standard" | "enterprise";
export type TicketPriority = "normal" | "medium" | "high" | "critical";
export type TicketTeam = "support" | "billing" | "customer-success" | "platform";

export interface TicketInput {
  title: string;
  description: string;
  customerTier: CustomerTier;
}

export interface Ticket extends TicketInput {
  id: number;
  status: "open";
  priority: TicketPriority;
  team: TicketTeam;
}

