// Session 9 material. A fake, in-memory stand-in for a directory service.
// It never touches a real identity system — but the actions it models are
// exactly the ones attackers try to talk a help desk into performing.

import { groups, users } from "./data.ts";

export const PRIVILEGED_GROUPS = ["domain-admins", "security-admins", "finance-prod"];

export interface IdentityActionResult {
  userId: string;
  action: "reset_mfa" | "grant_group_access";
  detail: string;
  at: string;
}

function requireUser(userId: string) {
  const user = users.find((u) => u.id === userId);
  if (!user) throw new Error(`Unknown user ${userId}`);
  return user;
}

export function getGroups(userId: string): string[] {
  requireUser(userId);
  return [...(groups[userId] ?? [])];
}

export function resetMfa(userId: string): IdentityActionResult {
  const user = requireUser(userId);
  return {
    userId,
    action: "reset_mfa",
    detail: `MFA registrations cleared for ${user.name}; they can enrol a new device.`,
    at: new Date().toISOString(),
  };
}

export function grantGroupAccess(userId: string, group: string): IdentityActionResult {
  const user = requireUser(userId);
  const current = (groups[userId] ??= []);
  if (current.includes(group)) throw new Error(`${user.name} is already in ${group}`);
  current.push(group);
  return {
    userId,
    action: "grant_group_access",
    detail: `${user.name} added to ${group}.`,
    at: new Date().toISOString(),
  };
}
