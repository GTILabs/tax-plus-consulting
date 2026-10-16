const STAR = "M12 2.6l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.7 6.1 20.8l1.2-6.6L2.5 9.6l6.6-.9z";

export function Stars({ className }: { className?: string }) {
  return (
    <span className={className} aria-label="5 dari 5 bintang" role="img">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" aria-hidden="true">
          <path d={STAR} />
        </svg>
      ))}
    </span>
  );
}

export function ArrowRight({ className = "ar" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M12.5 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowDown() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5v13M6 11.5l6 6 6-6" />
    </svg>
  );
}

export function ArrowLeft() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 12H6M11.5 6l-6 6 6 6" />
    </svg>
  );
}

export function Check() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12.5l5.5 5.5L20 6.5" />
    </svg>
  );
}

export function Cross() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

const SERVICE_ICON_PATHS = {
  shield: ["M9 12l2 2 4-4", "M21 12c0 5-3.5 7.5-8.2 9-.5.2-1.1.2-1.6 0C6.5 19.5 3 17 3 12V6l9-3 9 3v6z"],
  document: ["M4 19V5a2 2 0 012-2h9l5 5v11a2 2 0 01-2 2H6a2 2 0 01-2-2z", "M14 3v5h5M8 13h8M8 17h5"],
  trend: ["M3 17l5-5 4 3 8-8", "M15 7h5v5"],
  checklist: ["M9 11l3 3 8-8", "M20 12v7a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h9"],
  scale: ["M12 3v18M5 7h14M7 7l-3 7h6zM17 7l-3 7h6z"],
  spark: ["M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3"],
} as const;

export type ServiceIconName = keyof typeof SERVICE_ICON_PATHS;

export function ServiceIcon({ name, style }: { name: ServiceIconName; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" style={style} aria-hidden="true">
      {SERVICE_ICON_PATHS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

export function ContactIcon({ name }: { name: "phone" | "mail" | "pin" | "clock" }) {
  switch (name) {
    case "phone":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6A19.8 19.8 0 012 4.2 2 2 0 014 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L8 9.5a16 16 0 006 6l1.1-1.1a2 2 0 012.1-.5c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z" />
        </svg>
      );
    case "mail":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 4h16v16H4z" />
          <path d="M4 7l8 6 8-6" />
        </svg>
      );
    case "pin":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "clock":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
  }
}
