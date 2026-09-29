# Password and MFA reset

## Reset your own password

1. Go to the self-service password portal from any company device or your phone.
2. Verify with your registered authenticator app.
3. Choose a new password of at least 14 characters. You cannot reuse your last 10 passwords.
4. Sign out of and back into Outlook, Teams and the VPN client so they pick up the new password.

## Apps keep asking for the old password after a change

Outlook, Teams and mobile mail apps cache your credentials. After a password change they may prompt repeatedly.

1. Fully quit Outlook and Teams (including the tray icon) and reopen them.
2. On macOS, open Keychain Access and delete saved entries for Microsoft Office; on Windows, remove them from Credential Manager.
3. On your phone, remove and re-add the work mail account.

If prompts continue for more than 30 minutes, raise a ticket with the service desk.

## Authenticator app not showing prompts

1. Check your phone has network access and the correct time (set it to automatic).
2. Open the authenticator app and use the 6-digit code instead of the push prompt.
3. If you replaced your phone, your old registration will not work. Raise a ticket to have MFA re-registered.

## MFA reset requests

An MFA reset lets someone register a new device for your account, so the service desk treats it as a high-risk action.

- The service desk will never ask for your MFA code by email, chat or phone.
- Before resetting MFA, the service desk must verify your identity with a video call and your manager's confirmation.
- MFA resets for privileged (admin) accounts also require approval from the security team.
