"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/ui/icons";

/**
 * Green floating "Chat WhatsApp" button (icon only on phones). The opening
 * message follows the page: `links` maps a pathname (service, article) to its WhatsApp link.
 */
export function WhatsAppFloat({ links, fallback }: { links: Record<string, string>; fallback: string }) {
  const pathname = usePathname();
  return (
    <a
      className="wa-float"
      href={links[pathname] ?? fallback}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp TaxPlus"
    >
      <WhatsAppIcon />
      <span>Chat WhatsApp</span>
    </a>
  );
}
