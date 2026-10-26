"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { deleteEntry, saveEntry, saveSettings, type SaveResult } from "@/modules/cms/actions";
import type { Field } from "@/modules/cms/fields";
import { FieldInput, type Errors } from "./FieldInput";

type Data = Record<string, unknown>;

/** Form state shared by both editors: values, server errors, dirty flag and the leave-page guard. */
function useEditorState(initial: Data) {
  const [data, setData] = useState<Data>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [dirty, setDirty] = useState(false);
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  const set = (name: string, value: unknown) => {
    setData((d) => ({ ...d, [name]: value }));
    setDirty(true);
    setMessage(null);
  };
  const apply = (result: SaveResult, okText: string) => {
    if (result.ok) {
      setErrors({});
      setDirty(false);
      setMessage({ kind: "ok", text: okText });
    } else {
      setErrors(result.fieldErrors ?? {});
      setMessage({ kind: "err", text: result.error });
    }
  };
  return { data, set, errors, message, dirty, apply, setDirty };
}

function Fields({ fields, data, set, errors }: { fields: readonly Field[]; data: Data; set: (n: string, v: unknown) => void; errors: Errors }) {
  return (
    <div className="adm-card adm-form">
      {fields.map((f) => (
        <FieldInput key={f.name} field={f} value={data[f.name]} path={f.name} errors={errors} onChange={(v) => set(f.name, v)} />
      ))}
    </div>
  );
}

export function EntryEditor({
  collection,
  singular,
  fields,
  drafts,
  canDelete,
  initial,
}: {
  collection: string;
  singular: string;
  fields: readonly Field[];
  drafts: boolean;
  canDelete: boolean;
  initial: { id: string | null; data: Data; status: "draft" | "published" };
}) {
  const router = useRouter();
  const state = useEditorState(initial.data);
  const [status, setStatus] = useState(initial.status);
  const [pending, start] = useTransition();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const save = (nextStatus = status) =>
    start(async () => {
      const result = await saveEntry({ collection, id: initial.id, data: state.data, status: nextStatus });
      state.apply(result, nextStatus === "draft" ? "Tersimpan sebagai draf." : "Tersimpan dan tampil di situs.");
      if (result.ok) {
        setStatus(nextStatus);
        if (!initial.id && result.id) router.replace(`/admin/content/${collection}/${result.id}?saved=1`);
        else router.refresh();
      }
    });

  const remove = () =>
    start(async () => {
      await deleteEntry(collection, initial.id!);
      state.setDirty(false);
      router.replace(`/admin/content/${collection}`);
    });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save();
      }}
    >
      <Fields fields={fields} data={state.data} set={state.set} errors={state.errors} />
      <div className="adm-savebar">
        {state.message && (
          <p className={`adm-msg ${state.message.kind}`} role={state.message.kind === "err" ? "alert" : "status"}>
            {state.message.text}
          </p>
        )}
        {!state.message && state.dirty && <span className="adm-muted adm-dirty">Ada perubahan yang belum disimpan</span>}
        {initial.id &&
          canDelete &&
          (confirmDelete ? (
            <>
              <span className="adm-muted">Hapus {singular} ini?</span>
              <button type="button" className="adm-btn danger" disabled={pending} onClick={remove}>
                Ya, hapus
              </button>
              <button type="button" className="adm-btn ghost" onClick={() => setConfirmDelete(false)}>
                Batal
              </button>
            </>
          ) : (
            <button type="button" className="adm-btn danger" onClick={() => setConfirmDelete(true)}>
              Hapus
            </button>
          ))}
        {drafts && (
          <button type="button" className="adm-btn ghost" disabled={pending} onClick={() => save("draft")}>
            {status === "published" && initial.id ? "Jadikan draf" : "Simpan draf"}
          </button>
        )}
        <button type="button" className="adm-btn gold" disabled={pending} onClick={() => save("published")}>
          {pending ? "Menyimpan…" : drafts && status === "draft" ? "Terbitkan" : "Simpan"}
        </button>
      </div>
    </form>
  );
}

export function SettingsEditor({ settingsKey, fields, initial }: { settingsKey: string; fields: readonly Field[]; initial: Data }) {
  const router = useRouter();
  const state = useEditorState(initial);
  const [pending, start] = useTransition();
  const save = () =>
    start(async () => {
      const result = await saveSettings({ key: settingsKey, data: state.data });
      state.apply(result, "Tersimpan dan tampil di situs.");
      if (result.ok) router.refresh();
    });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save();
      }}
    >
      <Fields fields={fields} data={state.data} set={state.set} errors={state.errors} />
      <div className="adm-savebar">
        {state.message && (
          <p className={`adm-msg ${state.message.kind}`} role={state.message.kind === "err" ? "alert" : "status"}>
            {state.message.text}
          </p>
        )}
        {!state.message && state.dirty && <span className="adm-muted adm-dirty">Ada perubahan yang belum disimpan</span>}
        <button className="adm-btn gold" disabled={pending}>
          {pending ? "Menyimpan…" : "Simpan"}
        </button>
      </div>
    </form>
  );
}
