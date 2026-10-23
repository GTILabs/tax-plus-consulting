"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/ui/icons";
import { DEFAULT_WA_MESSAGE, whatsappLink } from "@/modules/content/site";

/**
 * Green floating "Chat WhatsApp" button (icon only on phones). The opening
 * message follows the page: `messages` maps a pathname (service, article) to its text.
 */
export function WhatsAppFloat({ messages }: { messages: Record<string, string> }) {
  const pathname = usePathname();
  return (
    <a
      className="wa-float"
      href={whatsappLink(messages[pathname] ?? DEFAULT_WA_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp TaxPlus"
    >
      <WhatsAppIcon />
      <span>Chat WhatsApp</span>
    </a>
  );
}
