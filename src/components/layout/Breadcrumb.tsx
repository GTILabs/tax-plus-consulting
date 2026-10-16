import Link from "next/link";
import { Fragment } from "react";
import { routes } from "@/modules/content/navigation";

export type Crumb = { label: string; href?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="gcrumb" aria-label="Breadcrumb">
      <div className="gwrap">
        <Link href={routes.home}>Beranda</Link>
        {items.map((item) => (
          <Fragment key={item.label}>
            <span>/</span>
            {item.href ? <Link href={item.href}>{item.label}</Link> : <i aria-current="page">{item.label}</i>}
          </Fragment>
        ))}
      </div>
    </nav>
  );
}
