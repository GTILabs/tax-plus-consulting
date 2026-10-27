"use client";

import { useState } from "react";

type Point = { date: string; users: number; views: number };

const W = 720;
const H = 220;
const PAD = { top: 12, right: 12, bottom: 26, left: 38 };
const num = new Intl.NumberFormat("id-ID");
const dayFmt = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", timeZone: "UTC" });
const longFmt = new Intl.DateTimeFormat("id-ID", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

const toDate = (yyyymmdd: string) => new Date(`${yyyymmdd.slice(0, 4)}-${yyyymmdd.slice(4, 6)}-${yyyymmdd.slice(6, 8)}T00:00:00Z`);

/** Round the axis top up to a "nice" number so gridlines land on readable values. */
function niceMax(v: number) {
  if (v <= 4) return 4;
  const rough = v / 4;
  const pow = 10 ** Math.floor(Math.log10(rough));
  const step = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].find((s) => s * pow >= rough)! * pow;
  return step * 4;
}

/** Daily active users: one 2px line on recessive gridlines, crosshair + tooltip on hover. */
export function TrendChart({ data }: { data: Point[] }) {
  const [hover, setHover] = useState<number | null>(null);
  if (data.length === 0) return <p className="adm-muted">Belum ada data pada rentang ini.</p>;
  const max = niceMax(Math.max(...data.map((d) => d.users)));
  const iw = W - PAD.left - PAD.right;
  const ih = H - PAD.top - PAD.bottom;
  const x = (i: number) => PAD.left + (data.length === 1 ? iw / 2 : (i / (data.length - 1)) * iw);
  const y = (v: number) => PAD.top + ih - (v / max) * ih;
  const line = data.map((d, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(d.users).toFixed(1)}`).join("");
  const area = `${line}L${x(data.length - 1).toFixed(1)},${PAD.top + ih}L${x(0).toFixed(1)},${PAD.top + ih}Z`;
  const ticks = [0, 1, 2, 3, 4].map((k) => (max / 4) * k);
  const labelEvery = Math.ceil(data.length / 7);
  const h = hover === null ? null : data[hover];

  return (
    <div className="adm-trend">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Grafik pengguna aktif per hari" onMouseLeave={() => setHover(null)}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} className="grid" />
            <text x={PAD.left - 8} y={y(t)} className="ax" textAnchor="end" dominantBaseline="middle">
              {num.format(t)}
            </text>
          </g>
        ))}
        {data.map((d, i) =>
          i % labelEvery === 0 ? (
            <text key={d.date} x={x(i)} y={H - 6} className="ax" textAnchor="middle">
              {dayFmt.format(toDate(d.date))}
            </text>
          ) : null,
        )}
        <path d={area} className="area" />
        <path d={line} className="line" />
        {h && hover !== null && (
          <>
            <line x1={x(hover)} x2={x(hover)} y1={PAD.top} y2={PAD.top + ih} className="cross" />
            <circle cx={x(hover)} cy={y(h.users)} r={5} className="dot" />
          </>
        )}
        {data.map((d, i) => (
          <rect
            key={d.date}
            x={x(i) - iw / data.length / 2}
            y={PAD.top}
            width={Math.max(iw / data.length, 6)}
            height={ih}
            fill="transparent"
            onMouseEnter={() => setHover(i)}
            onFocus={() => setHover(i)}
            tabIndex={-1}
          />
        ))}
      </svg>
      {h && hover !== null && (
        <div className="adm-tip" style={{ left: `${(x(hover) / W) * 100}%` }} role="status">
          <b>{longFmt.format(toDate(h.date))}</b>
          <span>
            {num.format(h.users)} pengguna · {num.format(h.views)} tampilan
          </span>
        </div>
      )}
    </div>
  );
}
