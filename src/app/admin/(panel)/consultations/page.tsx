import { count, desc, eq } from "drizzle-orm";
import Link from "next/link";
import { PageHead } from "@/components/admin/PageHead";
import { getDb } from "@/lib/db";
import { consultationRequests, consultationStatus } from "@/lib/db/schema";
import { requireAdmin } from "@/modules/admin/session";
import { STATUS_LABELS, STATUS_PILL } from "@/modules/consultations/admin";
import { consultationTopics, topicLabel } from "@/modules/consultations/topics";
import { getServices } from "@/modules/content/data";

export const metadata = { title: "Konsultasi masuk" };

const dateFmt = new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Jakarta" });
const PAGE_SIZE = 50;

export default async function ConsultationsPage({ searchParams }: PageProps<"/admin/consultations">) {
  await requireAdmin("consultations");
  const { status: statusParam, page: pageParam } = await searchParams;
  const status = consultationStatus.enumValues.find((s) => s === statusParam);
  const page = Math.max(1, Number(pageParam) || 1);
  const db = getDb();
  const where = status ? eq(consultationRequests.status, status) : undefined;
  const [rows, [{ total }], counts, services] = await Promise.all([
    db
      .select()
      .from(consultationRequests)
      .where(where)
      .orderBy(desc(consultationRequests.createdAt))
      .limit(PAGE_SIZE)
      .offset((page - 1) * PAGE_SIZE),
    db.select({ total: count() }).from(consultationRequests).where(where),
    db.select({ status: consultationRequests.status, n: count() }).from(consultationRequests).groupBy(consultationRequests.status),
    getServices(),
  ]);
  const topics = consultationTopics(services);
  const countOf = (s?: string) => (s ? (counts.find((c) => c.status === s)?.n ?? 0) : counts.reduce((a, c) => a + c.n, 0));
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const href = (p: { status?: string; page?: number }) => {
    const q = new URLSearchParams();
    if (p.status) q.set("status", p.status);
    if (p.page && p.page > 1) q.set("page", String(p.page));
    const qs = q.toString();
    return `/admin/consultations${qs ? `?${qs}` : ""}`;
  };

  return (
    <>
      <PageHead title="Konsultasi masuk" sub="Permintaan dari form Konsultasi gratis di Beranda dan Kontak." />
      <div className="adm-tabs" role="tablist" aria-label="Filter status">
        {[undefined, ...consultationStatus.enumValues].map((s) => (
          <Link key={s ?? "all"} href={href({ status: s })} className={s === status ? "on" : undefined} aria-current={s === status ? "page" : undefined}>
            {s ? STATUS_LABELS[s] : "Semua"} <span>{countOf(s)}</span>
          </Link>
        ))}
      </div>
      {rows.length === 0 ? (
        <div className="adm-card adm-empty">Belum ada permintaan{status ? ` berstatus "${STATUS_LABELS[status].toLowerCase()}"` : ""}.</div>
      ) : (
        <div className="adm-scroll">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Kebutuhan</th>
                <th>WhatsApp</th>
                <th>Masuk</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className={r.status === "new" ? "is-new" : undefined}>
                  <td className="t-main">
                    <Link href={`/admin/consultations/${r.id}`}>{r.name}</Link>
                    {r.company && <div className="adm-muted">{r.company}</div>}
                  </td>
                  <td className="adm-muted">{topicLabel(topics, r.topic).split(" – ")[0]}</td>
                  <td>{r.whatsapp}</td>
                  <td className="adm-muted" style={{ whiteSpace: "nowrap" }}>{dateFmt.format(r.createdAt)}</td>
                  <td>
                    <span className={STATUS_PILL[r.status]}>{STATUS_LABELS[r.status]}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {pages > 1 && (
        <div className="adm-actions" style={{ marginTop: 16, justifyContent: "center" }}>
          {page > 1 && (
            <Link className="adm-btn ghost sm" href={href({ status, page: page - 1 })}>
              ← Sebelumnya
            </Link>
          )}
          <span className="adm-muted">
            Halaman {page} dari {pages}
          </span>
          {page < pages && (
            <Link className="adm-btn ghost sm" href={href({ status, page: page + 1 })}>
              Berikutnya →
            </Link>
          )}
        </div>
      )}
    </>
  );
}
