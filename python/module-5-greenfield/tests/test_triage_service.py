from src.models.ticket import TicketInput
from src.services.triage_service import TriageResult, triage_ticket


def test_gives_an_outage_precedence_over_enterprise_routing() -> None:
    assert triage_ticket(
        TicketInput(
            title="PRODUCTION unavailable",
            description="All users are blocked",
            customerTier="enterprise",
        )
    ) == TriageResult(priority="critical", team="platform")


def test_matches_billing_keywords_as_whole_words() -> None:
    assert triage_ticket(
        TicketInput(
            title="Invoice question",
            description="Please explain this charge",
            customerTier="standard",
        )
    ) == TriageResult(priority="medium", team="billing")

    assert triage_ticket(
        TicketInput(
            title="New billington office",
            description="Address update",
            customerTier="standard",
        )
    ) == TriageResult(priority="normal", team="support")
