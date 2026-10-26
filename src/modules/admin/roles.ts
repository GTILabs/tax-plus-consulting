/* Roles and what each may do. No server imports: the admin UI uses this to hide what a role can't use. */

export type Role = "super_admin" | "admin" | "user";

export const ROLES: { value: Role; label: string; description: string }[] = [
  { value: "user", label: "User", description: "Menambah dan mengedit konten. Tidak bisa menghapus, membuka pengaturan, konsultasi, atau pengguna." },
  { value: "admin", label: "Admin", description: "Semua konten, pengaturan situs, konsultasi masuk, dan menghapus akun ber-role User." },
  { value: "super_admin", label: "Super admin", description: "Semua akses, termasuk mengundang dan mengatur pengguna." },
];

export const roleLabel = (role: Role) => ROLES.find((r) => r.value === role)?.label ?? role;

/** "users.view" opens Pengguna and allows deleting User accounts; "users" is full user management. */
export type Permission = "content" | "content.delete" | "settings" | "consultations" | "users.view" | "users";

const GRANTS: Record<Role, Permission[]> = {
  user: ["content"],
  admin: ["content", "content.delete", "settings", "consultations", "users.view"],
  super_admin: ["content", "content.delete", "settings", "consultations", "users.view", "users"],
};

export function can(role: Role, permission: Permission) {
  return GRANTS[role].includes(permission);
}

/** Super admins may delete anyone but themselves; admins only accounts with the User role. */
export function canDeleteUser(actor: { id: string; role: Role }, target: { id: string; role: Role }) {
  if (actor.id === target.id) return false;
  return can(actor.role, "users") || (can(actor.role, "users.view") && target.role === "user");
}

export function isRole(value: unknown): value is Role {
  return value === "super_admin" || value === "admin" || value === "user";
}
