import "server-only";

import sanitizeHtml from "sanitize-html";
import type { Field } from "./fields";

/* What the article stylesheet knows how to render (see .ar-body in site.css). */
const options: sanitizeHtml.IOptions = {
  allowedTags: ["p", "h2", "h3", "h4", "b", "strong", "i", "em", "u", "s", "a", "br", "ul", "ol", "li", "blockquote", "div", "table", "thead", "tbody", "tr", "th", "td", "hr"],
  allowedAttributes: { a: ["href", "target", "rel"], div: ["class"], table: ["class"], th: ["colspan", "rowspan"], td: ["colspan", "rowspan"] },
  allowedClasses: { div: ["ar-box"], table: ["ar-tbl"] },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  transformTags: {
    // External links open in a new tab; internal ones stay as plain links.
    a: (tagName, attribs) => {
      const href = attribs.href ?? "";
      const attrs: sanitizeHtml.Attributes = /^https?:/.test(href) ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };
      return { tagName, attribs: attrs };
    },
  },
  exclusiveFilter: (frame) => ["p", "h2", "h3", "h4", "li"].includes(frame.tag) && !frame.text.trim() && !frame.mediaChildren.length,
};

export function sanitizeRichText(html: string) {
  return sanitizeHtml(html, options).trim();
}

/** Sanitizes every rich text value in the data, including inside object lists. */
export function sanitizeData(fields: readonly Field[], data: Record<string, unknown>) {
  const out: Record<string, unknown> = { ...data };
  for (const f of fields) {
    if (f.type === "richtext" && typeof out[f.name] === "string") out[f.name] = sanitizeRichText(out[f.name] as string);
    if (f.type === "objects" && Array.isArray(out[f.name])) {
      out[f.name] = (out[f.name] as Record<string, unknown>[]).map((item) => sanitizeData(f.fields, item));
    }
  }
  return out;
}
