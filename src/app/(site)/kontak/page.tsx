import type { Metadata } from "next";
import { ConsultSection } from "@/components/sections/ConsultSection";
import { DownloadSection } from "@/components/sections/DownloadSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { Mark, PageHero } from "@/components/sections/PageHero";
import { SocialSection } from "@/components/sections/SocialSection";
import { Icon } from "@/components/ui/icons";
import { routes } from "@/modules/content/navigation";
import { getSite, waLink } from "@/modules/content/data";

export async function generateMetadata(): Promise<Metadata> {
  const { contact } = await getSite();
  return {
    title: "Kontak",
    description: `Hubungi TaxPlus Consulting di Bojongsoang, Kabupaten Bandung. Konsultasi awal 15 menit tanpa biaya lewat WhatsApp ${contact.whatsappDisplay} atau datang ke kantor.`,
    alternates: { canonical: routes.contact },
  };
}

export default async function ContactPage() {
  const site = await getSite();
  const { contact } = site;
  const [emailUser, emailDomain] = contact.email.split("@");
  // "Senin–Jumat, sampai pukul 17.00 WIB" → day range in bold, time below.
  const [hoursDays, ...hoursRest] = contact.hours.split(", ");
  const hoursTime = hoursRest.join(", ");
  return (
    <>
      <PageHero
        crumbs={[{ label: "Kontak" }]}
        kicker="Kontak"
        title={
          <>
            Mari bicarakan
            <br />
            <Mark>pajak Anda.</Mark>
          </>
        }
        sub="Konsultasi awal 15 menit tanpa biaya. Datang ke kantor, atau cukup lewat WhatsApp."
        photo="/images/photos/office-reception.jpg"
        blurPhoto
      />
      <section className="soft">
        <div className="in">
          <div className="ccards cc2">
            <a className="cc" href={site.googleReviewUrl} target="_blank" rel="noopener noreferrer">
              <span className="cc-ic">
                <Icon name="pin" size={26} />
              </span>
              <span className="lg-k">Alamat kantor</span>
              <b>{contact.street}</b>
              <span className="cc-d">Kec. Bojongsoang, Kab. Bandung, Jawa Barat 40287</span>
              <span className="cc-go">Buka peta &rarr;</span>
            </a>
            <a className="cc" href={waLink(site)} target="_blank" rel="noopener noreferrer">
              <span className="cc-ic">
                <Icon name="chat" size={26} />
              </span>
              <span className="lg-k">WhatsApp</span>
              <b>{contact.whatsappDisplay}</b>
              <span className="cc-d">Respons tercepat untuk konsultasi awal</span>
              <span className="cc-go">Chat sekarang &rarr;</span>
            </a>
            <a className="cc" href={`mailto:${contact.email}`}>
              <span className="cc-ic">
                <Icon name="mail" size={26} />
              </span>
              <span className="lg-k">Email</span>
              <b className="cc-mail">
                {emailUser}
                <wbr />
                {emailDomain && `@${emailDomain}`}
              </b>
              <span className="cc-d">Untuk dokumen dan penawaran</span>
              <span className="cc-go">Kirim email &rarr;</span>
            </a>
            <div className="cc">
              <span className="cc-ic">
                <Icon name="clock" size={26} />
              </span>
              <span className="lg-k">Jam operasional</span>
              <b>{hoursDays}</b>
              {hoursTime && <span className="cc-d">{hoursTime.charAt(0).toUpperCase() + hoursTime.slice(1)}</span>}
              <span className="cc-go muted">Di luar jam kerja, tinggalkan pesan WhatsApp</span>
            </div>
          </div>
        </div>
      </section>
      <ConsultSection />
      <LocationSection />
      <DownloadSection />
      <SocialSection />
    </>
  );
}
