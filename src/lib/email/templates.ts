/* Email templates: inline-styled tables (what mail clients render reliably) plus a plain-text part. */

const NAVY = "#0D2354";
const GOLD = "#F3C913";

export function escapeHtml(text: string) {
  return text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

type Row = [label: string, value: string | undefined | null];

function rowsHtml(rows: Row[]) {
  return rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#5A6378;font-size:13px;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:6px 0;font-size:15px;color:#151B2E;white-space:pre-wrap">${escapeHtml(v!)}</td></tr>`,
    )
    .join("");
}

function rowsText(rows: Row[]) {
  return rows
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
}

function layout({ siteUrl, heading, intro, rows = [], button, footer }: { siteUrl: string; heading: string; intro: string; rows?: Row[]; button?: { href: string; label: string }; footer: string }) {
  return `<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head><body style="margin:0;background:#F4F6FB;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F6FB;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #DDE3EE">
<tr><td style="background:${NAVY};padding:18px 24px;border-bottom:4px solid ${GOLD}"><img src="${siteUrl}/images/logo-white.png" width="130" height="42" alt="TaxPlus Consulting" style="display:block"></td></tr>
<tr><td style="padding:26px 24px 8px"><h1 style="margin:0 0 10px;font-size:21px;line-height:1.3;color:${NAVY}">${escapeHtml(heading)}</h1><p style="margin:0;font-size:15px;line-height:1.6;color:#151B2E">${escapeHtml(intro)}</p></td></tr>
${rows.length ? `<tr><td style="padding:14px 24px 4px"><table role="presentation" cellpadding="0" cellspacing="0">${rowsHtml(rows)}</table></td></tr>` : ""}
${button ? `<tr><td style="padding:18px 24px 6px"><a href="${escapeHtml(button.href)}" style="display:inline-block;background:${GOLD};color:${NAVY};font-weight:bold;font-size:15px;text-decoration:none;padding:12px 20px;border-radius:8px">${escapeHtml(button.label)}</a></td></tr>` : ""}
<tr><td style="padding:22px 24px 24px;font-size:12.5px;line-height:1.6;color:#5A6378">${escapeHtml(footer)}</td></tr>
</table></td></tr></table></body></html>`;
}

export type ConsultationEmailData = {
  name: string;
  company?: string;
  email?: string;
  whatsapp: string;
  topic: string;
  message?: string;
};

export function consultationNotification(d: ConsultationEmailData & { adminUrl: string; siteUrl: string }) {
  const rows: Row[] = [
    ["Nama", d.name],
    ["Perusahaan", d.company],
    ["WhatsApp", d.whatsapp],
    ["Email", d.email],
    ["Kebutuhan", d.topic],
    ["Pesan", d.message],
  ];
  return {
    subject: `Konsultasi baru: ${d.name}${d.company ? ` (${d.company})` : ""}`,
    html: layout({
      siteUrl: d.siteUrl,
      heading: "Permintaan konsultasi baru",
      intro: "Seseorang baru saja mengisi form Konsultasi gratis di situs.",
      rows,
      button: { href: d.adminUrl, label: "Buka di admin" },
      footer: "Email otomatis dari situs TaxPlus Consulting. Balas email ini untuk langsung menjawab pengirim (bila ia mengisi email).",
    }),
    text: `Permintaan konsultasi baru\n\n${rowsText(rows)}\n\nBuka di admin: ${d.adminUrl}`,
  };
}

export function consultationConfirmation(d: ConsultationEmailData & { siteUrl: string; officeWhatsapp: string; whatsappUrl: string }) {
  const first = d.name.split(" ")[0];
  const rows: Row[] = [
    ["Kebutuhan", d.topic],
    ["Pesan", d.message],
  ];
  const intro = `Halo ${first}, terima kasih sudah menghubungi TaxPlus Consulting. Permintaan konsultasi Anda sudah kami terima dan akan kami balas di hari kerja yang sama.`;
  return {
    subject: "Permintaan konsultasi Anda sudah kami terima",
    html: layout({
      siteUrl: d.siteUrl,
      heading: "Terima kasih, permintaan Anda sudah kami terima",
      intro,
      rows,
      button: { href: d.whatsappUrl, label: "Lanjutkan lewat WhatsApp" },
      footer: `Untuk kebutuhan mendesak, hubungi kami di WhatsApp ${d.officeWhatsapp}. Anda menerima email ini karena mengisi form konsultasi di situs TaxPlus Consulting.`,
    }),
    text: `${intro}\n\n${rowsText(rows)}\n\nLanjutkan lewat WhatsApp: ${d.whatsappUrl}\nWhatsApp kantor: ${d.officeWhatsapp}`,
  };
}

export function passwordResetEmail(d: { name: string; resetUrl: string; siteUrl: string }) {
  const intro = `Halo ${d.name.split(" ")[0]}, kami menerima permintaan untuk mengatur ulang kata sandi admin Anda. Tautan berikut berlaku 1 jam dan hanya bisa dipakai sekali.`;
  return {
    subject: "Atur ulang kata sandi admin TaxPlus",
    html: layout({
      siteUrl: d.siteUrl,
      heading: "Atur ulang kata sandi",
      intro,
      button: { href: d.resetUrl, label: "Atur ulang kata sandi" },
      footer: "Bila Anda tidak meminta ini, abaikan email ini. Kata sandi Anda tidak berubah.",
    }),
    text: `${intro}\n\n${d.resetUrl}\n\nBila Anda tidak meminta ini, abaikan email ini.`,
  };
}

export function inviteEmail(d: { name: string; invitedBy: string; role: string; activateUrl: string; hours: number; siteUrl: string }) {
  const intro = `Halo ${d.name.split(" ")[0]}, ${d.invitedBy} mengundang Anda mengelola situs TaxPlus Consulting sebagai ${d.role}. Buat kata sandi Anda lewat tautan berikut. Tautan berlaku ${d.hours} jam dan hanya bisa dipakai sekali.`;
  return {
    subject: "Undangan admin situs TaxPlus Consulting",
    html: layout({
      siteUrl: d.siteUrl,
      heading: "Anda diundang menjadi pengelola situs",
      intro,
      button: { href: d.activateUrl, label: "Aktifkan akun" },
      footer: `Bila tautan sudah kedaluwarsa, minta ${d.invitedBy} mengirim ulang undangan. Bila Anda tidak merasa diundang, abaikan email ini.`,
    }),
    text: `${intro}\n\n${d.activateUrl}`,
  };
}
