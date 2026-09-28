import tickets from "../data/tickets.json" with { type: "json" };

export function listTickets() {
  return [...tickets];
}
