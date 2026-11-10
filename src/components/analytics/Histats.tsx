"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    _Hasync?: unknown[][];
  }
}

/** Histats site 5050768, counter style 137 (from the Histats "async, div with counter" snippet). */
const START = "1,5050768,4,137,112,33,00011111";

/**
 * Histats visit counter for the public footer. The script fills #histats_counter with the
 * counter badge. Next.js changes pages without a full reload, so each later page change
 * pushes another `track_hits` to count it as a page view.
 */
export function Histats() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    window._Hasync?.push(["Histats.track_hits", ""]);
  }, [pathname]);

  return (
    <>
      <div id="histats_counter" className="histats" />
      <Script id="histats" strategy="lazyOnload">
        {`window._Hasync=window._Hasync||[];_Hasync.push(['Histats.start','${START}']);_Hasync.push(['Histats.fasi','1']);_Hasync.push(['Histats.track_hits','']);(function(){var hs=document.createElement('script');hs.async=true;hs.src='https://s10.histats.com/js15_as.js';(document.head||document.body).appendChild(hs);})();`}
      </Script>
    </>
  );
}
