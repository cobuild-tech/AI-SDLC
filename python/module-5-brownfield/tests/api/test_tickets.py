import pytest
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


def test_filters_priority_case_insensitively() -> None:
    response = TestClient(create_app()).get("/api/tickets?priority=HIGH")
    assert response.status_code == 200
    assert response.json()["total"] == 2
    assert [ticket["id"] for ticket in response.json()["items"]] == [102, 105]


def test_rejects_repeated_priority_values() -> None:
    response = TestClient(create_app()).get("/api/tickets?priority=high&priority=normal")
    assert response.status_code == 400
    assert response.json()["error"]["code"] == "INVALID_PRIORITY"


def test_rejects_an_unsupported_priority() -> None:
    response = TestClient(create_app()).get("/api/tickets?priority=urgent")
    assert response.status_code == 400
    assert response.json()["error"]["code"] == "INVALID_PRIORITY"


def test_filters_unassigned_tickets_and_composes_with_priority() -> None:
    client = TestClient(create_app())
    unassigned = client.get("/api/tickets?unassigned=true")
    assert unassigned.status_code == 200
    assert [ticket["id"] for ticket in unassigned.json()["items"]] == [102, 104]

    composed = client.get("/api/tickets?priority=HIGH&unassigned=true")
    assert composed.status_code == 200
    assert composed.json()["total"] == 1
    assert composed.json()["items"][0]["id"] == 102


def test_filters_assigned_tickets() -> None:
    response = TestClient(create_app()).get("/api/tickets?unassigned=false")
    assert response.status_code == 200
    assert [ticket["id"] for ticket in response.json()["items"]] == [101, 103, 105]


@pytest.mark.parametrize("query", ["unassigned=yes", "unassigned=true&unassigned=false"])
def test_rejects_invalid_or_repeated_unassigned_values(query: str) -> None:
    response = TestClient(create_app()).get(f"/api/tickets?{query}")
    assert response.status_code == 400
    assert response.json() == {
        "error": {
            "code": "INVALID_UNASSIGNED",
            "message": "unassigned must be true or false",
        },
    }
