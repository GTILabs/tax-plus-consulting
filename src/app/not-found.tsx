import Link from "next/link";
import { BackToTop } from "@/components/layout/BackToTop";
import { GatePanels } from "@/components/layout/GatePanels";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Mark, PageHero } from "@/components/sections/PageHero";
import { routes } from "@/modules/content/navigation";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="app">
        <PageHero
          crumbs={[{ label: "404" }]}
          kicker="Halaman tidak ditemukan"
          title={
            <>
              Alamat ini
              <br />
              <Mark>tidak tersedia.</Mark>
            </>
          }
          sub="Halaman yang Anda buka tidak ada atau sudah dipindahkan. Mulai dari beranda, atau lihat layanan kami."
          actions={
            <div className="ctas">
              <Link className="btn btn-gold" href={routes.home}>
                Kembali ke beranda
              </Link>
              <Link className="btn btn-line" href={routes.services} style={{ color: "#fff", borderColor: "rgba(255,255,255,.55)" }}>
                Lihat layanan
              </Link>
            </div>
          }
        />
      </main>
      <GatePanels />
      <SiteFooter />
      <BackToTop />
      <WhatsAppFloat messages={{}} />
    </>
  );
}
