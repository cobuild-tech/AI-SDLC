export type TicketPriority = "normal" | "medium" | "high" | "critical";

export interface Ticket {
  id: number;
  title: string;
  priority: TicketPriority;
  owner: string | null;
  status: "open" | "in_progress" | "closed";
}

export interface TicketFilters {
  priority?: TicketPriority;
  unassigned?: boolean;
}

export interface TicketList {
  items: Ticket[];
  total: number;
}
