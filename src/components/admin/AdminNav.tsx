"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/icons";
import type { AdminNavGroup } from "@/modules/admin/nav";

/** Sidebar links; the closest match to the current path is marked current. */
export function AdminNav({ groups }: { groups: AdminNavGroup[] }) {
  const pathname = usePathname();
  const hrefs = groups.flatMap((g) => g.items.map((i) => i.href));
  const current = hrefs
    .filter((h) => pathname === h || (h !== "/admin" && pathname.startsWith(`${h}/`)))
    .sort((a, b) => b.length - a.length)[0];
  return (
    <nav className="adm-nav" aria-label="Menu admin">
      {groups.map((g, gi) => (
        <div key={g.title ?? gi}>
          {g.title && <small>{g.title}</small>}
          {g.items.map((i) => (
            <Link key={i.href} href={i.href} aria-current={i.href === current ? "page" : undefined}>
              <Icon name={i.icon} size={18} />
              {i.label}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}
