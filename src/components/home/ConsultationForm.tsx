"use client";

import { useState } from "react";
import {
  BUSINESS_SECTORS,
  type ConsultationField,
  type ConsultationFieldErrors,
} from "@/modules/consultations/schema";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; message: string }
  | { kind: "done"; whatsappUrl: string };

export function ConsultationForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<ConsultationFieldErrors>({});

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
      setStatus({ kind: "done", whatsappUrl: json.data.whatsappUrl });
      window.location.href = json.data.whatsappUrl;
    } catch {
      setStatus({ kind: "error", message: "Gagal mengirim. Coba lagi, atau hubungi kami lewat WhatsApp." });
    }
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
      <h3>Jadwalkan konsultasi</h3>
      <div className="sub">Kami hubungi kembali di hari kerja yang sama.</div>
      <div className="fld">
        <label htmlFor="name">Nama lengkap</label>
        <input
          id="name"
          name="name"
          type="text"
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
        <label htmlFor="message">Masalah pajak yang sedang dihadapi</label>
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
        {status.kind === "submitting" ? "Mengirim…" : "Kirim & jadwalkan"}
      </button>
      {status.kind === "error" && (
        <div className="err" role="alert" style={{ textAlign: "center", marginTop: 10 }}>
          {status.message}
        </div>
      )}
      {status.kind === "done" && (
        <div className="note" role="status">
          Membuka WhatsApp&hellip; Tidak terbuka? <a href={status.whatsappUrl}>Klik di sini</a>.
        </div>
      )}
      <div className="note">Data Anda hanya digunakan untuk keperluan konsultasi.</div>
    </form>
  );
}
