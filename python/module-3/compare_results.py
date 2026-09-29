# Scores baseline-repo (no context, weak prompt) and context-ready-repo (full
# context, strong prompt) against the same acceptance criteria, so you can see
# the difference context makes.
#
# Run from the python/module-3 folder, after creating the .venv and installing
# requirements-dev.txt in both folders:
#   python3 compare_results.py        (Windows: py compare_results.py)
#
# It starts each folder's API on its own port, calls it over HTTP and reads a
# few files. It changes nothing in either folder. It uses only the standard
# library, so any Python 3.11+ can run it.

import json
import os
import re
import subprocess
import sys
import time
import urllib.error
import urllib.request
from collections.abc import Callable
from dataclasses import dataclass
from pathlib import Path
from typing import Any

HERE = Path(__file__).resolve().parent


@dataclass
class Repo:
    name: str
    dir: Path
    port: int


REPOS = [
    Repo("Baseline", HERE / "baseline-repo", 3101),
    Repo("Context-ready", HERE / "context-ready-repo", 3102),
]

# (status, body) or None when the server did not answer.
Response = tuple[int, Any] | None


def show(response: Response) -> str:
    if response is None:
        return "no response"
    status, body = response
    return f"got {status} {json.dumps(body, separators=(',', ':'))}"


def expect_error(status: int, error: str) -> Callable[[Response], str | None]:
    def verify(response: Response) -> str | None:
        if response is not None:
            actual_status, body = response
            if actual_status == status and isinstance(body, dict) and body == {"error": error}:
                return None
        return f'expected {status} {{"error":"{error}"}}, {show(response)}'

    return verify


def expect_moved_to(status: str) -> Callable[[Response], str | None]:
    def verify(response: Response) -> str | None:
        if response is not None and response[0] == 200:
            if f'"status":"{status}"' in json.dumps(response[1], separators=(",", ":")):
                return None
        return f'expected 200 with status "{status}", {show(response)}'

    return verify


def call(url: str, method: str = "GET", body: Any = None) -> Response:
    data = None if body is None else json.dumps(body).encode()
    request = urllib.request.Request(url, data=data, method=method)
    if data is not None:
        request.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(request, timeout=5) as reply:
            status, text = reply.status, reply.read().decode()
    except urllib.error.HTTPError as error:
        status, text = error.code, error.read().decode()
    except (urllib.error.URLError, OSError):
        return None
    try:
        return status, json.loads(text)
    except ValueError:
        return status, text


def patch(base: str, ticket_id: object, body: Any) -> Response:
    return call(f"{base}/api/tickets/{ticket_id}/status", "PATCH", body)


def read_sources(directory: Path) -> str:
    if not directory.is_dir():
        return ""
    return "\n".join(path.read_text(encoding="utf-8") for path in sorted(directory.rglob("*.py")))


def check_bad_ids(base: str, _dir: Path) -> str | None:
    for ticket_id in ["0", "-1", "1.5", "abc"]:
        failure = expect_error(400, "Invalid ticket id")(patch(base, ticket_id, {"status": "in_progress"}))
        if failure:
            return f"id {ticket_id}: {failure}"
    return None


def check_list(base: str, _dir: Path) -> str | None:
    response = call(f"{base}/api/tickets")
    if response and response[0] == 200 and isinstance(response[1], dict):
        tickets = response[1].get("tickets")
        if isinstance(tickets, list) and len(tickets) == 4:
            return None
    return f"expected 200 with 4 tickets, {show(response)}"


def check_tests(_base: str, directory: Path) -> str | None:
    source = read_sources(directory / "tests")
    if re.search(r"""\.patch\(\s*f?["']/api/tickets/[^"']*/status""", source):
        return None
    return "no test calls PATCH /api/tickets/{id}/status"


def check_service_layer(_base: str, directory: Path) -> str | None:
    source = read_sources(directory / "src" / "services")
    if "in_progress" in source and "closed" in source:
        return None
    return "src/services has no status workflow; the transition rules are somewhere else"


def check_types(_base: str, directory: Path) -> str | None:
    result = subprocess.run(
        [str(venv_python(directory)), "-m", "mypy"],
        cwd=directory,
        capture_output=True,
        text=True,
    )
    if result.returncode == 0:
        return None
    lines = result.stdout.strip().splitlines()[:3]
    return "mypy reported errors:\n    " + "\n    ".join(lines)


