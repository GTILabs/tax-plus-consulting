import type { Metadata } from "next";
import { ConsultSection } from "@/components/sections/ConsultSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { Mark, PageHero } from "@/components/sections/PageHero";
import { SocialSection } from "@/components/sections/SocialSection";
import { Icon } from "@/components/ui/icons";
import { routes } from "@/modules/content/navigation";
import { DEFAULT_WA_MESSAGE, mapsLink, site, whatsappLink } from "@/modules/content/site";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Hubungi TaxPlus Consulting di Bojongsoang, Kabupaten Bandung. Konsultasi awal 15 menit tanpa biaya lewat WhatsApp +62 821-2935-0026 atau datang ke kantor.",
  alternates: { canonical: routes.contact },
};

export default function ContactPage() {
  const { contact } = site;
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
      />
      <section className="soft">
        <div className="in">
          <div className="ccards cc2">
            <a className="cc" href={mapsLink} target="_blank" rel="noopener noreferrer">
              <span className="cc-ic">
                <Icon name="pin" size={26} />
              </span>
              <span className="lg-k">Alamat kantor</span>
              <b>{contact.street}</b>
              <span className="cc-d">Kec. Bojongsoang, Kab. Bandung, Jawa Barat 40287</span>
              <span className="cc-go">Buka peta &rarr;</span>
            </a>
            <a className="cc" href={whatsappLink(DEFAULT_WA_MESSAGE)} target="_blank" rel="noopener noreferrer">
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
                info.taxplusconsulting
                <wbr />
                @gmail.com
              </b>
              <span className="cc-d">Untuk dokumen dan penawaran</span>
              <span className="cc-go">Kirim email &rarr;</span>
            </a>
            <div className="cc">
              <span className="cc-ic">
                <Icon name="clock" size={26} />
              </span>
              <span className="lg-k">Jam operasional</span>
              <b>Senin&ndash;Jumat</b>
              <span className="cc-d">Sampai pukul 17.00 WIB</span>
              <span className="cc-go muted">Di luar jam kerja, tinggalkan pesan WhatsApp</span>
            </div>
          </div>
        </div>
      </section>
      <ConsultSection />
      <LocationSection />
      <SocialSection />
    </>
  );
}
