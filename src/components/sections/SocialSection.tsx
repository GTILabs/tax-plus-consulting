import { Icon, type IconName } from "@/components/ui/icons";
import { getSite, waLink } from "@/modules/content/data";
import { SectionHead } from "./SectionHead";

/** "Ikuti kami": social media cards. */
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
        <div className={cards.length % 4 !== 0 && cards.length % 3 === 0 ? "sos-grid three" : "sos-grid"}>
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
