import { Icon } from "@/components/ui/icons";
import { getSite, waLink } from "@/modules/content/data";
import { SectionHead } from "./SectionHead";

/** "Lokasi kantor": Google Maps embed + navy office panel. */
export async function LocationSection() {
  const site = await getSite();
  const { contact } = site;
  return (
    <section className="soft loc">
      <div className="in">
        <SectionHead title="Lokasi kantor" sub="Datang langsung, atau buat janji temu lebih dulu." />
        <div className="loc-box">
          <div className="map">
            <iframe
              src={site.mapsEmbedUrl}
              title="Peta lokasi kantor TaxPlus Consulting"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="loc-info">
            <h3>Kantor TaxPlus Consulting</h3>
            <ul>
              <li>
                <Icon name="pin" size={20} strokeWidth={1.8} />
                <span>{contact.addressFull}</span>
              </li>
              <li>
                <Icon name="chat" size={20} strokeWidth={1.8} />
                <span>{contact.whatsappDisplay} (WhatsApp)</span>
              </li>
              <li>
                <Icon name="mail" size={20} strokeWidth={1.8} />
                <span>{contact.email}</span>
              </li>
              <li>
                <Icon name="clock" size={20} strokeWidth={1.8} />
                <span>{contact.hours}</span>
              </li>
            </ul>
            <div className="loc-btns">
              <a
                className="btn btn-gold"
                href={waLink(site, "Halo TaxPlus, saya ingin membuat janji temu di kantor.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Hubungi via WhatsApp
              </a>
              <a
                className="btn btn-line"
                style={{ color: "#fff", borderColor: "rgba(255,255,255,.4)" }}
                href={site.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Petunjuk arah
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
