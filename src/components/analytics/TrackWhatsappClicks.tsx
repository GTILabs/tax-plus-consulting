"use client";

import { useEffect } from "react";
import { trackEvent } from "./track";

/** Sends a `whatsapp_click` event for every wa.me link on the site, with the page it was clicked on. */
export function TrackWhatsappClicks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href^='https://wa.me/']");
      if (link) trackEvent("whatsapp_click", { page_path: window.location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
