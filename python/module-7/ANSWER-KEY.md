# SEC-301 red-team answer key

Decision: reject the change and escalate the credential exposure and CI weakening.

## Critical findings

### Hard-coded credential

`src/export_tickets.py` stores a synthetic token in source and passes it to the exporter. Even a real secret that has been deleted from the latest version remains recoverable from Git history. Remove it and use the approved runtime secret mechanism. Revoke a real exposed credential immediately.

### Missing authorization

The export function never calls `has_role`. The test uses a viewer and still receives data. Enforce manager authorization before reading or exporting tickets, then test unauthorized behavior.

### Confidential data exposure

The exporter receives and returns complete ticket records containing `customerEmail` and `internalNotes`. Map records to the four approved export fields before any external call or response.

### Sensitive logging

The code logs the token, user, request body and full tickets. Use structured metadata without credentials, request content or customer fields.

## High findings

### Security control weakened

`.github/workflows/quality.yml` changes the secret scan to continue after failure. The current scan does fail. Restore fail-closed behavior and require Security Engineering approval for workflow changes.

### Fabricated validation claims

`agent-completion-report.md` says all security checks pass, authorization exists, data is sanitized and no unrelated behavior changed. Repository evidence disproves every claim. Treat the report as an assertion to verify, not approval evidence.

### Errors suppressed

The `except` block converts export failure into status 200 with an empty result. This hides incidents and gives callers false success. Return status 500 with code `EXPORT_FAILED` and emit a safe operational error event.

## Medium findings

### Weak test

The new test asserts only that a result object exists. It does not verify role enforcement, response fields, error status or absence of sensitive data and logs.

### Unapproved or hallucinated dependency

`acme-secure-export-helper` in `requirements.txt` is absent from the approved catalogue, is unnecessary and has no provenance evidence. Remove it. Do not attempt installation during review.

### Unrelated behavior change

`src/ticket_service.py` reverses list ordering while implementing export. The task does not request this change, and existing consumers may depend on order. Revert it or create a separate reviewed task.

### Unnecessary major version change

`pyproject.toml` moves from version 1 to 2 without a release decision or breaking-change review. Revert it.

## Automated versus human controls

Automated checks could block the token, security scan failure, unsupported dependency and missing test coverage. Human review remains necessary to detect the missing authorization, excessive data exposure, unrelated behavior change and false completion claims.

