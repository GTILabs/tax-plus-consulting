"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { routes, serviceLinks } from "@/modules/content/navigation";

const items = [
  { href: routes.home, label: "Beranda", match: (p: string) => p === "/" },
  { href: routes.about, label: "Tentang Kami" },
  { href: routes.services, label: "Layanan", dropdown: true },
  { href: routes.specialization, label: "Spesialisasi" },
  { href: routes.articles, label: "Artikel" },
  { href: routes.career, label: "Karier" },
  { href: routes.contact, label: "Kontak", match: () => false },
];

export function SiteNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isOn = (item: (typeof items)[number]) =>
    item.match ? item.match(pathname) : pathname === item.href || pathname.startsWith(`${item.href}/`);
  const close = () => setMenuOpen(false);

  // While the mobile menu is open: Escape closes it and the page behind does not scroll.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <nav className="gnav" aria-label="Navigasi utama">
      <div className="gwrap in">
        <Link href={routes.home} onClick={close}>
          <Image className="lg" src="/images/logo.png" alt="TaxPlus Consulting" width={360} height={115} priority />
        </Link>
        <ul>
          {items.map((item) => (
            <li key={item.href} className={isOn(item) ? "on" : undefined}>
              <Link href={item.href}>{item.label}</Link>
              {item.dropdown && (
                <div className="dd">
                  <Link href={routes.services}>
                    Semua Layanan<span>Ringkasan lima layanan</span>
                  </Link>
                  {serviceLinks.map((s) => (
                    <Link key={s.slug} href={routes.service(s.slug)}>
                      {s.name}
                      <span>{s.description}</span>
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
        <Link className="cta" href={routes.contact} onClick={close}>
          Konsultasi Gratis
        </Link>
        <button
          type="button"
          className={menuOpen ? "burger open" : "burger"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" />
        </button>
      </div>

      <div id="mobile-menu" className={menuOpen ? "mnav open" : "mnav"} hidden={!menuOpen}>
        <div className="mnav-scrim" onClick={close} aria-hidden="true" />
        <div className="mnav-panel">
          <ul>
            {items
              .filter((item) => !item.dropdown)
              .map((item) => (
                <li key={item.href} className={isOn(item) ? "on" : undefined}>
                  <Link href={item.href} onClick={close}>
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
          <div className="mnav-group">
            <Link href={routes.services} onClick={close} className="mnav-head">
              Layanan
            </Link>
            {serviceLinks.map((s) => (
              <Link key={s.slug} href={routes.service(s.slug)} onClick={close}>
                {s.name}
                <span>{s.description}</span>
              </Link>
            ))}
          </div>
          <Link className="mnav-cta" href={routes.contact} onClick={close}>
            Konsultasi Gratis &middot; 15 menit
          </Link>
        </div>
      </div>
    </nav>
  );
}
