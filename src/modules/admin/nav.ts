import type { IconName } from "@/components/ui/icons";
import { collections, settings } from "@/modules/cms/collections";
import { can, type Role } from "./roles";

export type AdminNavItem = { href: string; label: string; icon: IconName };
export type AdminNavGroup = { title?: string; items: AdminNavItem[] };

/** Menu for the role: groups the role can't open are left out. */
export function adminNav(role: Role): AdminNavGroup[] {
  const groups: (AdminNavGroup | false)[] = [
    {
      items: [
        { href: "/admin", label: "Dasbor", icon: "grid" },
        ...(can(role, "consultations") ? [{ href: "/admin/consultations", label: "Konsultasi masuk", icon: "mail" as const }] : []),
        ...(can(role, "analytics") ? [{ href: "/admin/analytics", label: "Analitik", icon: "trend" as const }] : []),
      ],
    },
    {
      title: "Konten",
      items: Object.values(collections).map((c) => ({ href: `/admin/content/${c.key}`, label: c.label, icon: c.icon })),
    },
    can(role, "settings") && {
      title: "Pengaturan",
      items: Object.values(settings).map((s) => ({ href: `/admin/settings/${s.key}`, label: s.label, icon: s.icon })),
    },
    {
      title: "Akses",
      items: [
        ...(can(role, "users.view") ? [{ href: "/admin/users", label: "Pengguna", icon: "team" as const }] : []),
        { href: "/admin/account", label: "Akun saya", icon: "id" },
      ],
    },
  ];
  return groups.filter((g): g is AdminNavGroup => !!g);
}
