/* Roles and what each may do. No server imports: the admin UI uses this to hide what a role can't use. */

export type Role = "super_admin" | "admin" | "user";

export const ROLES: { value: Role; label: string; description: string }[] = [
  { value: "user", label: "User", description: "Menambah dan mengedit konten. Tidak bisa menghapus, membuka pengaturan, konsultasi, atau pengguna." },
  { value: "admin", label: "Admin", description: "Semua konten, pengaturan situs, dan konsultasi masuk. Tidak bisa mengelola pengguna." },
  { value: "super_admin", label: "Super admin", description: "Semua akses, termasuk mengundang dan mengatur pengguna." },
];

export const roleLabel = (role: Role) => ROLES.find((r) => r.value === role)?.label ?? role;

export type Permission = "content" | "content.delete" | "settings" | "consultations" | "users";

const GRANTS: Record<Role, Permission[]> = {
  user: ["content"],
  admin: ["content", "content.delete", "settings", "consultations"],
  super_admin: ["content", "content.delete", "settings", "consultations", "users"],
};

export function can(role: Role, permission: Permission) {
  return GRANTS[role].includes(permission);
}

export function isRole(value: unknown): value is Role {
  return value === "super_admin" || value === "admin" || value === "user";
}
