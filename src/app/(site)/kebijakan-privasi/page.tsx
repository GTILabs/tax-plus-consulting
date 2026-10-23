import type { Metadata } from "next";
import { Mark, PageHero } from "@/components/sections/PageHero";
import { routes } from "@/modules/content/navigation";
import { site } from "@/modules/content/site";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: "Cara TaxPlus Consulting mengumpulkan, memakai, dan melindungi data yang Anda kirim melalui situs ini.",
  alternates: { canonical: routes.privacy },
};

/* Draft for review by Pak Kalam before launch (brief: "Halaman Kebijakan Privasi tersedia"). */
export default function PrivacyPage() {
  const { contact } = site;
  return (
    <>
      <PageHero
        crumbs={[{ label: "Kebijakan Privasi" }]}
        kicker="Kebijakan Privasi"
        title={
          <>
            Data Anda,
            <br />
            <Mark>kami jaga.</Mark>
          </>
        }
        sub="Cara kami mengumpulkan, memakai, dan melindungi data yang Anda kirim melalui situs ini."
      />
      <div className="in">
        <article className="ar-wrap ar-body pv">
          <h3>Data yang kami kumpulkan</h3>
          <p>
            Saat Anda mengisi form konsultasi, kami menerima nama, nama perusahaan, email, nomor WhatsApp, kebutuhan
            layanan, dan pesan yang Anda tulis. Kami juga mencatat statistik kunjungan secara anonim (halaman yang
            dibuka dan kecepatan muat) untuk memperbaiki situs. Statistik ini tidak memakai cookie pelacak dan tidak
            mengidentifikasi Anda secara pribadi.
          </p>
          <h3>Untuk apa data dipakai</h3>
          <ul>
            <li>Menghubungi Anda kembali dan menyiapkan konsultasi awal.</li>
            <li>Menyusun penawaran bila Anda meminta layanan lanjutan.</li>
            <li>Memenuhi kewajiban hukum dan kode etik profesi konsultan pajak.</li>
          </ul>
          <p>Kami tidak menjual atau menyewakan data Anda, dan tidak memakainya untuk iklan.</p>
          <h3>Penyimpanan dan kerahasiaan</h3>
          <p>
            Data form disimpan di basis data dengan akses terbatas dan hanya dibuka oleh tim yang menangani permintaan
            Anda. Seluruh tim terikat kewajiban kerahasiaan profesi. Data disimpan selama diperlukan untuk tujuan di
            atas, lalu dihapus.
          </p>
          <h3>Layanan pihak ketiga</h3>
          <p>
            Situs ini memuat peta Google Maps dan tautan ke WhatsApp, Instagram, dan TikTok. Saat Anda memakai layanan
            tersebut, kebijakan privasi masing-masing penyedia yang berlaku.
          </p>
          <h3>Hak Anda</h3>
          <p>
            Anda dapat meminta salinan, perbaikan, atau penghapusan data yang pernah Anda kirim kepada kami. Kirim
            permintaan ke <a href={`mailto:${contact.email}`}>{contact.email}</a> atau WhatsApp {contact.whatsappDisplay}.
          </p>
          <h3>Kontak</h3>
          <p>
            {site.name}, {contact.addressFull}.
          </p>
          <p className="ar-note">Kebijakan ini dapat diperbarui sewaktu-waktu. Versi terbaru selalu tersedia di halaman ini.</p>
        </article>
      </div>
    </>
  );
}
