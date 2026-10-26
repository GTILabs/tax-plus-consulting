import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { PageHead } from "@/components/admin/PageHead";
import { getDb } from "@/lib/db";
import { consultationRequests, consultationStatus } from "@/lib/db/schema";
import { requireAdmin } from "@/modules/admin/session";
import { deleteConsultation, setConsultationStatus } from "@/modules/consultations/actions";
import { STATUS_LABELS, STATUS_PILL, visitorWhatsapp } from "@/modules/consultations/admin";
import { consultationTopics, topicLabel } from "@/modules/consultations/topics";
import { getServices } from "@/modules/content/data";

export const metadata = { title: "Detail konsultasi" };

const UUID = /^[0-9a-f-]{36}$/i;
const dateFmt = new Intl.DateTimeFormat("id-ID", { dateStyle: "full", timeStyle: "short", timeZone: "Asia/Jakarta" });

export default async function ConsultationPage({ params }: PageProps<"/admin/consultations/[id]">) {
  await requireAdmin();
  const { id } = await params;
  if (!UUID.test(id)) notFound();
  const [[r], services] = await Promise.all([
    getDb().select().from(consultationRequests).where(eq(consultationRequests.id, id)).limit(1),
    getServices(),
  ]);
  if (!r) notFound();
  const details: [string, React.ReactNode][] = [
    ["Perusahaan", r.company],
    ["Email", r.email && <a href={`mailto:${r.email}`}>{r.email}</a>],
    ["WhatsApp", r.whatsapp],
    ["Kebutuhan", topicLabel(consultationTopics(services), r.topic)],
    ["Sektor", r.sector],
    ["Masuk", dateFmt.format(r.createdAt)],
  ];
  return (
    <>
      <PageHead title={r.name} crumbs={[{ href: "/admin/consultations", label: "Konsultasi masuk" }]}>
        <a className="adm-btn gold" href={visitorWhatsapp(r.whatsapp, r.name)} target="_blank" rel="noopener noreferrer">
          Balas lewat WhatsApp
        </a>
        {r.email && (
          <a className="adm-btn ghost" href={`mailto:${r.email}?subject=${encodeURIComponent("Konsultasi TaxPlus Consulting")}`}>
            Kirim email
          </a>
        )}
      </PageHead>
      <div className="adm-detail">
        <div className="adm-card">
          <dl className="adm-dl">
            {details
              .filter(([, v]) => v)
              .map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
          </dl>
          <h2 style={{ marginTop: 22 }}>Pesan</h2>
          <p className="adm-message">{r.message || <span className="adm-muted">Tidak ada pesan.</span>}</p>
        </div>
        <div className="adm-card">
          <h2>Status</h2>
          <p style={{ marginBottom: 14 }}>
            <span className={STATUS_PILL[r.status]}>{STATUS_LABELS[r.status]}</span>
          </p>
          <div className="adm-form" style={{ gap: 8 }}>
            {consultationStatus.enumValues
              .filter((s) => s !== r.status)
              .map((s) => (
                <form key={s} action={setConsultationStatus.bind(null, r.id, s)}>
                  <button className="adm-btn ghost" style={{ width: "100%" }}>
                    Tandai: {STATUS_LABELS[s].toLowerCase()}
                  </button>
                </form>
              ))}
          </div>
          <hr className="adm-hr" />
          <form action={deleteConsultation.bind(null, r.id)}>
            <button className="adm-btn danger sm">Hapus permintaan ini</button>
          </form>
          <p className="hint adm-muted" style={{ marginTop: 8, fontSize: 13 }}>
            Untuk permintaan penghapusan data dari pengunjung. Tidak bisa dibatalkan.
          </p>
        </div>
      </div>
    </>
  );
}
