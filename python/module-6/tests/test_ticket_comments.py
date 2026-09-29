from src.ticket_comments import add_ticket_comment


def test_adds_a_comment_to_a_known_ticket() -> None:
    result = add_ticket_comment(1, "Needs a screenshot", {})
    assert result == {
        "status": 200,
        "body": {"ticketId": 1, "comments": ["Needs a screenshot"]},
    }


def test_keeps_a_second_comment_on_the_same_ticket() -> None:
    store: dict[int, list[str]] = {}
    add_ticket_comment(1, "Needs a screenshot", store)
    result = add_ticket_comment(1, "Still blocked", store)
    assert result["body"]["comments"] == ["Needs a screenshot", "Still blocked"]


def test_rejects_an_unknown_ticket() -> None:
    result = add_ticket_comment(99, "Hello", {})
    assert result == {
        "status": 400,
        "body": {"error": {"code": "UNKNOWN_TICKET", "message": "ticket was not found"}},
    }


def test_rejects_a_blank_comment() -> None:
    result = add_ticket_comment(1, "   ", {})
    assert result == {
        "status": 400,
        "body": {"error": {"code": "EMPTY_COMMENT", "message": "comment is required"}},
    }


def test_keeps_comments_for_each_ticket_separate() -> None:
    store: dict[int, list[str]] = {}
    add_ticket_comment(1, "Needs a screenshot", store)
    result = add_ticket_comment(2, "Check the logs", store)
    assert result["body"]["comments"] == ["Check the logs"]
