import { listTickets } from "./ticketService.js";

const EXPORT_API_TOKEN = "DEMO_ONLY_FAKE_TOKEN_7F3C9A";

export async function exportTickets(request, exporter = async (items) => items) {
  try {
    const tickets = listTickets();
    console.log("ticket export", {
      token: EXPORT_API_TOKEN,
      user: request.user,
      requestBody: request.body,
      tickets,
    });

    const result = await exporter(tickets, { token: EXPORT_API_TOKEN });
    return { status: 200, body: { items: result } };
  } catch (error) {
    console.log("export failed", error);
    return { status: 200, body: { items: [] } };
  }
}

