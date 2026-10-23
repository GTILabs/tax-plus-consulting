import { Icon, type IconName } from "@/components/ui/icons";
import { DEFAULT_WA_MESSAGE, mapsLink, site, socialProfiles, whatsappLink } from "@/modules/content/site";
import { SectionHead } from "./SectionHead";

/** "Ikuti kami": social media cards. */
export function SocialSection() {
  const cards: { name: string; handle: string; url: string; icon: IconName }[] = [
    ...socialProfiles.map((p) => ({ name: p.label, handle: p.handle, url: p.url, icon: p.id as IconName })),
    { name: "WhatsApp", handle: site.contact.whatsappDisplay, url: whatsappLink(DEFAULT_WA_MESSAGE), icon: "chat" },
    { name: "Google", handle: `${site.rating.score} dari ulasan Google`, url: mapsLink, icon: "star" },
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
      </div>
    </section>
  );
}
