import type { IconName } from "@/components/ui/icons";

export type AdminNavItem = { href: string; label: string; icon: IconName };
export type AdminNavGroup = { title?: string; items: AdminNavItem[] };

export function adminNav(): AdminNavGroup[] {
  return [
    { items: [{ href: "/admin", label: "Dasbor", icon: "grid" }] },
    {
      title: "Akses",
      items: [
        { href: "/admin/users", label: "Pengguna admin", icon: "team" },
        { href: "/admin/account", label: "Akun saya", icon: "id" },
      ],
    },
  ];
}
