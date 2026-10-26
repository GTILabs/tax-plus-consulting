import { getSite, waLink } from "@/modules/content/data";

/** Yellow CTA strip with a navy WhatsApp button. */
export async function CtaBand({
  title = "Diskusikan kebutuhan pajak perusahaan Anda",
  waMessage,
}: {
  title?: string;
  waMessage?: string;
}) {
  const site = await getSite();
  return (
    <div className="ctaband">
      <div className="in">
        <h2>{title}</h2>
        <a className="btn btn-navy" href={waLink(site, waMessage)} target="_blank" rel="noopener noreferrer">
          Hubungi via WhatsApp
        </a>
      </div>
    </div>
  );
}
