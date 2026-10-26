"use client";

import { useState } from "react";
import { deleteAdminUser } from "@/modules/admin/actions";

/** Trash icon in the user list; a second click confirms. The Server Action re-checks the permission. */
export function DeleteUserButton({ id, name }: { id: string; name: string }) {
  const [confirming, setConfirming] = useState(false);
  if (!confirming) {
    return (
      <button type="button" className="adm-btn danger icon sm" onClick={() => setConfirming(true)} aria-label={`Hapus ${name}`} title="Hapus pengguna">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />
        </svg>
      </button>
    );
  }
  return (
    <form action={deleteAdminUser} className="adm-confirm">
      <input type="hidden" name="id" value={id} />
      <span>Hapus?</span>
      <button className="adm-btn danger sm">Ya</button>
      <button type="button" className="adm-btn ghost sm" onClick={() => setConfirming(false)}>
        Batal
      </button>
    </form>
  );
}
