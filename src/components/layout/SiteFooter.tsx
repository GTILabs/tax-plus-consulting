import Image from "next/image";
import Link from "next/link";
import { ReviewButton } from "@/components/ui/ReviewButton";
import { Stars } from "@/components/ui/icons";
import { routes, serviceLinks } from "@/modules/content/navigation";
import { mailtoLink, site, whatsappLink } from "@/modules/content/site";

export function SiteFooter() {
  return (
    <footer className="gft">
      <div className="gwrap">
        <div className="g">
          <div>
            <Image src="/images/logo-white.png" alt="TaxPlus Consulting" width={360} height={115} style={{ width: "auto" }} />
            <p>{site.footerBlurb}</p>
          </div>
          <div>
            <h5>Layanan</h5>
            <ul>
              {serviceLinks.map((s) => (
                <li key={s.slug}>
                  <Link href={routes.service(s.slug)}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>Perusahaan</h5>
            <ul>
              <li><Link href={routes.about}>Tentang Kami</Link></li>
              <li><Link href={routes.specialization}>Spesialisasi</Link></li>
              <li><Link href={routes.articles}>Artikel</Link></li>
              <li><Link href={routes.career}>Karier</Link></li>
              <li><Link href={routes.faq}>FAQ Pajak</Link></li>
              <li><Link href={routes.forms}>Formulir Pajak</Link></li>
              <li><Link href={routes.legal}>Legalitas</Link></li>
            </ul>
          </div>
          <div>
            <h5>Kontak</h5>
            <ul>
              <li>
                {site.contact.addressLines.map((line, i) => (
                  <span key={line}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </li>
              <li><a href={whatsappLink()}>{site.contact.whatsappDisplay}</a></li>
              <li><a href={mailtoLink()}>{site.contact.email}</a></li>
            </ul>
          </div>
        </div>
        <div className="rvft">
          <div>
            <b>Sudah pernah kami bantu?</b>
            <span>
              <Stars className="st" />
              Ceritakan pengalaman Anda di Google. Dua kalimat sudah sangat membantu.
            </span>
          </div>
          <div>
            <ReviewButton className="b" />
          </div>
        </div>
        <div className="bot">
          <span>&copy; 2026 TaxPlus Consulting. Seluruh hak cipta dilindungi.</span>
          <span>Izin Praktik Konsultan Pajak A &amp; B &middot; Kuasa Hukum Pengadilan Pajak &middot; Anggota Tetap IKPI</span>
        </div>
      </div>
    </footer>
  );
}
