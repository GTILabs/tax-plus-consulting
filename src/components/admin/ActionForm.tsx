"use client";

import { useActionState } from "react";
import type { FormState } from "@/modules/admin/actions";

/** Small form wrapper that shows the action's error/ok message and resets on success. */
export function ActionForm({
  action,
  submitLabel,
  children,
}: {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  submitLabel: string;
  children: React.ReactNode;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  return (
    <form action={formAction} className="adm-form" key={state.ok}>
      {children}
      {state.error && (
        <p className="adm-msg err" role="alert">
          {state.error}
        </p>
      )}
      {state.ok && (
        <p className="adm-msg ok" role="status">
          {state.ok}
        </p>
      )}
      <div>
        <button className="adm-btn" disabled={pending}>
          {pending ? "Menyimpan…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
