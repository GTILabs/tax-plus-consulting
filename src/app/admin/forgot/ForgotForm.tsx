"use client";

import { useActionState } from "react";
import { requestPasswordReset, type FormState } from "@/modules/admin/actions";

export function ForgotForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(requestPasswordReset, {});
  if (state.ok) {
    return (
      <p className="adm-msg ok" role="status">
        {state.ok}
      </p>
    );
  }
  return (
    <form action={action} className="adm-form">
      <div className="adm-field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="username" required autoFocus />
      </div>
      {state.error && (
        <p className="adm-msg err" role="alert">
          {state.error}
        </p>
      )}
      <button className="adm-btn gold" disabled={pending}>
        {pending ? "Mengirim…" : "Kirim tautan"}
      </button>
    </form>
  );
}
