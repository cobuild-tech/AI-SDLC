import subprocess
import sys

for command in (["scripts/lint.py"], ["-m", "pytest"]):
    result = subprocess.run([sys.executable, *command])
    if result.returncode != 0:
        sys.exit(result.returncode)
