import tickets from "../data/seed-tickets.json" with { type: "json" };

const commentsByTicket = new Map();

function invalidComment(code, message) {
  return { status: 400, body: { error: { code, message } } };
}

export function addTicketComment(ticketId, message, store = commentsByTicket) {
  const text = typeof message === "string" ? message.trim() : "";
  if (!text) {
    return invalidComment("EMPTY_COMMENT", "comment is required");
  }

  const id = Number(ticketId);
  if (!tickets.some((ticket) => ticket.id === id)) {
    return invalidComment("UNKNOWN_TICKET", "ticket was not found");
  }

  const comments = [...(store.get(id) ?? []), text];
  store.set(id, comments);
  return { status: 200, body: { ticketId: id, comments } };
}
