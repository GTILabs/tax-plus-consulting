"use client";

import { useActionState } from "react";
import { PasswordInput } from "@/components/admin/PasswordInput";
import { login, type FormState } from "@/modules/admin/actions";

export function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(login, {});
  return (
    <form action={action} className="adm-form">
      <input type="hidden" name="next" value={next} />
      <div className="adm-field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="username" required autoFocus />
      </div>
      <div className="adm-field">
        <label htmlFor="password">Kata sandi</label>
        <PasswordInput id="password" name="password" autoComplete="current-password" required />
      </div>
      {state.error && (
        <p className="adm-msg err" role="alert">
          {state.error}
        </p>
      )}
      <button className="adm-btn gold" disabled={pending}>
        {pending ? "Memeriksa…" : "Masuk"}
      </button>
    </form>
  );
}
