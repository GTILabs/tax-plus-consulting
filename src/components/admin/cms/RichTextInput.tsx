"use client";

import { useEffect, useRef, useState } from "react";

type Action = "p" | "h3" | "bold" | "italic" | "ul" | "ol" | "link" | "box" | "clear";

const COMMANDS: { action: Action; label: string; title: string; className?: string }[] = [
  { action: "p", label: "¶", title: "Paragraf" },
  { action: "h3", label: "H", title: "Subjudul" },
  { action: "bold", label: "B", title: "Tebal", className: "b" },
  { action: "italic", label: "I", title: "Miring", className: "i" },
  { action: "ul", label: "•", title: "Daftar berbutir" },
  { action: "ol", label: "1.", title: "Daftar bernomor" },
  { action: "link", label: "🔗", title: "Tautan" },
  { action: "box", label: "▭", title: "Kotak catatan kuning" },
  { action: "clear", label: "⌫", title: "Hapus format" },
];

/**
 * Lightweight WYSIWYG editor for article bodies. Produces the same HTML the
 * article page styles (.ar-body): paragraphs, subheadings, lists, links and the
 * yellow note box. The server sanitizes the result on save.
 */
export function RichTextInput({ id, value, onChange, invalid }: { id: string; value: string; onChange: (html: string) => void; invalid?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [source, setSource] = useState(false);
  const [link, setLink] = useState<string | null>(null);
  const savedRange = useRef<Range | null>(null);

  // Set the HTML only when it changes from outside (initial load, source mode), never while typing.
  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) ref.current.innerHTML = value;
  }, [value, source]);

  const emit = () => ref.current && onChange(ref.current.innerHTML);
  const exec = (command: string, arg?: string) => {
    ref.current?.focus();
    document.execCommand(command, false, arg);
    emit();
  };

  /** Wraps the block around the cursor in the note box, or unwraps it. */
  const toggleBox = () => {
    const root = ref.current;
    const sel = window.getSelection();
    if (!root || !sel?.rangeCount) return;
    let node: Node | null = sel.getRangeAt(0).startContainer;
    while (node && node.parentNode !== root) node = node.parentNode;
    if (!node || !(node instanceof HTMLElement || node instanceof Text)) return;
    if (node instanceof HTMLElement && node.classList.contains("ar-box")) {
      node.replaceWith(...Array.from(node.childNodes));
    } else {
      const box = document.createElement("div");
      box.className = "ar-box";
      node.replaceWith(box);
      box.append(node instanceof Text ? Object.assign(document.createElement("p"), { textContent: node.textContent }) : node);
    }
    emit();
  };

  const openLink = () => {
    const sel = window.getSelection();
    savedRange.current = sel?.rangeCount ? sel.getRangeAt(0).cloneRange() : null;
    setLink("https://");
  };
  const applyLink = () => {
    const sel = window.getSelection();
    if (savedRange.current && sel) {
      sel.removeAllRanges();
      sel.addRange(savedRange.current);
    }
    if (link && link !== "https://") exec("createLink", link);
    setLink(null);
  };

  const run = (action: Action) => {
    if (action === "p") exec("formatBlock", "<p>");
    else if (action === "h3") exec("formatBlock", "<h3>");
    else if (action === "bold") exec("bold");
    else if (action === "italic") exec("italic");
    else if (action === "ul") exec("insertUnorderedList");
    else if (action === "ol") exec("insertOrderedList");
    else if (action === "link") openLink();
    else if (action === "box") toggleBox();
    else exec("removeFormat");
  };

  return (
    <div className={invalid ? "adm-rte invalid" : "adm-rte"}>
      <div className="adm-rte-bar" role="toolbar" aria-label="Format teks">
        {!source &&
          COMMANDS.map((c) => (
            <button key={c.action} type="button" title={c.title} aria-label={c.title} className={c.className} onMouseDown={(e) => e.preventDefault()} onClick={() => run(c.action)}>
              {c.label}
            </button>
          ))}
        <button type="button" className="src" aria-pressed={source} onClick={() => setSource((s) => !s)}>
          {source ? "Kembali ke editor" : "HTML"}
        </button>
      </div>
      {link !== null && (
        <div className="adm-rte-link">
          <input
            type="url"
            value={link}
            autoFocus
            onChange={(e) => setLink(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                applyLink();
              }
              if (e.key === "Escape") setLink(null);
            }}
            aria-label="Alamat tautan"
          />
          <button type="button" className="adm-btn sm" onClick={applyLink}>
            Pasang
          </button>
          <button type="button" className="adm-btn ghost sm" onClick={() => setLink(null)}>
            Batal
          </button>
        </div>
      )}
      {source ? (
        <textarea id={id} className="adm-rte-src" value={value} onChange={(e) => onChange(e.target.value)} spellCheck={false} />
      ) : (
        <div id={id} ref={ref} className="adm-rte-area ar-body" contentEditable suppressContentEditableWarning onInput={emit} onBlur={emit} role="textbox" aria-multiline="true" />
      )}
    </div>
  );
}
