import { listTickets } from "./ticketService.js";
import { hasRole } from "./authorization.js";

function error(status, code, message) {
  return { status, body: { error: { code, message } } };
}

function toExportRecord(ticket) {
  return {
    id: ticket.id,
    title: ticket.title,
    status: ticket.status,
    priority: ticket.priority,
  };
}

export async function exportTickets(request, exporter = async (items) => items, logger = console) {
  if (!hasRole(request.user, "manager")) {
    return error(403, "FORBIDDEN", "manager role required");
  }

  try {
    const safeTickets = listTickets().map(toExportRecord);
    logger.info("ticket export completed", { actorId: request.user.id, itemCount: safeTickets.length });
    const result = await exporter(safeTickets);
    return { status: 200, body: { items: result } };
  } catch (error) {
    logger.error("ticket export failed", { actorId: request.user.id, errorName: error?.name ?? "Error" });
    return { status: 500, body: { error: { code: "EXPORT_FAILED", message: "ticket export failed" } } };
  }
}
