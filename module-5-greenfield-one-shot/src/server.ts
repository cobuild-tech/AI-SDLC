import express from "express";

const app = express();
const tickets: any[] = [];
app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.post("/api/tickets", (req, res) => {
  const text = `${req.body.title} ${req.body.description}`.toLowerCase();
  let priority = "normal";
  let team = "support";
  if (text.includes("down")) {
    priority = "critical";
    team = "platform";
  }
  if (req.body.customerTier === "enterprise") {
    priority = "high";
    team = "customer-success";
  }
  if (text.includes("billing")) {
    priority = "medium";
    team = "billing";
  }
  const ticket = { id: Date.now(), ...req.body, status: "open", priority, team };
  tickets.push(ticket);
  res.status(201).json(ticket);
});

app.get("/api/tickets/:id", (req, res) => {
  res.json(tickets.find((ticket) => ticket.id == req.params.id));
});

app.listen(3000, () => console.log("Ticket API running on port 3000"));

