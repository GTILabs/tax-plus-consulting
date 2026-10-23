import { DEFAULT_WA_MESSAGE, whatsappLink } from "@/modules/content/site";

/** Yellow CTA strip with a navy WhatsApp button. */
export function CtaBand({
  title = "Diskusikan kebutuhan pajak perusahaan Anda",
  waMessage = DEFAULT_WA_MESSAGE,
}: {
  title?: string;
  waMessage?: string;
}) {
  return (
    <div className="ctaband">
      <div className="in">
        <h2>{title}</h2>
        <a className="btn btn-navy" href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer">
          Hubungi via WhatsApp
        </a>
      </div>
    </div>
  );
}
