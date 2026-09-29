import re
import sys
from pathlib import Path

ROOTS = ["src", "tests"]
PATTERNS = [
    re.compile(r"DEMO_ONLY_FAKE_TOKEN_[A-Z0-9]+"),
    re.compile(r"""(?:api|access|secret)[_-]?token\s*=\s*["'][^"']+""", re.IGNORECASE),
]

findings = []
for root in ROOTS:
    for path in sorted(Path(root).rglob("*")):
        if path.is_file() and "__pycache__" not in path.parts:
            content = path.read_text(encoding="utf-8", errors="ignore")
            if any(pattern.search(content) for pattern in PATTERNS):
                findings.append(str(path))

if findings:
    print(f"Potential secrets found in: {', '.join(findings)}", file=sys.stderr)
    sys.exit(1)
print("Secret scan passed.")
