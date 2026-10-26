"use client";

import { useState } from "react";
import { emptyData, type Field, type FileValue, type ImageValue, type LeafField, type ObjectsField } from "@/modules/cms/fields";
import { RichTextInput } from "./RichTextInput";
import { uploadFile, uploadImage } from "./uploads";

export type Errors = Record<string, string>;

type Props<F extends Field = Field> = {
  field: F;
  value: unknown;
  onChange: (value: unknown) => void;
  /** Dotted path of this field, used to match server errors ("steps.0.title"). */
  path: string;
  errors: Errors;
};

function move<T>(list: T[], from: number, to: number) {
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function Label({ field, htmlFor }: { field: Field; htmlFor?: string }) {
  const content = (
    <>
      {field.label}
      {field.required && <span className="req"> *</span>}
    </>
  );
  return htmlFor ? <label htmlFor={htmlFor}>{content}</label> : <span className="lbl">{content}</span>;
}

/** One field: label, input, hint and error. */
export function FieldInput(props: Props) {
  const { field, path, errors } = props;
  const id = `f-${path.replace(/\./g, "-")}`;
  const error = errors[path];
  const groupLabel = field.type === "list" || field.type === "objects" || field.type === "image" || field.type === "file";
  if (field.type === "boolean") {
    return (
      <div className="adm-field">
        <label className="adm-check">
          <input type="checkbox" checked={props.value === true} onChange={(e) => props.onChange(e.target.checked)} />
          {field.label}
        </label>
        {field.hint && <span className="hint">{field.hint}</span>}
      </div>
    );
  }
  return (
    <div className={field.type === "objects" ? "adm-field adm-field-objects" : "adm-field"}>
      <Label field={field} htmlFor={groupLabel ? undefined : id} />
      {field.hint && <span className="hint">{field.hint}</span>}
      <Control {...props} id={id} invalid={!!error} />
      {error && <span className="adm-ferr">{error}</span>}
    </div>
  );
}

function Control({ field, value, onChange, path, errors, id, invalid }: Props & { id: string; invalid: boolean }) {
  const str = typeof value === "string" ? value : "";
  const common = { id, "aria-invalid": invalid || undefined };
  switch (field.type) {
    case "text":
      return <input {...common} type="text" value={str} maxLength={field.max} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} />;
    case "url":
      return <input {...common} type="url" value={str} placeholder={field.placeholder ?? "https://"} onChange={(e) => onChange(e.target.value)} />;
    case "textarea":
      return <textarea {...common} value={str} rows={field.rows ?? 4} maxLength={field.max} onChange={(e) => onChange(e.target.value)} />;
    case "date":
      return <input {...common} type="date" value={str} onChange={(e) => onChange(e.target.value)} />;
    case "number":
      return (
        <input
          {...common}
          type="number"
          value={typeof value === "number" ? value : 0}
          min={field.min}
          max={field.max}
          step={field.step ?? 1}
          onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
        />
      );
    case "color":
      return (
        <div className="adm-inline">
          <input {...common} type="color" value={str || "#ffffff"} onChange={(e) => onChange(e.target.value)} />
          <input type="text" value={str} placeholder="#0D2354" onChange={(e) => onChange(e.target.value)} aria-label={`${field.label} (hex)`} style={{ maxWidth: 140 }} />
        </div>
      );
    case "select":
      return (
        <select {...common} value={str} onChange={(e) => onChange(e.target.value)}>
          {field.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      );
    case "richtext":
      return <RichTextInput id={id} value={str} onChange={onChange} invalid={invalid} />;
    case "image":
      return <ImageControl value={value as ImageValue | null} onChange={onChange} label={field.label} />;
    case "file":
      return <FileControl value={value as FileValue | null} onChange={onChange} accept={field.accept} />;
    case "list":
      return <ListControl value={Array.isArray(value) ? (value as string[]) : []} onChange={onChange} itemLabel={field.itemLabel ?? "item"} label={field.label} />;
    case "objects":
      return <ObjectsControl field={field} value={Array.isArray(value) ? (value as Record<string, unknown>[]) : []} onChange={onChange} path={path} errors={errors} />;
    case "boolean":
      return null;
  }
}

function ImageControl({ value, onChange, label }: { value: ImageValue | null; onChange: (v: unknown) => void; label: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const pick = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      onChange(await uploadImage(file));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload gagal.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="adm-upload">
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element -- preview of an arbitrary uploaded file
        <img src={value.src} alt="" className="adm-upload-prev" />
      ) : (
        <div className="adm-upload-prev empty">Belum ada gambar</div>
      )}
      <div className="adm-upload-act">
        <label className={busy ? "adm-btn ghost sm disabled" : "adm-btn ghost sm"}>
          {busy ? "Mengunggah…" : value ? "Ganti gambar" : "Pilih gambar"}
          <input type="file" accept="image/*" hidden disabled={busy} onChange={(e) => pick(e.target.files?.[0])} aria-label={label} />
        </label>
        {value && !busy && (
          <button type="button" className="adm-btn danger sm" onClick={() => onChange(null)}>
            Hapus
          </button>
        )}
        {value && (
          <span className="hint">
            {value.width}×{value.height} px
          </span>
        )}
        {error && <span className="adm-ferr">{error}</span>}
      </div>
    </div>
  );
}

