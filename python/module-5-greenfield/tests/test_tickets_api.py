from fastapi.testclient import TestClient

from src.app import create_app


def test_reports_health() -> None:
    response = TestClient(create_app()).get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_creates_triages_and_retrieves_a_ticket() -> None:
    client = TestClient(create_app())
    created = client.post(
        "/api/tickets",
        json={
            "title": " Production unavailable ",
            "description": "Checkout is down",
            "customerTier": "enterprise",
        },
    )

    assert created.status_code == 201
    assert created.json() == {
        "id": 1,
        "title": "Production unavailable",
        "description": "Checkout is down",
        "customerTier": "enterprise",
        "status": "open",
        "priority": "critical",
        "team": "platform",
    }

    found = client.get("/api/tickets/1")
    assert found.status_code == 200
    assert found.json() == created.json()


def test_rejects_invalid_or_expanded_input() -> None:
    client = TestClient(create_app())
    missing = client.post("/api/tickets", json={"title": "Only a title"})
    expanded = client.post(
        "/api/tickets",
        json={
            "title": "Question",
            "description": "Please help",
            "customerTier": "standard",
            "admin": True,
        },
    )
    assert missing.status_code == 400
    assert expanded.status_code == 400
    assert expanded.json() == {"error": "Invalid ticket"}


def test_handles_missing_and_invalid_ids() -> None:
    client = TestClient(create_app())
    missing = client.get("/api/tickets/99")
    invalid = client.get("/api/tickets/nope")
    assert missing.status_code == 404
    assert missing.json() == {"error": "Ticket not found"}
    assert invalid.status_code == 400
    assert invalid.json() == {"error": "Invalid ticket id"}
