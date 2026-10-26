"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainMenu, routes } from "@/modules/content/navigation";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/** Sticky white header: logo left, menu right, "Masuk" (CMS login) and yellow "Konsultasi gratis" (WhatsApp). On phones the menu folds into "Menu". */
export function SiteHeader({
  services,
  consultHref,
}: {
  services: { slug: string; name: string; description: string }[];
  consultHref: string;
}) {
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
                  {services.map((s) => (
                    <Link key={s.slug} href={routes.service(s.slug)}>
                      {s.name}
                      <small>{s.description}</small>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
          <Link className="login-top" href={routes.adminLogin} prefetch={false}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21a8 8 0 0 1 16 0" />
            </svg>
            Masuk
          </Link>
          <a
            className="btn btn-gold cta-top"
            href={consultHref}
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
