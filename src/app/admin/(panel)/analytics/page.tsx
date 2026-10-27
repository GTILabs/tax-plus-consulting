import Link from "next/link";
import { BarList } from "@/components/admin/analytics/BarList";
import { TrendChart } from "@/components/admin/analytics/TrendChart";
import { PageHead } from "@/components/admin/PageHead";
import { ga4Config } from "@/lib/ga4/client";
import { getOverview, getRealtime, RANGES, type RangeDays } from "@/lib/ga4/reports";
import { requireAdmin } from "@/modules/admin/session";

export const metadata = { title: "Analitik" };

const num = new Intl.NumberFormat("id-ID");
const pct = new Intl.NumberFormat("id-ID", { style: "percent", maximumFractionDigits: 1 });
const duration = (s: number) => `${Math.floor(s / 60)}m ${String(Math.round(s % 60)).padStart(2, "0")}d`;

const KPIS = [
  { key: "activeUsers", label: "Pengguna", format: num.format },
  { key: "newUsers", label: "Pengguna baru", format: num.format },
  { key: "sessions", label: "Sesi", format: num.format },
  { key: "screenPageViews", label: "Tampilan halaman", format: num.format },
  { key: "averageSessionDuration", label: "Durasi rata-rata sesi", format: duration },
  { key: "engagementRate", label: "Engagement rate", format: pct.format },
] as const;

const DEVICE_LABELS: Record<string, string> = { mobile: "Ponsel", desktop: "Desktop", tablet: "Tablet" };

function Delta({ value, previous }: { value: number; previous: number }) {
  if (!previous) return <small className="adm-delta">{value ? "Baru pada periode ini" : "—"}</small>;
  const change = (value - previous) / previous;
  const up = change >= 0;
  return (
    <small className={up ? "adm-delta up" : "adm-delta down"}>
      <span aria-hidden="true">{up ? "▲" : "▼"}</span> {up ? "naik" : "turun"} {pct.format(Math.abs(change))} dari periode sebelumnya
    </small>
  );
}

function Stat({ label, value, previous, format }: { label: string; value: number; previous: number; format: (n: number) => string }) {
  return (
    <div className="adm-card adm-kpi">
      <span>{label}</span>
      <b>{format(value)}</b>
      <Delta value={value} previous={previous} />
    </div>
  );
}

function SetupGuide() {
  return (
    <div className="adm-card adm-setup">
      <h2>Hubungkan Google Analytics</h2>
      <p>Dasbor ini membaca data dari properti GA4 situs lewat Google Analytics Data API. Yang perlu diatur di Vercel:</p>
      <ol>
        <li>
          <code>NEXT_PUBLIC_GA_MEASUREMENT_ID</code>: ID pengukuran web stream (format <code>G-XXXXXXXXXX</code>), untuk mulai merekam kunjungan.
        </li>
        <li>
          <code>GA4_PROPERTY_ID</code>: ID properti (angka) dari GA → Admin → Property details.
        </li>
        <li>
          <code>GA4_CREDENTIALS</code>: isi file JSON kunci service account dari Google Cloud (Analytics Data API diaktifkan). Tambahkan email service account
          sebagai <b>Viewer</b> di GA → Admin → Property access management.
        </li>
      </ol>
    </div>
  );
}

export default async function AnalyticsPage({ searchParams }: PageProps<"/admin/analytics">) {
  await requireAdmin("analytics");
  const config = ga4Config();
  const { hari } = await searchParams;
  const days = (Number(hari) in RANGES ? Number(hari) : 28) as RangeDays;
  const gaLink = config ? `https://analytics.google.com/analytics/web/#/p${config.propertyId}/reports/intelligenthome` : null;

  let data: Awaited<ReturnType<typeof getOverview>> | null = null;
  let realtime: Awaited<ReturnType<typeof getRealtime>> | null = null;
  let error: string | null = null;
  if (config) {
    try {
      [data, realtime] = await Promise.all([getOverview(days), getRealtime()]);
    } catch (e) {
      console.error("analytics", e);
      error = e instanceof Error && /PERMISSION_DENIED|403/.test(e.message)
        ? "Service account belum punya akses ke properti GA4. Tambahkan emailnya sebagai Viewer di GA → Admin → Property access management."
        : "Data Google Analytics tidak bisa dimuat. Coba muat ulang beberapa saat lagi.";
    }
  }

  return (
    <>
      <PageHead title="Analitik" sub="Kunjungan situs dari Google Analytics 4.">
        {gaLink && (
          <a className="adm-btn ghost" href={gaLink} target="_blank" rel="noopener noreferrer">
            Buka Google Analytics ↗
          </a>
        )}
      </PageHead>
      {!config && <SetupGuide />}
      {error && (
        <p className="adm-msg err" role="alert">
          {error}
        </p>
      )}
      {data && realtime && (
        <>
          <div className="adm-an-top">
            <div className="adm-tabs" role="tablist" aria-label="Rentang waktu">
              {(Object.keys(RANGES) as unknown as RangeDays[]).map((d) => (
                <Link key={d} href={`/admin/analytics?hari=${d}`} className={Number(d) === days ? "on" : undefined} aria-current={Number(d) === days ? "page" : undefined}>
                  {RANGES[d]} terakhir
                </Link>
              ))}
            </div>
            <div className="adm-live">
              <span className="pulse" aria-hidden="true" />
              <b>{num.format(realtime.activeUsers)}</b> pengguna aktif dalam 30 menit terakhir
            </div>
          </div>
          <div className="adm-kpis">
            {KPIS.map((k) => (
              <Stat key={k.key} label={k.label} format={k.format} {...data.kpi[k.key]} />
            ))}
            <Stat label="Klik WhatsApp" format={num.format} {...data.conversions.whatsapp} />
            <Stat label="Form konsultasi terkirim" format={num.format} {...data.conversions.leads} />
          </div>
          <div className="adm-card" style={{ marginTop: 18 }}>
            <h2>Pengguna aktif per hari</h2>
            <TrendChart data={data.trend} />
          </div>
          <div className="adm-an-grid">
            <div className="adm-card">
              <h2>Halaman teratas</h2>
              <BarList items={data.pages} unit="tampilan" />
            </div>
            <div className="adm-card">
              <h2>Channel</h2>
              <BarList items={data.channels} unit="sesi" />
            </div>
            <div className="adm-card">
              <h2>Sumber</h2>
              <BarList items={data.sources} unit="sesi" />
            </div>
            <div className="adm-card">
              <h2>Kota</h2>
              <BarList items={data.cities} unit="pengguna" />
            </div>
            <div className="adm-card">
              <h2>Perangkat</h2>
              <BarList items={data.devices.map((d) => ({ ...d, label: DEVICE_LABELS[d.label] ?? d.label }))} unit="pengguna" />
            </div>
            <div className="adm-card">
              <h2>Sedang dibuka</h2>
              <BarList items={realtime.pages} unit="pengguna aktif" />
            </div>
          </div>
        </>
      )}
    </>
  );
}
