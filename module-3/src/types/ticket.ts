export type TicketStatus = "open" | "in_progress" | "closed";

export interface Ticket {
  id: number;
  title: string;
  status: TicketStatus;
}
