import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { Mark, PageHero } from "@/components/sections/PageHero";
import { routes } from "@/modules/content/navigation";

export default function NotFound() {
  return (
    <SiteShell>
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
    </SiteShell>
  );
}
