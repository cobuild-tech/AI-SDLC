import os

import uvicorn

from src.app import create_app


def main() -> None:
    port = int(os.environ.get("PORT", "3000"))
    uvicorn.run(create_app(), host="127.0.0.1", port=port)


if __name__ == "__main__":
    main()
