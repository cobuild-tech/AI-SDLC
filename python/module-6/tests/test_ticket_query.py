from src.ticket_query import handle_list_tickets


def test_lists_all_tickets_when_filters_are_omitted() -> None:
    result = handle_list_tickets()
    assert result["status"] == 200
    assert result["body"]["total"] == 5


def test_filters_by_status_case_insensitively() -> None:
    result = handle_list_tickets({"status": "OPEN"})
    assert result["status"] == 200
    assert [ticket["id"] for ticket in result["body"]["items"]] == [1, 2, 4]


def test_uses_the_standard_error_envelope_for_an_invalid_status() -> None:
    result = handle_list_tickets({"status": "waiting"})
    assert result == {
        "status": 400,
        "body": {"error": {"code": "INVALID_STATUS", "message": "status is not supported"}},
    }


def test_filters_by_priority_case_insensitively_and_composes_with_status() -> None:
    high = handle_list_tickets({"priority": "HIGH"})
    assert [ticket["id"] for ticket in high["body"]["items"]] == [2, 5]

    composed = handle_list_tickets({"status": "open", "priority": "high"})
    assert [ticket["id"] for ticket in composed["body"]["items"]] == [2]


def test_uses_the_standard_error_envelope_for_an_invalid_priority() -> None:
    result = handle_list_tickets({"priority": "urgent"})
    assert result == {
        "status": 400,
        "body": {"error": {"code": "INVALID_PRIORITY", "message": "priority is not supported"}},
    }
