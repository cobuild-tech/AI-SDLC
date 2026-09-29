from src.export_tickets import export_tickets


def test_exports_tickets() -> None:
    result = export_tickets({
        "user": {"id": "user-12", "roles": ["viewer"]},
        "body": {"includeInternal": True},
    })

    assert result

