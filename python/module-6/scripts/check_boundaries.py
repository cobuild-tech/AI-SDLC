import os
import subprocess
import sys

BASE = os.environ.get("BASE_REF", "demo-exercise")
PROTECTED_PREFIXES = (
    ".github/workflows/",
    ".github/CODEOWNERS",
    "data/seed-tickets.json",
    "docs/architecture.md",
)


def git_files(*args: str) -> list[str]:
    try:
        result = subprocess.run(["git", *args], capture_output=True, text=True, check=True)
    except (OSError, subprocess.CalledProcessError):
        return []
    return [line for line in result.stdout.splitlines() if line]


# Committed changes since the base branch, plus uncommitted and untracked files.
changed = [
    *git_files("diff", "--name-only", "--relative", f"{BASE}...HEAD", "--", "."),
    *git_files("diff", "--name-only", "--relative", "HEAD", "--", "."),
    *git_files("ls-files", "--others", "--exclude-standard", "--", "."),
]

violations = [path for path in changed if path.startswith(PROTECTED_PREFIXES)]
if violations:
    print(f"Protected paths changed: {', '.join(violations)}", file=sys.stderr)
    sys.exit(1)
print("Protected-path check passed.")
