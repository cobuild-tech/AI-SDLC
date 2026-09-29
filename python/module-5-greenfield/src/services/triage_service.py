import re
from dataclasses import dataclass

from src.models.ticket import TicketInput, TicketPriority, TicketTeam


@dataclass(frozen=True)
class TriageResult:
    priority: TicketPriority
    team: TicketTeam


def contains_whole_word(text: str, keywords: list[str]) -> bool:
    return any(re.search(rf"\b{re.escape(keyword)}\b", text, re.IGNORECASE) for keyword in keywords)


def triage_ticket(ticket: TicketInput) -> TriageResult:
    text = f"{ticket.title} {ticket.description}"

    if contains_whole_word(text, ["outage", "down", "unavailable"]):
        return TriageResult(priority="critical", team="platform")
    if ticket.customer_tier == "enterprise":
        return TriageResult(priority="high", team="customer-success")
    if contains_whole_word(text, ["invoice", "billing", "payment"]):
        return TriageResult(priority="medium", team="billing")
    return TriageResult(priority="normal", team="support")
