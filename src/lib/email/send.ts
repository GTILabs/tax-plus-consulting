import "server-only";

/*
 * Transactional email through the Resend API (installed from the Vercel Marketplace,
 * which sets RESEND_API_KEY). Without a key, emails are logged and skipped so local
 * development and previews keep working.
 */

const DEFAULT_FROM = "TaxPlus Consulting <noreply@taxplus-consulting.co.id>";

export type Email = {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export async function sendEmail(email: Email): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn(`email: RESEND_API_KEY not set, skipped "${email.subject}"`);
    return false;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || DEFAULT_FROM,
      to: email.to,
      subject: email.subject,
      html: email.html,
      text: email.text,
      reply_to: email.replyTo,
    }),
  });
  if (!res.ok) {
    console.error(`email: Resend rejected "${email.subject}" (${res.status})`, await res.text());
    return false;
  }
  return true;
}
