"use client";

import { useEffect, useRef, useState } from "react";
import {
  BUSINESS_SECTORS,
  type ConsultationField,
  type ConsultationFieldErrors,
} from "@/modules/consultations/schema";
import {
  CONSULTATION_TOPICS,
  DEFAULT_TOPIC,
  isTopicSlug,
  TOPIC_EVENT,
  type TopicSlug,
} from "@/modules/consultations/topics";
import { site, whatsappLink } from "@/modules/content/site";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; message: string }
  | { kind: "done"; name: string; saved: boolean; whatsappUrl: string };

const topicGroups = [...new Set(CONSULTATION_TOPICS.map((t) => t.group))];

export function ConsultationForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<ConsultationFieldErrors>({});
  const topicRef = useRef<HTMLSelectElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  // Pre-select the topic from `?topik=` links and from CTAs on this page.
  useEffect(() => {
    const select = (topic: TopicSlug, focus: boolean) => {
      if (topicRef.current) topicRef.current.value = topic;
      if (focus) nameRef.current?.focus({ preventScroll: true });
    };
    const fromUrl = new URLSearchParams(window.location.search).get("topik");
    if (isTopicSlug(fromUrl)) select(fromUrl, false);
    const onTopic = (e: Event) => {
      const topic = (e as CustomEvent<string>).detail;
      if (isTopicSlug(topic)) select(topic, true);
    };
    window.addEventListener(TOPIC_EVENT, onTopic);
    return () => window.removeEventListener(TOPIC_EVENT, onTopic);
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
      setStatus({
        kind: "done",
        name: String(form.get("name") ?? "").trim(),
        saved: Boolean(json.data.saved),
        whatsappUrl: json.data.whatsappUrl,
      });
    } catch {
      setStatus({ kind: "error", message: "Gagal mengirim. Coba lagi, atau langsung hubungi kami lewat WhatsApp." });
    }
  }

  if (status.kind === "done") {
    return (
      <div className="form form-done" role="status" aria-live="polite">
        <div className="done-ic" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </div>
        {status.saved ? (
          <>
            <h3>Terima kasih{status.name ? `, ${status.name.split(" ")[0]}` : ""}. Permintaan Anda sudah kami terima.</h3>
            <p>
              Kami hubungi lewat WhatsApp di hari kerja yang sama ({site.contact.hours}). Konsultasi pertama 15 menit,
              tanpa biaya.
            </p>
          </>
        ) : (
          <>
            <h3>Satu langkah lagi.</h3>
            <p>Sistem kami sedang sibuk. Kirim ringkasan permintaan Anda lewat WhatsApp agar langsung kami terima.</p>
          </>
        )}
        <a className="btn btn-y" href={status.whatsappUrl} target="_blank" rel="noopener noreferrer">
          {status.saved ? "Percepat lewat WhatsApp" : "Kirim lewat WhatsApp"}
        </a>
        <button type="button" className="done-again" onClick={() => setStatus({ kind: "idle" })}>
          Kirim permintaan lain
        </button>
      </div>
    );
  }

  const fieldError = (field: ConsultationField) =>
    errors[field]?.[0] ? (
      <div className="err" id={`${field}-error`} role="alert">
        {errors[field]![0]}
      </div>
    ) : null;
  const describedBy = (field: ConsultationField) => (errors[field] ? `${field}-error` : undefined);

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <h3>Jadwalkan konsultasi gratis</h3>
      <div className="sub">Isi 1 menit. Kami hubungi kembali di hari kerja yang sama.</div>
      <div className="fld">
        <label htmlFor="topic">Kebutuhan Anda</label>
        <select
          id="topic"
          name="topic"
          ref={topicRef}
          defaultValue={DEFAULT_TOPIC}
          aria-invalid={Boolean(errors.topic)}
          aria-describedby={describedBy("topic")}
        >
          {topicGroups.map((group) => (
            <optgroup key={group} label={group}>
              {CONSULTATION_TOPICS.filter((t) => t.group === group).map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        {fieldError("topic")}
      </div>
      <div className="fld">
        <label htmlFor="name">Nama lengkap</label>
        <input
          id="name"
          name="name"
          type="text"
          ref={nameRef}
          placeholder="Nama Anda"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={describedBy("name")}
        />
        {fieldError("name")}
      </div>
      <div className="fld">
        <label htmlFor="whatsapp">Nomor WhatsApp</label>
        <input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          inputMode="tel"
          placeholder="08xx-xxxx-xxxx"
          autoComplete="tel"
          aria-invalid={Boolean(errors.whatsapp)}
          aria-describedby={describedBy("whatsapp")}
        />
        {fieldError("whatsapp")}
      </div>
      <div className="fld">
        <label htmlFor="sector">Jenis usaha</label>
        <select
          id="sector"
          name="sector"
          defaultValue=""
          aria-invalid={Boolean(errors.sector)}
          aria-describedby={describedBy("sector")}
        >
          <option value="" disabled>
            Pilih sektor usaha
          </option>
          {BUSINESS_SECTORS.map((sector) => (
            <option key={sector}>{sector}</option>
          ))}
        </select>
        {fieldError("sector")}
      </div>
      <div className="fld">
        <label htmlFor="message">Ceritakan singkat kondisinya</label>
        <textarea
          id="message"
          name="message"
          placeholder="Contoh: menerima SP2DK, omzet lewat Rp4,8 M, belum pernah lapor SPT Badan, dll."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message")}
        />
        {fieldError("message")}
      </div>
      <button className="btn btn-y" type="submit" disabled={status.kind === "submitting"}>
        {status.kind === "submitting" ? "Mengirim…" : "Kirim & jadwalkan konsultasi"}
      </button>
      {status.kind === "error" && (
        <div className="err" role="alert" style={{ textAlign: "center", marginTop: 10 }}>
          {status.message}{" "}
          <a href={whatsappLink("Halo TaxPlus, saya ingin konsultasi.")} target="_blank" rel="noopener noreferrer">
            Buka WhatsApp
          </a>
        </div>
      )}
      <ul className="trust">
        <li>Gratis 15 menit</li>
        <li>Tanpa komitmen</li>
        <li>Dibalas hari kerja yang sama</li>
      </ul>
      <div className="note">Data Anda hanya digunakan untuk keperluan konsultasi.</div>
    </form>
  );
}