def check_readme(_base: str, directory: Path) -> str | None:
    readme = (directory / "README.md").read_text(encoding="utf-8")
    if re.search(r"PATCH\s+/api/tickets/\S+/status", readme):
        return None
    return "README does not mention PATCH /api/tickets/:id/status"


@dataclass
class Check:
    label: str
    patch: tuple[int, dict[str, str]] | None = None
    verify: Callable[[Response], str | None] | None = None
    run: Callable[[str, Path], str | None] | None = None


# Checks run in order against one server, so later checks see earlier changes.
# Starting data: 1 open, 2 in_progress, 3 closed, 4 open.
CHECKS = [
    Check("open → in_progress works", (1, {"status": "in_progress"}), expect_moved_to("in_progress")),
    Check("in_progress → closed works", (2, {"status": "closed"}), expect_moved_to("closed")),
    Check("Reopening a closed ticket is refused (400)", (3, {"status": "open"}), expect_error(400, "Invalid status transition")),
    Check("Skipping a step is refused (400)", (4, {"status": "closed"}), expect_error(400, "Invalid status transition")),
    Check("Unknown status is rejected (400)", (4, {"status": "blocked"}), expect_error(400, "Invalid status")),
    Check("Missing ticket returns 404", (999, {"status": "in_progress"}), expect_error(404, "Ticket not found")),
    Check("Bad ticket ids are rejected (400)", run=check_bad_ids),
    Check("List endpoint still returns 4 tickets", run=check_list),
    Check("Tests cover the new endpoint", run=check_tests),
    Check("Workflow rules live in the service layer", run=check_service_layer),
    Check("Type check passes (mypy)", run=check_types),
    Check("README documents the endpoint", run=check_readme),
]


def venv_python(directory: Path) -> Path:
    if os.name == "nt":
        return directory / ".venv" / "Scripts" / "python.exe"
    return directory / ".venv" / "bin" / "python"


def start_server(repo: Repo) -> subprocess.Popen[str]:
    python = venv_python(repo.dir)
    if not python.exists():
        raise RuntimeError(f"create the .venv and run pip install -r requirements-dev.txt in {repo.dir} first")
    child = subprocess.Popen(
        [str(python), "-m", "src.server"],
        cwd=repo.dir,
        env={**os.environ, "PORT": str(repo.port)},
        stdout=subprocess.DEVNULL,
        stderr=subprocess.PIPE,
        text=True,
    )
    for _ in range(75):
        if child.poll() is not None:
            break
        response = call(f"http://127.0.0.1:{repo.port}/health")
        if response and response[0] == 200:
            return child
        time.sleep(0.2)
    child.kill()
    stderr = child.communicate()[1] or ""
    tail = "\n".join(stderr.strip().splitlines()[-5:])
    raise RuntimeError(f"the server did not start\n{tail}")


def score(repo: Repo) -> tuple[str | None, list[str | None]]:
    try:
        server = start_server(repo)
    except RuntimeError as error:
        return str(error), ["not run"] * len(CHECKS)
    base = f"http://127.0.0.1:{repo.port}"
    results: list[str | None] = []
    try:
        for check in CHECKS:
            if check.run:
                results.append(check.run(base, repo.dir))
            else:
                assert check.patch and check.verify
                results.append(check.verify(patch(base, *check.patch)))
    finally:
        server.kill()
        server.wait()
    return None, results


def main() -> None:
    scores = [score(repo) for repo in REPOS]

    width = max(len(check.label) for check in CHECKS) + 2
    print(f"\n{'Acceptance check'.ljust(width)}Baseline  Context-ready")
    print("-" * (width + 23))
    for index, check in enumerate(CHECKS):
        marks = ("PASS" if results[index] is None else "FAIL" for _error, results in scores)
        print(check.label.ljust(width) + "".join(mark.ljust(10) for mark in marks))
    print("-" * (width + 23))
    totals = (f"{sum(result is None for result in results)}/{len(CHECKS)}" for _error, results in scores)
    print("Score".ljust(width) + "".join(total.ljust(10) for total in totals))

    for repo, (error, results) in zip(REPOS, scores):
        print(f"\n{repo.name} ({repo.dir.name})")
        if error:
            print(f"  Could not score: {error}")
            continue
        failures = [(check.label, result) for check, result in zip(CHECKS, results) if result is not None]
        if not failures:
            print("  Every check passed.")
        for label, result in failures:
            print(f"  FAIL {label}: {result}")
    print()


if __name__ == "__main__":
    sys.exit(main())
