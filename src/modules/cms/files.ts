/**
 * Files uploaded through the CMS live on Vercel Blob, another origin, where the
 * `download` attribute is ignored and the browser opens the file in a tab instead;
 * `?download=1` makes Blob send them as an attachment. Local paths pass through.
 */
export function downloadHref(url: string) {
  return url.includes(".blob.vercel-storage.com/") ? `${url}${url.includes("?") ? "&" : "?"}download=1` : url;
}
