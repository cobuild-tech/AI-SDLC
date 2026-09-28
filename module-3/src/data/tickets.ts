import type { Ticket } from "../types/ticket.js";

export const tickets: Ticket[] = [
  { id: 1, title: "Cannot sign in", status: "open" },
  { id: 2, title: "Invoice total is incorrect", status: "in_progress" },
  { id: 3, title: "Export completed", status: "closed" },
  { id: 4, title: "Reset password email missing", status: "open" }
];
