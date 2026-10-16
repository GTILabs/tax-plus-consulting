import Link from "next/link";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteNav } from "@/components/layout/SiteNav";
import { routes } from "@/modules/content/navigation";

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main className="pg-art">
        <header className="xh">
          <div className="gwrap">
            <span className="xeb">404</span>
            <h1>Halaman tidak ditemukan.</h1>
            <p>Alamat yang Anda buka tidak ada atau sudah dipindahkan.</p>
          </div>
        </header>
        <section className="xs">
          <div className="gwrap">
            <div className="post">
              <div className="cta3" style={{ marginTop: 0 }}>
                <h4>Mencari sesuatu?</h4>
                <p>Mulai dari beranda, lihat layanan kami, atau baca artikel terbaru.</p>
                <Link href={routes.home}>
                  <span>Kembali ke beranda</span>
                </Link>{" "}
                <Link href={routes.services}>
                  <span>Lihat layanan</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatingActions />
    </>
  );
}
