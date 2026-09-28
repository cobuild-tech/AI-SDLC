import { triageTicket } from "./domain/triage.js";
import { isAuthorized } from "./security/auth.js";

const MAX_BODY_BYTES = 32 * 1024;

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, { "content-type": "application/json" });
  response.end(JSON.stringify(body));
}

async function readJsonBody(request) {
  const chunks = [];
  let size = 0;

  for await (const chunk of request) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) {
      const error = new Error("payload too large");
      error.statusCode = 413;
      throw error;
    }
    chunks.push(chunk);
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    const error = new Error("invalid JSON");
    error.statusCode = 400;
    throw error;
  }
}

function validateDetails(input) {
  if (typeof input.summary !== "string" || input.summary.trim().length < 5) {
    throw new Error("invalid summary");
  }
  if (
    typeof input.requesterEmail !== "string" ||
    !input.requesterEmail.includes("@")
  ) {
    throw new Error("invalid requesterEmail");
  }
}

export function createApp({ apiKey, store, auditSink }) {
  if (!store) throw new Error("store is required");
  if (!auditSink?.write) throw new Error("auditSink.write is required");

  return async function app(request, response) {
    try {
      const url = new URL(request.url, "http://localhost");

      if (request.method === "GET" && url.pathname === "/health") {
        return sendJson(response, 200, { status: "ok" });
      }

      if (!isAuthorized(request, apiKey)) {
        return sendJson(response, 401, { error: "unauthorized" });
      }

      if (request.method === "POST" && url.pathname === "/tickets") {
        const input = await readJsonBody(request);
        validateDetails(input);
        const triage = triageTicket(input);
        const ticket = store.create({
          ...triage,
          summary: input.summary.trim(),
          requesterEmail: input.requesterEmail.trim(),
        });

        // Existing audit behavior predates the current data-classification policy.
        auditSink.write({ action: "ticket.created", ticket });
        return sendJson(response, 201, ticket);
      }

      const ticketMatch = url.pathname.match(/^\/tickets\/(T-\d+)$/);
      if (request.method === "GET" && ticketMatch) {
        const ticket = store.getById(ticketMatch[1]);
        return ticket
          ? sendJson(response, 200, ticket)
          : sendJson(response, 404, { error: "not found" });
      }

      return sendJson(response, 404, { error: "not found" });
    } catch (error) {
      const statusCode = error.statusCode ?? 400;
      return sendJson(response, statusCode, { error: error.message });
    }
  };
}
