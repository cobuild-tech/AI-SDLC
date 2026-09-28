import tickets from "../data/seed-tickets.json" with { type: "json" };

export const VALID_STATUSES = ["open", "in_progress", "closed"];
export const VALID_PRIORITIES = ["normal", "medium", "high", "critical"];

function invalidQuery(code, message) {
  return { status: 400, body: { error: { code, message } } };
}

export function handleListTickets(query = {}) {
  const status = query.status?.toLowerCase();
  if (status && !VALID_STATUSES.includes(status)) {
    return invalidQuery("INVALID_STATUS", "status is not supported");
  }

  const priority = query.priority?.toLowerCase();
  if (priority && !VALID_PRIORITIES.includes(priority)) {
    return invalidQuery("INVALID_PRIORITY", "priority is not supported");
  }

  const items = tickets.filter((ticket) => {
    if (status && ticket.status !== status) return false;
    if (priority && ticket.priority !== priority) return false;
    return true;
  });
  return { status: 200, body: { items, total: items.length } };
}
