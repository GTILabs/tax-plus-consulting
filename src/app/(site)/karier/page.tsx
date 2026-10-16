import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { StagingNote, StagingOnly } from "@/components/ui/StagingNote";
import { routes } from "@/modules/content/navigation";
import { mailtoLink, site } from "@/modules/content/site";

export const metadata: Metadata = {
  title: "Karier",
  description:
    "Bergabung dengan TaxPlus Consulting: posisi Tax Staff dan program magang di Bandung, belajar pajak dari perkara nyata.",
  alternates: { canonical: routes.career },
};

type Job = {
  title: string;
  meta: string[];
  summary: string;
  columns: { heading: string; items: React.ReactNode[] }[];
  applyLabel: string;
  applySubject: string;
  hint: string;
};

const jobs: Job[] = [
  {
    title: "Tax Staff",
    meta: ["Penuh waktu", "Bandung"],
    summary:
      "Mengerjakan pelaporan rutin klien di bawah bimbingan Reviewer, dan ikut menyiapkan berkas saat ada pemeriksaan.",
    columns: [
      {
        heading: "Yang akan Anda kerjakan",
        items: [
          "Menghitung dan melaporkan PPh Masa dan PPN lewat Coretax",
          "Menyusun SPT Tahunan dan kertas kerjanya",
          "Menyiapkan dokumen saat klien diperiksa",
        ],
      },
      {
        heading: "Yang kami cari",
        items: [
          "D-III atau S-1 Akuntansi, Perpajakan, atau Hukum",
          "Brevet A & B, atau bersedia mengambilnya",
          "Teliti pada angka, dan berani bertanya ketika ada yang janggal",
        ],
      },
    ],
    applyLabel: "Lamar posisi ini",
    applySubject: "Lamaran Tax Staff",
    hint: `Kirim CV ke ${site.contact.email}`,
  },
  {
    title: "Program Magang",
    meta: ["3–6 bulan", "Bandung", "Mahasiswa aktif"],
    summary:
      "Bukan magang fotokopi. Peserta kami beri tanggung jawab nyata dengan target yang jelas, pada salah satu dari tiga jalur.",
    columns: [
      {
        heading: "Jalur yang tersedia",
        items: [
          <><b>Perpajakan</b> &mdash; pelaporan dan pembukuan klien</>,
          <><b>Riset &amp; konten</b> &mdash; menulis artikel dan materi edukasi pajak</>,
          <><b>Pengembangan bisnis</b> &mdash; riset prospek dan komunikasi klien</>,
        ],
      },
      {
        heading: "Yang kami cari",
        items: [
          "Mahasiswa semester 5 ke atas",
          "Bisa hadir di kantor minimal tiga hari per minggu",
          "Mau bertanya ketika tidak tahu",
        ],
      },
    ],
    applyLabel: "Daftar magang",
    applySubject: "Pendaftaran Program Magang",
    hint: "Sebutkan jalur yang diminati di badan email",
  },
];

const selection = [
  { title: "Seleksi berkas", text: "Kabar dalam 5 hari kerja." },
  { title: "Tes singkat", text: "Soal perpajakan dasar, dikerjakan di rumah." },
  { title: "Wawancara", text: "Bersama Managing Partner, membahas cara Anda berpikir." },
];

export default function CareerPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Karier" }]} />
      <div className="pg-career">
        <header className="xh">
          <div className="gwrap">
            <span className="xeb">Karier</span>
            <h1>Bergabung dengan TaxPlus Consulting</h1>
            <p>
              Kami mencari orang yang ingin belajar pajak dari perkara nyata. Yang bergabung di sini ikut menangani
              langsung pelaporan klien, pemeriksaan, dan sengketa.
            </p>
          </div>
        </header>

        <section className="xs">
          <div className="gwrap">
            <div className="xk">Posisi terbuka</div>
            <h2>Dua posisi yang sedang kami buka</h2>
            <div className="jobs" style={{ marginTop: 20 }}>
              {jobs.map((job) => (
                <div className="job" key={job.title}>
                  <div className="top">
                    <h3>{job.title}</h3>
                    <div className="meta">
                      {job.meta.map((m) => (
                        <span className="m" key={m}>{m}</span>
                      ))}
                    </div>
                  </div>
                  <p>{job.summary}</p>
                  <div className="cols">
                    {job.columns.map((col) => (
                      <div key={col.heading}>
                        <h4>{col.heading}</h4>
                        <ul>
                          {col.items.map((item, i) => (
                            <li key={i}>
                              <i />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="act">
                    <a className="btn2" href={mailtoLink(job.applySubject)}>
                      {job.applyLabel}
                    </a>
                    <span className="hint">{job.hint}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="xp" style={{ marginTop: 22, fontSize: 15, color: "var(--mut)" }}>
              Belum ada yang cocok? Kirim tetap CV Anda &mdash; kami simpan dan hubungi ketika posisinya terbuka.
            </p>
          </div>
        </section>

        <StagingOnly>
          <section className="xs tb">
            <div className="gwrap">
              <div className="xk">Cerita alumni</div>
              <h2>Kata mereka yang pernah di sini</h2>
              <p className="xsub">Ditulis sendiri oleh alumni magang dan mantan tim kami, tanpa disunting.</p>
              <div className="vals">
                <div className="val">
                  <b>&ldquo;[Kutipan pengalaman]&rdquo;</b>
                  <span>[Nama] &mdash; Alumni Magang, jalur [Perpajakan], [tahun]</span>
                </div>
                <div className="val">
                  <b>&ldquo;[Kutipan pengalaman]&rdquo;</b>
                  <span>[Nama] &mdash; Alumni Magang, jalur [Riset &amp; Konten], [tahun]</span>
                </div>
                <div className="val">
                  <b>&ldquo;[Kutipan pengalaman]&rdquo;</b>
                  <span>[Nama] &mdash; [Posisi], [tahun]</span>
                </div>
              </div>
              <StagingNote className="xnote">
                <b>Untuk diisi.</b> Minta dua sampai tiga alumni magang menuliskan pengalaman mereka dalam 2&ndash;3
                kalimat, lalu pasang di sini dengan nama dan jalurnya. Ini cara yang benar untuk membangun reputasi
                sebagai tempat kerja &mdash; bukan lewat ulasan Google, yang kebijakannya melarang ulasan dari pihak yang
                bukan pelanggan dan dari karyawan sendiri.
              </StagingNote>
            </div>
          </section>
        </StagingOnly>

        <section className="xs">
          <div className="gwrap">
            <div className="xk">Proses seleksi</div>
            <h2>Tiga langkah, sekitar dua minggu</h2>
            <p className="xsub">Setiap pelamar mendapat jawaban, termasuk yang belum kami lanjutkan.</p>
            <div className="flow cols3">
              {selection.map((s, i) => (
                <div className="fl" key={s.title}>
                  <div className="n">{i + 1}</div>
                  <b>{s.title}</b>
                  <span>{s.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
