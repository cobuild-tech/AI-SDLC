import { beforeEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import { resetData } from "../src/data.ts";
import {
  assignTicket,
  closeTicket,
  createTicket,
  getTicket,
  listTickets,
  resolveTicket,
} from "../src/ticketService.ts";

beforeEach(() => resetData());

describe("createTicket", () => {
  it("creates an open ticket on the service desk with the next id", () => {
    const ticket = createTicket({
      requesterId: "u-ben",
      title: "  Keyboard missing keys ",
      description: "the E key fell off",
    });
    assert.equal(ticket.id, 11);
    assert.equal(ticket.title, "Keyboard missing keys");
    assert.equal(ticket.status, "open");
    assert.equal(ticket.assignedTeam, "service-desk");
    assert.equal(ticket.priority, "medium");
  });

  it("rejects an unknown requester", () => {
    assert.throws(
      () => createTicket({ requesterId: "u-nobody", title: "x", description: "y" }),
      /Unknown requester/,
    );
  });
});

describe("listTickets", () => {
  it("filters by status and team", () => {
    const openServiceDesk = listTickets({ status: "open", assignedTeam: "service-desk" });
    assert.deepEqual(
      openServiceDesk.map((t) => t.id),
      [1, 3, 4, 5, 7, 8],
    );
  });
});

describe("assignTicket", () => {
  it("moves the ticket to the team and marks it in progress", () => {
    const ticket = assignTicket(8, "network");
    assert.equal(ticket.assignedTeam, "network");
    assert.equal(ticket.status, "in_progress");
  });

  it("refuses to reassign a closed ticket", () => {
    assert.throws(() => assignTicket(9, "network"), /closed/);
  });
});

describe("resolveTicket", () => {
  it("requires a resolution note", () => {
    assert.throws(() => resolveTicket(3, "   "), /resolution/);
  });

  it("records the resolution and time", () => {
    const ticket = resolveTicket(3, "Installed Figma from the software portal.");
    assert.equal(ticket.status, "resolved");
    assert.ok(ticket.resolvedAt);
  });
});

describe("closeTicket", () => {
  it("closes a resolved ticket", () => {
    assert.equal(closeTicket(6).status, "closed");
  });

  it("closing a ticket that was never resolved should throw", () => {
    assert.throws(() => closeTicket(1), /not resolved/);
    assert.equal(getTicket(1).status, "open");
  });
});
