import { count, eq, sql } from "drizzle-orm";
import Link from "next/link";
import { PageHead } from "@/components/admin/PageHead";
import { Icon } from "@/components/ui/icons";
import { getDb } from "@/lib/db";
import { cmsEntries, consultationRequests } from "@/lib/db/schema";
import { requireAdmin } from "@/modules/admin/session";
import { collections, settings } from "@/modules/cms/collections";

export const metadata = { title: "Dasbor" };

export default async function DashboardPage() {
  const admin = await requireAdmin();
  const db = getDb();
  const [counts, [{ newRequests }]] = await Promise.all([
    db
      .select({ collection: cmsEntries.collection, total: count(), drafts: sql<number>`count(*) filter (where ${cmsEntries.status} = 'draft')`.mapWith(Number) })
      .from(cmsEntries)
      .groupBy(cmsEntries.collection),
    db.select({ newRequests: count() }).from(consultationRequests).where(eq(consultationRequests.status, "new")),
  ]);
  const byKey = new Map(counts.map((c) => [c.collection, c]));
  return (
    <>
      <PageHead title={`Halo, ${admin.name.split(" ")[0]}`} sub="Perubahan yang disimpan di sini langsung tampil di situs, tanpa deploy ulang." />
      <Link href="/admin/consultations?status=new" className={newRequests ? "adm-card adm-inbox has-new" : "adm-card adm-inbox"}>
        <Icon name="mail" size={26} />
        <span>
          <b>{newRequests ? `${newRequests} permintaan konsultasi baru` : "Tidak ada permintaan konsultasi baru"}</b>
          <small>Dari form Konsultasi gratis. Buka untuk membalas lewat WhatsApp.</small>
        </span>
        <span aria-hidden="true">→</span>
      </Link>
      <h2 style={{ marginTop: 28 }}>Konten</h2>
      <div className="adm-grid">
        {Object.values(collections).map((c) => {
          const n = byKey.get(c.key);
          return (
            <Link key={c.key} href={`/admin/content/${c.key}`} className="adm-card adm-stat">
              <Icon name={c.icon} size={22} />
              <b>{n?.total ?? 0}</b>
              <span>{c.label}</span>
              <small>{n?.drafts ? `${n.drafts} draf` : c.description}</small>
            </Link>
          );
        })}
      </div>
      <h2 style={{ marginTop: 30 }}>Pengaturan</h2>
      <div className="adm-grid">
        {Object.values(settings).map((s) => (
          <Link key={s.key} href={`/admin/settings/${s.key}`} className="adm-card adm-stat">
            <Icon name={s.icon} size={22} />
            <span>{s.label}</span>
            <small>{s.description}</small>
          </Link>
        ))}
      </div>
    </>
  );
}
