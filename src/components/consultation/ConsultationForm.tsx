"use client";

import { useEffect, useRef, useState } from "react";
import type { ConsultationField, ConsultationFieldErrors } from "@/modules/consultations/schema";
import { CONSULTATION_TOPICS, DEFAULT_TOPIC, isTopicSlug } from "@/modules/consultations/topics";
import { DEFAULT_WA_MESSAGE, whatsappLink } from "@/modules/content/site";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; message: string }
  | { kind: "done"; name: string; whatsappUrl: string };

/**
 * "Konsultasi gratis" form. The request is stored, then turned into a complete
 * WhatsApp message the visitor sends to the office.
 */
export function ConsultationForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<ConsultationFieldErrors>({});
  const topicRef = useRef<HTMLSelectElement>(null);

  // Pre-select "Kebutuhan" from `?topik=` links.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("topik");
    if (isTopicSlug(fromUrl) && topicRef.current) topicRef.current.value = fromUrl;
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus({ kind: "submitting" });
    setErrors({});

    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form)),
      });
      const json = await res.json();
      if (res.status === 422) {
        setErrors(json.fieldErrors ?? {});
        setStatus({ kind: "idle" });
        return;
      }
      if (!res.ok) throw new Error(json.error ?? "Request failed");
      setStatus({ kind: "done", name: String(form.get("name") ?? "").trim(), whatsappUrl: json.data.whatsappUrl });
    } catch {
      setStatus({ kind: "error", message: "Gagal mengirim. Coba lagi, atau langsung hubungi kami lewat WhatsApp." });
    }
  }

  if (status.kind === "done") {
    const firstName = status.name.split(" ")[0];
    return (
      <div className="f f-done" role="status" aria-live="polite">
        <span className="f-done-ic" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12l5 5L20 6" />
          </svg>
        </span>
        <h3>Pesan Anda siap{firstName ? `, ${firstName}` : ""}.</h3>
        <p>Kirim lewat WhatsApp agar langsung kami terima. Kami balas di hari kerja yang sama.</p>
        <a className="btn btn-gold" href={status.whatsappUrl} target="_blank" rel="noopener noreferrer">
          Kirim lewat WhatsApp &rarr;
        </a>
        <button type="button" className="f-again" onClick={() => setStatus({ kind: "idle" })}>
          Isi ulang form
        </button>
      </div>
    );
  }

  const fieldError = (field: ConsultationField) =>
    errors[field]?.[0] ? (
      <span className="err" id={`${field}-error`} role="alert">
        {errors[field]![0]}
      </span>
    ) : null;
  const a11y = (field: ConsultationField) => ({
    "aria-invalid": Boolean(errors[field]),
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });

  return (
    <form className="f" onSubmit={onSubmit} noValidate>
      <div className="two">
        <label>
          Nama
          <input name="name" required autoComplete="name" {...a11y("name")} />
          {fieldError("name")}
        </label>
        <label>
          Perusahaan
          <input name="company" autoComplete="organization" {...a11y("company")} />
          {fieldError("company")}
        </label>
      </div>
      <div className="two">
        <label>
          Email
          <input name="email" type="email" autoComplete="email" {...a11y("email")} />
          {fieldError("email")}
        </label>
        <label>
          WhatsApp
          <input name="whatsapp" type="tel" inputMode="tel" required autoComplete="tel" placeholder="08xx-xxxx-xxxx" {...a11y("whatsapp")} />
          {fieldError("whatsapp")}
        </label>
      </div>
      <label>
        Kebutuhan
        <select name="topic" ref={topicRef} defaultValue={DEFAULT_TOPIC} {...a11y("topic")}>
          {CONSULTATION_TOPICS.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.label}
            </option>
          ))}
        </select>
        {fieldError("topic")}
      </label>
      <label>
        Ceritakan singkat
        <textarea name="message" rows={3} {...a11y("message")} />
        {fieldError("message")}
      </label>
      <button className="btn btn-gold" type="submit" disabled={status.kind === "submitting"}>
        {status.kind === "submitting" ? "Mengirim…" : "Kirim permintaan konsultasi"}
      </button>
      {status.kind === "error" ? (
        <p className="formnote err" role="alert">
          {status.message}{" "}
          <a href={whatsappLink(DEFAULT_WA_MESSAGE)} target="_blank" rel="noopener noreferrer">
            Buka WhatsApp
          </a>
        </p>
      ) : (
        <p className="formnote">Pesan disusun otomatis untuk dikirim lewat WhatsApp. Data hanya dipakai untuk keperluan konsultasi.</p>
      )}
    </form>
  );
}
