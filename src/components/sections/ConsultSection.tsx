import { ConsultationForm } from "@/components/consultation/ConsultationForm";
import { Icon, Tick } from "@/components/ui/icons";
import { consultationTopics } from "@/modules/consultations/topics";
import { getServices, getSite, waLink } from "@/modules/content/data";
import { SectionHead } from "./SectionHead";

const promises = ["Konsultasi awal 15 menit tanpa biaya", "Ditangani langsung oleh konsultan pajak berizin", "Kerahasiaan data Anda terjaga"];

/** "Konsultasi gratis" (navy): promises and the urgent-case WhatsApp card left, form right. */
export async function ConsultSection() {
  const [site, services] = await Promise.all([getSite(), getServices()]);
  const whatsappHref = waLink(site);
  return (
    <section className="dark" id="konsultasi">
      <div className="in split">
        <div className="cs-intro">
          <SectionHead
            title="Konsultasi gratis"
            sub={
              <>
                Ceritakan kebutuhan Anda, kami balas <b className="cs-hl">di hari kerja yang sama</b>.
              </>
            }
            variant="on-dark"
            left
          />
          <ul className="cs-list">
            {promises.map((p) => (
              <li key={p}>
                <span className="cs-tick" aria-hidden="true">
                  <Tick color="currentColor" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="cs-urgent">
            <span className="cs-urgent-i" aria-hidden="true">
              <Icon name="chat" size={26} />
            </span>
            <div>
              <span className="cs-urgent-k">Kebutuhan mendesak?</span>
              <p>SP2DK dengan batas waktu dekat?</p>
              <a className="btn cs-urgent-btn" href={whatsappHref} target="_blank" rel="noopener noreferrer">
                Langsung hubungi kami lewat WhatsApp <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
        <ConsultationForm topics={consultationTopics(services)} whatsappHref={whatsappHref} />
      </div>
    </section>
  );
}
