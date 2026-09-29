# VPN troubleshooting

## Before you start

The company VPN is required for internal file shares, the finance systems and remote desktop. Email, Teams and the software portal work without it.

## VPN will not connect ("gateway unreachable")

1. Confirm you have internet access by opening any public website.
2. Check you are connecting to the correct gateway: vpn.corp.example.com.
3. Quit the VPN client completely and reopen it.
4. If you are on hotel or guest wifi, complete the wifi login page first; captive portals block the VPN.
5. If the error persists on two different networks, raise a ticket and include the exact error text.

## VPN disconnects every few minutes

Frequent drops are usually caused by the local network, not your account.

1. Check whether the drops happen only on one network (for example home wifi but not the office).
2. Restart your home router and move closer to it, or use a wired connection.
3. Turn off wifi power saving: on Windows, Device Manager > network adapter > Power Management.
4. After a VPN client update, restart the laptop once so the new network driver loads.
5. If drops continue, raise a ticket with the times the drops happened; the network team can match them to gateway logs.

## Slow VPN

Video calls do not need the VPN. Disconnect from the VPN during large Teams or Zoom meetings to improve quality.
