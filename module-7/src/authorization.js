export function hasRole(user, role) {
  return Array.isArray(user?.roles) && user.roles.includes(role);
}

