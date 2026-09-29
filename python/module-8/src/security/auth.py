import hmac
from collections.abc import Mapping


def is_authorized(headers: Mapping[str, str], expected_api_key: str | None) -> bool:
    if not expected_api_key:
        return False
    supplied = headers.get("x-api-key")
    if supplied is None:
        return False

    return hmac.compare_digest(expected_api_key.encode(), supplied.encode())