function FileControl({ value, onChange, accept }: { value: FileValue | null; onChange: (v: unknown) => void; accept?: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const pick = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      onChange(await uploadFile(file));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload gagal.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="adm-upload-act">
      {value && (
        <a href={value.url} target="_blank" rel="noopener noreferrer" className="adm-file">
          {value.name || value.url.split("/").pop()} · {value.sizeKb} KB
        </a>
      )}
      <label className={busy ? "adm-btn ghost sm disabled" : "adm-btn ghost sm"}>
        {busy ? "Mengunggah…" : value ? "Ganti file" : "Pilih file"}
        <input type="file" accept={accept} hidden disabled={busy} onChange={(e) => pick(e.target.files?.[0])} />
      </label>
      {error && <span className="adm-ferr">{error}</span>}
    </div>
  );
}

function ItemTools({ index, count, onMove, onRemove, noun }: { index: number; count: number; onMove: (to: number) => void; onRemove: () => void; noun: string }) {
  return (
    <span className="adm-item-tools">
      <button type="button" className="adm-btn ghost icon sm" disabled={index === 0} onClick={() => onMove(index - 1)} aria-label={`Naikkan ${noun}`}>
        ↑
      </button>
      <button type="button" className="adm-btn ghost icon sm" disabled={index === count - 1} onClick={() => onMove(index + 1)} aria-label={`Turunkan ${noun}`}>
        ↓
      </button>
      <button type="button" className="adm-btn danger icon sm" onClick={onRemove} aria-label={`Hapus ${noun}`}>
        ✕
      </button>
    </span>
  );
}

function ListControl({ value, onChange, itemLabel, label }: { value: string[]; onChange: (v: unknown) => void; itemLabel: string; label: string }) {
  return (
    <div className="adm-list">
      {value.map((item, i) => (
        <div key={i} className="adm-list-row">
          <input type="text" value={item} onChange={(e) => onChange(value.map((v, j) => (j === i ? e.target.value : v)))} aria-label={`${label} ${i + 1}`} />
          <ItemTools index={i} count={value.length} noun={itemLabel} onMove={(to) => onChange(move(value, i, to))} onRemove={() => onChange(value.filter((_, j) => j !== i))} />
        </div>
      ))}
      <button type="button" className="adm-btn ghost sm adm-add" onClick={() => onChange([...value, ""])}>
        + Tambah {itemLabel}
      </button>
    </div>
  );
}

function ObjectsControl({ field, value, onChange, path, errors }: { field: ObjectsField; value: Record<string, unknown>[]; onChange: (v: unknown) => void; path: string; errors: Errors }) {
  const noun = field.itemLabel ?? "item";
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const titleOf = (item: Record<string, unknown>, i: number) => {
    const t = field.titleField ? item[field.titleField] : undefined;
    return typeof t === "string" && t.trim() ? t : `${noun[0].toUpperCase()}${noun.slice(1)} ${i + 1}`;
  };
  return (
    <div className="adm-objs">
      {value.map((item, i) => {
        const hasError = Object.keys(errors).some((k) => k.startsWith(`${path}.${i}.`));
        return (
          <details key={i} className={hasError ? "adm-obj invalid" : "adm-obj"} open={openIndex === i || hasError}>
            <summary onClick={(e) => (e.preventDefault(), setOpenIndex(openIndex === i ? null : i))}>
              <span className="adm-obj-n">{i + 1}</span>
              <span className="adm-obj-t">{titleOf(item, i)}</span>
              <span onClick={(e) => e.stopPropagation()}>
                <ItemTools
                  index={i}
                  count={value.length}
                  noun={noun}
                  onMove={(to) => {
                    onChange(move(value, i, to));
                    setOpenIndex(openIndex === i ? to : openIndex);
                  }}
                  onRemove={() => onChange(value.filter((_, j) => j !== i))}
                />
              </span>
            </summary>
            <div className="adm-obj-body">
              {field.fields.map((sub: LeafField) => (
                <FieldInput
                  key={sub.name}
                  field={sub}
                  value={item[sub.name]}
                  path={`${path}.${i}.${sub.name}`}
                  errors={errors}
                  onChange={(v) => onChange(value.map((it, j) => (j === i ? { ...it, [sub.name]: v } : it)))}
                />
              ))}
            </div>
          </details>
        );
      })}
      <button
        type="button"
        className="adm-btn ghost sm adm-add"
        onClick={() => {
          onChange([...value, emptyData(field.fields)]);
          setOpenIndex(value.length);
        }}
      >
        + Tambah {noun}
      </button>
    </div>
  );
}
