export function createInMemoryTicketStore() {
  const tickets = new Map();
  let sequence = 1000;

  return {
    create(ticket) {
      sequence += 1;
      const stored = {
        ...ticket,
        id: `T-${sequence}`,
        createdAt: new Date().toISOString(),
      };
      tickets.set(stored.id, stored);
      return structuredClone(stored);
    },

    getById(id) {
      const ticket = tickets.get(id);
      return ticket ? structuredClone(ticket) : null;
    },
  };
}
