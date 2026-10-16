import { BrandIcon } from "@/components/ui/icons";
import { site, socialProfiles, whatsappLink } from "@/modules/content/site";

/** Icon links to the office's social profiles plus WhatsApp. `tone` matches a dark or light background. */
export function SocialLinks({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const links = [
    ...socialProfiles.map((p) => ({
      id: p.id,
      href: p.url,
      label: p.handle ? `${p.label} ${p.handle}` : p.label,
    })),
    { id: "whatsapp" as const, href: whatsappLink(), label: `WhatsApp ${site.contact.whatsappDisplay}` },
  ];

  return (
    <ul className={`social social-${tone}`} aria-label="Media sosial TaxPlus Consulting">
      {links.map((l) => (
        <li key={l.id}>
          <a href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label} title={l.label}>
            <BrandIcon name={l.id} />
          </a>
        </li>
      ))}
    </ul>
  );
}
