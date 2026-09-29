from typing import Any


def has_role(user: Any, role: str) -> bool:
    roles = user.get("roles") if isinstance(user, dict) else None
    return isinstance(roles, list) and role in roles
