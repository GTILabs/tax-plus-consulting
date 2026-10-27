const num = new Intl.NumberFormat("id-ID");

/** Ranked horizontal bars (one hue: these compare magnitudes). Values stay in text ink. */
export function BarList({ items, unit }: { items: { label: string; value: number; sub?: string }[]; unit: string }) {
  if (items.length === 0) return <p className="adm-muted">Belum ada data.</p>;
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <ul className="adm-bars">
      {items.map((i) => (
        <li key={i.label + (i.sub ?? "")} title={`${i.label}: ${num.format(i.value)} ${unit}`}>
          <div className="adm-bars-t">
            <span className="lbl">
              {i.label}
              {i.sub && <small>{i.sub}</small>}
            </span>
            <span className="val">{num.format(i.value)}</span>
          </div>
          <span className="adm-bars-track">
            <span style={{ width: `${(i.value / max) * 100}%` }} />
          </span>
        </li>
      ))}
    </ul>
  );
}
