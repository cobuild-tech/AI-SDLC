from fastapi.testclient import TestClient

from src.app import create_app


def test_returns_all_tickets_when_no_filter_is_supplied() -> None:
    response = TestClient(create_app()).get("/api/tickets")
    assert response.status_code == 200
    assert response.json()["total"] == 5
    assert len(response.json()["items"]) == 5


def test_filters_by_a_lower_case_priority() -> None:
    response = TestClient(create_app()).get("/api/tickets?priority=high")
    assert response.status_code == 200
    assert response.json()["total"] == 2
    assert [ticket["id"] for ticket in response.json()["items"]] == [102, 105]


def test_rejects_an_unsupported_priority() -> None:
    response = TestClient(create_app()).get("/api/tickets?priority=urgent")
    assert response.status_code == 400
    assert response.json()["error"]["code"] == "INVALID_PRIORITY"
