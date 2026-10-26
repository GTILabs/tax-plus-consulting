import { ConsultationForm } from "@/components/consultation/ConsultationForm";
import { consultationTopics } from "@/modules/consultations/topics";
import { getServices, getSite, waLink } from "@/modules/content/data";
import { SectionHead } from "./SectionHead";

/** "Konsultasi gratis" (navy): text left, form right. */
export async function ConsultSection() {
  const [site, services] = await Promise.all([getSite(), getServices()]);
  return (
    <section className="dark" id="konsultasi">
      <div className="in split">
        <div>
          <SectionHead
            title="Konsultasi gratis"
            sub="Ceritakan kebutuhan Anda, kami balas di hari kerja yang sama."
            variant="on-dark"
            left
          />
          <p className="lead" style={{ marginTop: 14 }}>
            Untuk kebutuhan mendesak, seperti SP2DK dengan batas waktu dekat, langsung hubungi kami lewat WhatsApp.
          </p>
        </div>
        <ConsultationForm topics={consultationTopics(services)} whatsappHref={waLink(site)} />
      </div>
    </section>
  );
}
