import { ConsultLink } from "@/components/sections/ConsultLink";
import { BrandIcon } from "@/components/ui/icons";
import { DEFAULT_TOPIC, type TopicSlug } from "@/modules/consultations/topics";
import { whatsappLink } from "@/modules/content/site";

/** Closing call to action: schedule a free consultation (primary) or chat on WhatsApp (secondary). */
export function ConsultBand({
  title = "Ceritakan dulu masalahnya. Solusinya belakangan.",
  text = "Konsultasi pertama 15 menit, tanpa biaya dan tanpa komitmen. Kami tidak menawarkan paket sebelum memahami kondisi Anda.",
  topic = DEFAULT_TOPIC,
}: {
  title?: string;
  text?: string;
  topic?: TopicSlug;
}) {
  return (
    <section className="cband" aria-labelledby="cband-title">
      <div className="gwrap">
        <div className="cband-in">
          <div>
            <h2 id="cband-title">{title}</h2>
            <p>{text}</p>
            <ul className="cband-trust">
              <li>Gratis 15 menit</li>
              <li>Tanpa komitmen</li>
              <li>Dibalas hari kerja yang sama</li>
            </ul>
          </div>
          <div className="cband-acts">
            <ConsultLink className="cband-btn" topic={topic}>
              Jadwalkan konsultasi gratis
            </ConsultLink>
            <a
              className="cband-wa"
              href={whatsappLink("Halo TaxPlus, saya ingin konsultasi.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BrandIcon name="whatsapp" /> Chat WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
