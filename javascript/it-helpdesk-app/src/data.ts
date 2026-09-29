import type { Ticket, User } from "./types.ts";

// In-memory "database". Tests call resetData() before each case so every
// test starts from the same seed.

const seedUsers: User[] = [
  { id: "u-asha", name: "Asha Rao", department: "Finance", isPrivileged: false },
  { id: "u-ben", name: "Ben Okafor", department: "Sales", isPrivileged: false },
  { id: "u-chen", name: "Chen Wei", department: "Design", isPrivileged: false },
  { id: "u-dev", name: "Dev Patel", department: "IT", isPrivileged: true },
  { id: "u-eli", name: "Eli Novak", department: "HR", isPrivileged: false },
];

// Descriptions are deliberately messy — typos, vague wording, two problems
// in one ticket — because that's what real tickets look like.
const seedTickets: Ticket[] = [
  {
    id: 1,
    requesterId: "u-asha",
    title: "cant login after pw change",
    description:
      "changed my password this morning and now outlook and teams keep asking for my password again. authenticator app shows nothing. pls help, client call at 3",
    priority: "high",
    status: "open",
    assignedTeam: "service-desk",
    createdAt: "2026-09-21T08:15:00.000Z",
  },
  {
    id: 2,
    requesterId: "u-ben",
    title: "VPN drops every 10 min",
    description:
      "since the update yesterday the VPN disconnects every ~10 mins when I'm on home wifi. in the office its fine",
    priority: "medium",
    status: "in_progress",
    assignedTeam: "network",
    createdAt: "2026-09-21T09:40:00.000Z",
  },
  {
    id: 3,
    requesterId: "u-chen",
    title: "need Figma",
    description: "can I get figma desktop installed? design team lead said to ask IT",
    priority: "low",
    status: "open",
    assignedTeam: "service-desk",
    createdAt: "2026-09-21T10:05:00.000Z",
  },
  {
    id: 4,
    requesterId: "u-dev",
    title: "laptop screen flickering + battery",
    description:
      "screen flickers when I move the lid, also battery dies in about an hour. laptop is 4 yrs old",
    priority: "medium",
    status: "open",
    assignedTeam: "service-desk",
    createdAt: "2026-09-22T07:30:00.000Z",
  },
  {
    id: 5,
    requesterId: "u-asha",
    title: "Access to finance-prod share",
    description:
      "need access to the finance-prod shared drive for quarter close. my manager approved over email",
    priority: "medium",
    status: "open",
    assignedTeam: "service-desk",
    createdAt: "2026-09-22T08:00:00.000Z",
  },
  {
    id: 6,
    requesterId: "u-ben",
    title: "printer",
    description: "3rd floor printer says offline again",
    priority: "low",
    status: "resolved",
    assignedTeam: "hardware",
    resolution: "Power-cycled the printer and re-added it to the print server.",
    createdAt: "2026-09-22T09:10:00.000Z",
    resolvedAt: "2026-09-22T11:00:00.000Z",
  },
  {
    id: 7,
    requesterId: "u-eli",
    title: "weird email from IT??",
    description:
      "got an email from 'IT support' asking me to confirm my MFA code. i clicked the link but didnt type anything in. is this real?",
    priority: "urgent",
    status: "open",
    assignedTeam: "service-desk",
    createdAt: "2026-09-23T13:20:00.000Z",
  },
  {
    id: 8,
    requesterId: "u-chen",
    title: "vpn not connecting",
    description: "vpn wont connect at all, error says gateway unreachable. tried twice",
    priority: "high",
    status: "open",
    assignedTeam: "service-desk",
    createdAt: "2026-09-23T14:00:00.000Z",
  },
  {
    id: 9,
    requesterId: "u-dev",
    title: "Outlook crashing on startup",
    description: "outlook crashes as soon as it opens",
    priority: "medium",
    status: "closed",
    assignedTeam: "service-desk",
    resolution: "Ran Office repair and rebuilt the Outlook profile.",
    createdAt: "2026-09-18T09:00:00.000Z",
    resolvedAt: "2026-09-18T10:30:00.000Z",
  },
  {
    id: 10,
    requesterId: "u-eli",
    title: "laptop for new starter monday",
    description: "new HR coordinator starts monday, needs a laptop set up with the standard HR apps",
    priority: "medium",
    status: "in_progress",
    assignedTeam: "hardware",
    createdAt: "2026-09-23T15:30:00.000Z",
  },
];

// Directory group memberships — only used by identityActions.ts (session 9).
const seedGroups: Record<string, string[]> = {
  "u-asha": ["all-staff", "finance"],
  "u-ben": ["all-staff", "sales"],
  "u-chen": ["all-staff", "design"],
  "u-dev": ["all-staff", "it", "domain-admins"],
  "u-eli": ["all-staff", "hr"],
};

export const users: User[] = [];
export const tickets: Ticket[] = [];
export const groups: Record<string, string[]> = {};

export function resetData(): void {
  users.splice(0, users.length, ...structuredClone(seedUsers));
  tickets.splice(0, tickets.length, ...structuredClone(seedTickets));
  for (const key of Object.keys(groups)) delete groups[key];
  Object.assign(groups, structuredClone(seedGroups));
}

resetData();
