"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { site, whatsappLink } from "@/modules/content/site";

const SHOW_BACK_TO_TOP_AFTER = 400;

/** Floating WhatsApp chat button plus a back-to-top button that appears after scrolling. */
export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > SHOW_BACK_TO_TOP_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <div className="fab">
      <button
        type="button"
        className={showTop ? "fab-top on" : "fab-top"}
        onClick={scrollToTop}
        aria-label="Kembali ke atas"
        tabIndex={showTop ? 0 : -1}
        aria-hidden={!showTop}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 19V6M6 11.5l6-6 6 6" />
        </svg>
      </button>
      <a
        className="fab-wa"
        href={whatsappLink("Halo TaxPlus, saya ingin konsultasi.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat WhatsApp ${site.contact.whatsappDisplay}`}
        title={`WhatsApp ${site.contact.whatsappDisplay}`}
      >
        <WhatsAppIcon />
      </a>
    </div>
  );
}
