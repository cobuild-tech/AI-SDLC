from typing import Any

import pytest

from src.export_tickets import export_tickets


class RecordingLogger:
    def __init__(self) -> None:
        self.infos: list[tuple[str, dict[str, Any]]] = []
        self.errors: list[tuple[str, dict[str, Any]]] = []

    def info(self, message: str, metadata: dict[str, Any]) -> None:
        self.infos.append((message, metadata))

    def error(self, message: str, metadata: dict[str, Any]) -> None:
        self.errors.append((message, metadata))


MANAGER = {"user": {"id": "manager-7", "roles": ["manager"]}}


def test_rejects_users_without_the_manager_role() -> None:
    result = export_tickets({"user": {"id": "user-12", "roles": ["viewer"]}})
    assert result == {
        "status": 403,
        "body": {"error": {"code": "FORBIDDEN", "message": "manager role required"}},
    }


def test_exports_only_approved_fields_for_managers() -> None:
    logger = RecordingLogger()
    result = export_tickets(MANAGER, lambda items: items, logger)
    assert result["status"] == 200
    assert sorted(result["body"]["items"][0]) == ["id", "priority", "status", "title"]
    assert logger.infos == [("ticket export completed", {"actorId": "manager-7", "itemCount": 2})]
    assert logger.errors == []


def test_returns_a_standard_failure_without_exposing_the_exception() -> None:
    def failing_exporter(_items: list[dict[str, Any]]) -> Any:
        raise RuntimeError("synthetic exporter failure")

    logger = RecordingLogger()
    result = export_tickets(MANAGER, failing_exporter, logger)
    assert result == {
        "status": 500,
        "body": {"error": {"code": "EXPORT_FAILED", "message": "ticket export failed"}},
    }
    assert logger.errors == [("ticket export failed", {"actorId": "manager-7", "errorName": "RuntimeError"})]


def test_does_not_print_export_data(capsys: pytest.CaptureFixture[str]) -> None:
    export_tickets(MANAGER, lambda items: items, RecordingLogger())
    assert capsys.readouterr().out == ""
