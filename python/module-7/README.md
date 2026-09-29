# Support ticket service

A small workshop repository used to practice security review of agent-generated changes.

## Commands

```bash
pytest
python -m compileall -q src tests
python scripts/secret_scan.py
```

The service itself uses only the Python standard library. Install the test tool, and nothing else:

```bash
python3 -m venv .venv          # Windows: py -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements-dev.txt
```

Do not run `pip install -r requirements.txt`. In the agent's change on the
`demo-exercise` branch, `requirements.txt` deliberately lists an unapproved
dependency (`acme-secure-export-helper`) that does not exist on PyPI -- that is
one of the exercise's planted findings, not a real requirement, and the install
will fail if you try it.

Use only approved dependencies listed in `docs/approved-dependencies.md`.
