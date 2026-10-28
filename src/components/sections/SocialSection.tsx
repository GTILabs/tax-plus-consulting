import { Icon, type IconName } from "@/components/ui/icons";
import { getSite, waLink } from "@/modules/content/data";
import { SectionHead } from "./SectionHead";

/** Company documents offered for download below the social cards; files live in public/unduhan. */
const downloads = [
  { title: "Company Profile 2026", meta: "PDF · 18 halaman · 2,6 MB", href: "/unduhan/Company_Profile_TaxPlus_Consulting_2026.pdf" },
  { title: "Brosur TaxPlus 2026", meta: "PDF · brosur lipat · 506 KB", href: "/unduhan/Brosur_Lipat_TaxPlus_Consulting_2026.pdf" },
];

/** "Ikuti kami": social media cards, then the company profile and brochure to download. */
export async function SocialSection() {
  const site = await getSite();
  const cards: { name: string; handle: string; url: string; icon: IconName }[] = [
    ...site.social.map((p) => ({ name: p.label, handle: p.handle, url: p.url, icon: p.id as IconName })),
    { name: "WhatsApp", handle: site.contact.whatsappDisplay, url: waLink(site), icon: "chat" },
    { name: "Google", handle: `${site.rating.score} dari ulasan Google`, url: site.googleReviewUrl, icon: "star" },
  ];
  return (
    <section className="sos">
      <div className="in">
        <SectionHead title="Ikuti kami" sub="Informasi perpajakan terkini, ringkas dan mudah dipahami." />
        <div className="sos-grid">
          {cards.map((c) => (
            <a key={c.name} className="sos-c" href={c.url} target="_blank" rel="noopener noreferrer">
              <span className="sos-i">
                <Icon name={c.icon} size={28} />
              </span>
              <b>{c.name}</b>
              <span>{c.handle}</span>
            </a>
          ))}
        </div>
        <div className="sos-dl">
          {downloads.map((d) => (
            <a key={d.href} className="sos-d" href={d.href} download>
              <span className="sos-i">
                <Icon name="doc" size={26} />
              </span>
              <span className="sos-d-t">
                <b>{d.title}</b>
                <span>{d.meta}</span>
              </span>
              <span className="sos-d-go" aria-hidden="true">
                <Icon name="download" size={20} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
