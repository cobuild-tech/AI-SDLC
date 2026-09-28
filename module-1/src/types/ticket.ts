export type TicketStatus = "open" | "in_progress" | "closed";

export const ticketStatuses: readonly TicketStatus[] = [
  "open",
  "in_progress",
  "closed"
];

export function isTicketStatus(value: unknown): value is TicketStatus {
  return (
    typeof value === "string" &&
    ticketStatuses.includes(value as TicketStatus)
  );
}

export interface Ticket {
  id: number;
  title: string;
  status: TicketStatus;
}
