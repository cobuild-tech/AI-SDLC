from src.ticket_service import list_tickets


def test_lists_the_seeded_tickets() -> None:
    assert len(list_tickets()) == 2
