import { createServer } from "node:http";
import { createApp } from "./app.js";
import { createInMemoryTicketStore } from "./domain/store.js";

const apiKey = process.env.LAB_API_KEY;
if (!apiKey) {
  throw new Error("LAB_API_KEY must be set");
}

const auditSink = {
  write(event) {
    process.stdout.write(`${JSON.stringify(event)}\n`);
  },
};

const server = createServer(
  createApp({ apiKey, store: createInMemoryTicketStore(), auditSink }),
);

const port = Number(process.env.PORT ?? 3000);
server.listen(port, () => {
  process.stdout.write(`Support Ticket API listening on port ${port}\n`);
});
