"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainMenu, routes, serviceLinks } from "@/modules/content/navigation";
import { FREE_CONSULT_WA_MESSAGE, whatsappLink } from "@/modules/content/site";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/** Sticky white header: logo left, menu right, yellow "Konsultasi gratis" (WhatsApp). On phones the menu folds into "Menu". */
export function SiteHeader() {
  const pathname = usePathname();
  // The mobile menu remembers the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site">
      <div className="in">
        <Link className="logo" href={routes.home} aria-label="TaxPlus Consulting, ke beranda">
          <Image src="/images/logo.png" alt="TaxPlus Consulting" width={360} height={115} priority style={{ width: "auto" }} />
        </Link>
        <button
          type="button"
          className="burger"
          aria-expanded={open}
          aria-controls="nav"
          onClick={() => setOpenOn(open ? null : pathname)}
        >
          {open ? "Tutup" : "Menu"}
        </button>
        <nav className={open ? "main open" : "main"} id="nav" aria-label="Navigasi utama">
          {mainMenu.map((item) => {
            const link = (
              <Link key={item.href} href={item.href} aria-current={isActive(pathname, item.href) ? "page" : undefined}>
                {item.label}
              </Link>
            );
            if (!("dropdown" in item)) return link;
            return (
              <div className="dd" key={item.href}>
                {link}
                <div className="dd-menu">
                  {serviceLinks.map((s) => (
                    <Link key={s.slug} href={routes.service(s.slug)}>
                      {s.name}
                      <small>{s.description}</small>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
          <a
            className="btn btn-gold cta-top"
            href={whatsappLink(FREE_CONSULT_WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Konsultasi gratis
          </a>
        </nav>
      </div>
    </header>
  );
}
