import { ConsultLink } from "@/components/sections/ConsultLink";
import { DEFAULT_TOPIC, topicLabel, type TopicSlug } from "@/modules/consultations/topics";
import { whatsappLink } from "@/modules/content/site";

/** The WhatsApp / form pair repeated at the bottom of service, about and article pages. */
export function ContactOptions({
  itemClassName = "op",
  topic = DEFAULT_TOPIC,
}: {
  itemClassName?: string;
  topic?: TopicSlug;
}) {
  const message =
    topic === DEFAULT_TOPIC
      ? "Halo TaxPlus, saya ingin konsultasi."
      : `Halo TaxPlus, saya ingin konsultasi tentang ${topicLabel(topic).split(" — ")[0]}.`;
  return (
    <>
      <a className={itemClassName} href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
        <b>Chat WhatsApp</b>
        <span>Paling cepat, untuk yang sedang memegang surat bertenggat.</span>
      </a>
      <ConsultLink className={itemClassName} topic={topic}>
        <b>Isi formulir 1 menit</b>
        <span>Tuliskan kondisinya, kami balas di hari kerja yang sama.</span>
      </ConsultLink>
    </>
  );
}
