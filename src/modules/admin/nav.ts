import type { IconName } from "@/components/ui/icons";
import { collections, settings } from "@/modules/cms/collections";

export type AdminNavItem = { href: string; label: string; icon: IconName };
export type AdminNavGroup = { title?: string; items: AdminNavItem[] };

export function adminNav(): AdminNavGroup[] {
  return [
    {
      items: [
        { href: "/admin", label: "Dasbor", icon: "grid" },
        { href: "/admin/consultations", label: "Konsultasi masuk", icon: "mail" },
      ],
    },
    {
      title: "Konten",
      items: Object.values(collections).map((c) => ({ href: `/admin/content/${c.key}`, label: c.label, icon: c.icon })),
    },
    {
      title: "Pengaturan",
      items: Object.values(settings).map((s) => ({ href: `/admin/settings/${s.key}`, label: s.label, icon: s.icon })),
    },
    {
      title: "Akses",
      items: [
        { href: "/admin/users", label: "Pengguna admin", icon: "team" },
        { href: "/admin/account", label: "Akun saya", icon: "id" },
      ],
    },
  ];
}
