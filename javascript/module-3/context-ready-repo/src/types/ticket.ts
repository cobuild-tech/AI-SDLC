export const ticketStatuses = ["open", "in_progress", "closed"] as const;

export type TicketStatus = (typeof ticketStatuses)[number];

export function isTicketStatus(value: unknown): value is TicketStatus {
  return typeof value === "string" && ticketStatuses.includes(value as TicketStatus);
}

export interface Ticket {
  id: number;
  title: string;
  status: TicketStatus;
}
