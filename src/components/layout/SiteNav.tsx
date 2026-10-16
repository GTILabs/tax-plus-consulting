"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const isOn = (item: (typeof items)[number]) =>
    item.match ? item.match(pathname) : pathname === item.href || pathname.startsWith(`${item.href}/`);

  return (
    <nav className="gnav">
      <div className="gwrap in">
        <Link href={routes.home}>
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
        <Link className="cta" href={routes.contact}>
          Konsultasi Gratis
        </Link>
      </div>
    </nav>
  );
}
