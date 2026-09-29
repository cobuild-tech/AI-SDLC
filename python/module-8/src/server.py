import json
import os
from typing import Any

import uvicorn

from src.app import create_app
from src.domain.store import create_in_memory_ticket_store


class StdoutAuditSink:
    def write(self, event: dict[str, Any]) -> None:
        print(json.dumps(event), flush=True)


def main() -> None:
    api_key = os.environ.get("LAB_API_KEY")
    if not api_key:
        raise SystemExit("LAB_API_KEY must be set")

    app = create_app(api_key=api_key, store=create_in_memory_ticket_store(), audit_sink=StdoutAuditSink())
    uvicorn.run(app, host="127.0.0.1", port=int(os.environ.get("PORT", "3000")))


if __name__ == "__main__":
    main()
