# Acceptance criteria

1. Enumeration inputs are trimmed and compared case-insensitively.
2. A mixed-case or whitespace-padded critical severity is assigned `P1` and `incident-response`.
3. A platinum, blocked-service ticket is assigned `P1` and `rapid-response`.
4. Critical routing takes precedence over platinum routing when both rules apply.
5. `decisionReasons` is returned and stored for every created ticket.
6. Existing behavior for high-severity and routine tickets remains unchanged.
7. Audit events contain only approved metadata: `action`, `ticketId`, `priority`, `queue` and `reasonCodes`.
8. Audit events never contain a ticket summary, requester email, API key or raw request body.
9. Authentication, payload-size limits and public error behavior are not weakened.
10. `python scripts/validate.py` passes without adding runtime dependencies.
