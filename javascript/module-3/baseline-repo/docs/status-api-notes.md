# Status API notes

Notes from the planning call about changing a ticket's status.

- Any status can move to any other status. Support reopening, so a `closed` ticket can go back to `open`.
- If the requested change isn't allowed, return HTTP 409.
