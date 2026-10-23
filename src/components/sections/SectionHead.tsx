type Variant = "on-dark" | "on-gold";

/**
 * Centered section title with the thin yellow "highlighter" block behind the
 * lower half of the text, plus a one-line subtitle.
 */
export function SectionHead({
  title,
  sub,
  variant,
  left = false,
  pills = false,
}: {
  title: React.ReactNode;
  sub?: React.ReactNode;
  variant?: Variant;
  left?: boolean;
  /** Renders `sub` as a row of navy pills (Cara kerja). */
  pills?: boolean;
}) {
  const cls = ["sec-head", variant, left && "left", pills && "pills"].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      <h2 className={variant ? `hl ${variant}` : "hl"}>
        <span>{title}</span>
      </h2>
      {sub && (pills ? <div className="sh-sub">{sub}</div> : <p className="sh-sub">{sub}</p>)}
    </div>
  );
}

/** Larger highlighted heading without subtitle (team blocks). */
export function HighlightTitle({ children, small = false }: { children: React.ReactNode; small?: boolean }) {
  return (
    <div className="hl-wrap">
      <h2 className={small ? "hl sm" : "hl"}>
        <span>{children}</span>
      </h2>
    </div>
  );
}
