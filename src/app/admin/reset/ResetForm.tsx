"use client";

import { useActionState } from "react";
import { PasswordInput } from "@/components/admin/PasswordInput";
import { resetPassword, type FormState } from "@/modules/admin/actions";
import { MIN_PASSWORD_LENGTH } from "@/modules/admin/password";

export function ResetForm({ token }: { token: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(resetPassword, {});
  return (
    <form action={action} className="adm-form">
      <input type="hidden" name="token" value={token} />
      <div className="adm-field">
        <label htmlFor="password">Kata sandi baru</label>
        <PasswordInput id="password" name="password" minLength={MIN_PASSWORD_LENGTH} autoComplete="new-password" required autoFocus />
        <span className="hint">Minimal {MIN_PASSWORD_LENGTH} karakter.</span>
      </div>
      <div className="adm-field">
        <label htmlFor="confirm">Ulangi kata sandi baru</label>
        <PasswordInput id="confirm" name="confirm" autoComplete="new-password" required />
      </div>
      {state.error && (
        <p className="adm-msg err" role="alert">
          {state.error}
        </p>
      )}
      <button className="adm-btn gold" disabled={pending}>
        {pending ? "Menyimpan…" : "Simpan kata sandi baru"}
      </button>
    </form>
  );
}
