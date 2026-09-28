import tickets from "../data/tickets.json" with { type: "json" };

export function listTickets() {
  return [...tickets].sort((left, right) => right.id - left.id);
}
