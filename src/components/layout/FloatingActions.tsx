"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ConsultLink } from "@/components/sections/ConsultLink";
import { WhatsAppIcon } from "@/components/ui/icons";
import { site, whatsappLink } from "@/modules/content/site";

const SHOW_AFTER = 400;
const WA_MESSAGE = "Halo TaxPlus, saya ingin konsultasi.";

/**
 * Desktop: floating WhatsApp button. Phones: a bottom CTA bar (consultation +
 * WhatsApp) that hides while the consultation form is on screen. Both show a
 * back-to-top button after scrolling.
 */
export function FloatingActions() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The form only exists on the homepage; re-check after each navigation.
  useEffect(() => {
    const form = document.getElementById("kontak");
    if (!form) return;
    const observer = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), {
      threshold: 0.15,
    });
    observer.observe(form);
    return () => {
      observer.disconnect();
      setFormVisible(false);
    };
  }, [pathname]);

  function scrollToTop() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  const barOn = scrolled && !formVisible;

  return (
    <>
      <div className={barOn ? "fab bar-on" : "fab"}>
        <button
          type="button"
          className={scrolled ? "fab-top on" : "fab-top"}
          onClick={scrollToTop}
          aria-label="Kembali ke atas"
          tabIndex={scrolled ? 0 : -1}
          aria-hidden={!scrolled}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 19V6M6 11.5l6-6 6 6" />
          </svg>
        </button>
        <a
          className="fab-wa"
          href={whatsappLink(WA_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chat WhatsApp ${site.contact.whatsappDisplay}`}
          title={`WhatsApp ${site.contact.whatsappDisplay}`}
        >
          <WhatsAppIcon />
        </a>
      </div>

      {/* `inert` keeps the hidden bar out of the tab order and the accessibility tree. */}
      <div className={barOn ? "mbar on" : "mbar"} inert={!barOn}>
        <a
          className="mbar-wa"
          href={whatsappLink(WA_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chat WhatsApp ${site.contact.whatsappDisplay}`}
        >
          <WhatsAppIcon />
          <span>Chat</span>
        </a>
        <ConsultLink className="mbar-cta">Konsultasi gratis &middot; 15 menit</ConsultLink>
      </div>
    </>
  );
}
