import Link from "next/link";

export function PageHead({
  title,
  sub,
  crumbs,
  children,
}: {
  title: string;
  sub?: React.ReactNode;
  crumbs?: { href: string; label: string }[];
  children?: React.ReactNode;
}) {
  return (
    <div className="adm-head">
      <div>
        {crumbs && (
          <div className="adm-crumb">
            {crumbs.map((c) => (
              <span key={c.href}>
                <Link href={c.href}>{c.label}</Link> /{" "}
              </span>
            ))}
          </div>
        )}
        <h1>{title}</h1>
        {sub && <p>{sub}</p>}
      </div>
      {children && <div className="adm-actions">{children}</div>}
    </div>
  );
}
