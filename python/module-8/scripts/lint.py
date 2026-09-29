import py_compile
import sys
from pathlib import Path

files = sorted(path for root in ["src", "tests", "scripts"] for path in Path(root).rglob("*.py"))

for file in files:
    try:
        py_compile.compile(str(file), doraise=True)
    except py_compile.PyCompileError as error:
        print(error.msg, file=sys.stderr)
        sys.exit(1)

print(f"Checked {len(files)} Python files")
