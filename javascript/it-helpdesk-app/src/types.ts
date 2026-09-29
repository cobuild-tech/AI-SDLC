export type Priority = "low" | "medium" | "high" | "urgent";
export type TicketStatus = "open" | "in_progress" | "resolved" | "closed";
export type Team = "service-desk" | "identity" | "network" | "hardware" | "security";
export type Category = "access" | "network" | "hardware" | "software" | "security";

export const PRIORITIES: Priority[] = ["low", "medium", "high", "urgent"];

// Which specialist team owns each category once a ticket leaves the service desk.
export const TEAM_FOR_CATEGORY: Record<Category, Team> = {
  access: "identity",
  network: "network",
  hardware: "hardware",
  software: "service-desk",
  security: "security",
};

export interface User {
  id: string;
  name: string;
  department: string;
  isPrivileged: boolean; // admin accounts — matters in session 9
}

export interface Ticket {
  id: number;
  requesterId: string;
  title: string;
  description: string; // free text — the thing agents work on
  priority: Priority;
  status: TicketStatus;
  assignedTeam: Team; // starts as "service-desk"
  category?: Category; // unset until session 6's triage fills it
  resolution?: string;
  duplicateOf?: number;
  createdAt: string; // ISO datetime
  resolvedAt?: string;
}

export interface NewTicketInput {
  requesterId: string;
  title: string;
  description: string;
  priority?: Priority;
}
