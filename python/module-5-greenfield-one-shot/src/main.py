import time

import uvicorn
from fastapi import FastAPI

app = FastAPI()
tickets: list = []


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/api/tickets", status_code=201)
def create_ticket(body: dict):
    text = f"{body.get('title')} {body.get('description')}".lower()
    priority = "normal"
    team = "support"
    if "down" in text:
        priority = "critical"
        team = "platform"
    if body.get("customerTier") == "enterprise":
        priority = "high"
        team = "customer-success"
    if "billing" in text:
        priority = "medium"
        team = "billing"
    ticket = {"id": int(time.time() * 1000), **body, "status": "open", "priority": priority, "team": team}
    tickets.append(ticket)
    return ticket


@app.get("/api/tickets/{id}")
def get_ticket(id):
    return next((ticket for ticket in tickets if str(ticket["id"]) == id), None)


if __name__ == "__main__":
    uvicorn.run(app, port=3000)
