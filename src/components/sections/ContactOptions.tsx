import Link from "next/link";
import { routes } from "@/modules/content/navigation";
import { whatsappLink } from "@/modules/content/site";

/** The WhatsApp / form pair repeated at the bottom of service, about and article pages. */
export function ContactOptions({ itemClassName = "op" }: { itemClassName?: string }) {
  return (
    <>
      <a className={itemClassName} href={whatsappLink()} target="_blank" rel="noopener noreferrer">
        <b>WhatsApp</b>
        <span>Untuk yang sedang memegang surat bertenggat.</span>
      </a>
      <Link className={itemClassName} href={routes.contact}>
        <b>Formulir</b>
        <span>Tuliskan kondisinya, kami balas di hari kerja yang sama.</span>
      </Link>
    </>
  );
}
