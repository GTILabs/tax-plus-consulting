import Image from "next/image";
import Link from "next/link";
import { MemberLogos } from "@/components/sections/MemberLogos";
import { Icon, type IconName } from "@/components/ui/icons";
import { routes, serviceLinks } from "@/modules/content/navigation";
import { DEFAULT_WA_MESSAGE, licenses, site, socialProfiles, whatsappLink } from "@/modules/content/site";

const legalChips = [
  { label: "Izin Praktik A", value: licenses.practiceA },
  { label: "Izin Praktik B", value: licenses.practiceB },
  { label: "Kuasa Hukum Pengadilan Pajak", value: licenses.taxCourt },
  { label: "Anggota IKPI", value: licenses.ikpiMember },
];

/** Cached so pages stay prerendered; refreshed with the default cache lifetime. */
async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function SiteFooter() {
  const year = await currentYear();
  return (
    <footer className="site">
      <div className="in">
        <div className="cols">
          <div>
            <Image src="/images/logo.png" alt="TaxPlus Consulting" width={360} height={115} style={{ width: "auto" }} />
            <div className="ft-tag">
              <span>Kantor konsultan pajak di Bandung.</span>
              <em>&ldquo;{site.tagline}&rdquo;</em>
            </div>
            <div className="member">
              <span className="m-lbl">Member of</span>
              <MemberLogos />
            </div>
          </div>
          <div>
            <h4>Layanan</h4>
            {serviceLinks.map((s) => (
              <Link key={s.slug} href={routes.service(s.slug)}>
                {s.name}
              </Link>
            ))}
          </div>
          <div>
            <h4>Perusahaan</h4>
            <Link href={routes.about}>Tentang Kami</Link>
            <Link href={routes.career}>Karier</Link>
            <Link href={routes.articles}>Artikel</Link>
            <Link href={routes.contact}>Kontak</Link>
          </div>
          <div>
            <h4>Kontak</h4>
            <ul className="ft-ct">
              <li>
                <span className="fi">
                  <Icon name="pin" size={18} strokeWidth={1.8} />
                </span>
                <span>{site.contact.addressShort}</span>
              </li>
              <li>
                <span className="fi">
                  <Icon name="chat" size={18} strokeWidth={1.8} />
                </span>
                <a href={whatsappLink(DEFAULT_WA_MESSAGE)} target="_blank" rel="noopener noreferrer">
                  {site.contact.whatsappDisplay}
                </a>
              </li>
              <li>
                <span className="fi">
                  <Icon name="mail" size={18} strokeWidth={1.8} />
                </span>
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              </li>
              <li>
                <span className="fi">
                  <Icon name="clock" size={18} strokeWidth={1.8} />
                </span>
                <span>{site.contact.hours}</span>
              </li>
            </ul>
            <div className="ft-soc">
              {socialProfiles.map((p) => (
                <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`${p.label} TaxPlus`}>
                  <Icon name={p.id as IconName} size={18} strokeWidth={1.8} />
                </a>
              ))}
              <a href={whatsappLink(DEFAULT_WA_MESSAGE)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp TaxPlus">
                <Icon name="chat" size={18} strokeWidth={1.8} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="legal2">
        <div className="in l2">
          <div className="l2-left">
            <span>&copy; {year} TaxPlus Consulting</span>
            <span className="dot" />
            <span>Seluruh hak dilindungi</span>
            <span className="dot" />
            <Link href={routes.privacy}>Kebijakan Privasi</Link>
          </div>
          <div className="l2-right">
            {legalChips.map((c) => (
              <span key={c.label} className="lc">
                <small>{c.label}</small>
                {c.value}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
