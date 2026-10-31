import Image from "next/image";
import Link from "next/link";
import { AdminNav } from "@/components/admin/AdminNav";
import { IdleLogout } from "@/components/admin/IdleLogout";
import { logout } from "@/modules/admin/actions";
import { adminNav } from "@/modules/admin/nav";
import { roleLabel } from "@/modules/admin/roles";
import { IDLE_MINUTES, requireAdmin } from "@/modules/admin/session";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  const groups = adminNav(admin.role);
  return (
    <div className="adm-shell">
      <aside className="adm-side">
        <Link href="/admin" className="adm-brand">
          <Image src="/images/logo.png" alt="TaxPlus Consulting" width={112} height={36} />
          <span>Admin</span>
        </Link>
        <AdminNav groups={groups} />
        <details className="adm-menu">
          <summary>Menu</summary>
          <AdminNav groups={groups} />
        </details>
      </aside>
      <div className="adm-main">
        <header className="adm-top">
          <span className="who">
            Masuk sebagai <b>{admin.name}</b> · {roleLabel(admin.role)}
          </span>
          <a className="adm-btn ghost sm" href="/" target="_blank" rel="noopener noreferrer">
            Lihat situs
          </a>
          <form action={logout}>
            <button className="adm-btn ghost sm">Keluar</button>
          </form>
        </header>
        <div className="adm-body">{children}</div>
      </div>
      <IdleLogout minutes={IDLE_MINUTES} />
    </div>
  );
}
