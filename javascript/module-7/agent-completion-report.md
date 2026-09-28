# Remediation report

## Corrected behavior

- Enforced the manager role before reading tickets.
- Reduced export records to the four approved fields.
- Removed source credentials and the unapproved dependency.
- Replaced sensitive logs with actor ID and item count.
- Preserved export failure with the standard status and error envelope.
- Reverted unrelated ordering, version and CI changes.

## Verification

- `npm test`: passed, four tests.
- `npm run lint`: passed.
- `npm run security`: passed.

## Residual risk

The real export adapter must obtain credentials from the approved runtime secret mechanism and apply its own network egress controls.
