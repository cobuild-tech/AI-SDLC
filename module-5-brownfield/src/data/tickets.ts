import type { Ticket } from "../types/ticket.js";

export const tickets: Ticket[] = [
  { id: 101, title: "Checkout unavailable", priority: "critical", owner: "anita", status: "in_progress" },
  { id: 102, title: "Enterprise SSO setup", priority: "high", owner: null, status: "open" },
  { id: 103, title: "Invoice correction", priority: "medium", owner: "ravi", status: "open" },
  { id: 104, title: "Update notification email", priority: "normal", owner: null, status: "open" },
  { id: 105, title: "Export timing out", priority: "high", owner: "mei", status: "in_progress" }
];

