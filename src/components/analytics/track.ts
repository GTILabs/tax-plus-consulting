declare global {
  interface Window {
    gtag?: (command: "event", name: string, params?: Record<string, string | number>) => void;
  }
}

/** GA4 event; a no-op when GA isn't loaded (no measurement ID, blocked by the browser). */
export function trackEvent(name: string, params?: Record<string, string | number>) {
  window.gtag?.("event", name, params);
}
