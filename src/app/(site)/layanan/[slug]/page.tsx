import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FaqList, faqJsonLd, JsonLd } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { FlowSection } from "@/components/sections/FlowSection";
import { HeroButtons, Mark, PageHero } from "@/components/sections/PageHero";
import { SectionHead } from "@/components/sections/SectionHead";
import { OtherServices } from "@/components/sections/ServiceCards";
import { Cross, Tick } from "@/components/ui/icons";
import { getHome, getService, getServices, getSite, serviceWhatsappMessage, waLink } from "@/modules/content/data";
import { routes } from "@/modules/content/navigation";

/** Hero background per service (team photos until dedicated ones arrive). */
const heroPhotos: Record<string, string> = {
  "tax-compliance": "/images/photos/team/team-03.jpg",
  "tax-accounting": "/images/photos/team/team-05.jpg",
  "tax-management": "/images/photos/team/team-07.jpg",
  "tax-audit": "/images/photos/team/team-09.jpg",
  "tax-litigation": "/images/photos/team/team-08.jpg",
};

export async function generateStaticParams() {
  return (await getServices()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/layanan/[slug]">): Promise<Metadata> {
  const service = await getService((await params).slug);
  if (!service) return {};
  return {
    title: `${service.name}: ${service.subtitle}`,
    description: service.intro,
    alternates: { canonical: routes.service(service.slug) },
  };
}

export default async function ServicePage({ params }: PageProps<"/layanan/[slug]">) {
  const [service, site, { credentials }] = await Promise.all([getService((await params).slug), getSite(), getHome()]);
  if (!service) notFound();

  const waMessage = serviceWhatsappMessage(service);
  const [first, ...rest] = service.name.split(" ");
  const isLitigation = service.slug === "tax-litigation";

  return (
    <>
      <JsonLd data={faqJsonLd(service.faqs)} />
      {/* 1. Hero */}
      <PageHero
        crumbs={[{ label: "Layanan", href: routes.services }, { label: service.name }]}
        kicker={service.subtitle}
        title={
          <>
            {first} <Mark>{rest.join(" ")}</Mark>
          </>
        }
        sub={service.intro}
        photo={heroPhotos[service.slug] ?? "/images/photos/team/team-03.jpg"}
        actions={<HeroButtons waMessage={waMessage} />}
      />

      {/* 2. Cakupan layanan */}
      <section>
        <div className="in">
          <SectionHead title="Yang kami kerjakan" sub="Cakupan pekerjaan yang kami tangani untuk Anda." />
          <div className="cak">
            {service.scope.map((c, i) => (
              <div key={c.title} className="ck">
                <span className="ck-n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Untuk siapa */}
      <section className="soft">
        <div className="in svc-split">
          <article className="about-box">
            <span className="eyebrow">Untuk siapa</span>
            <h2>Layanan ini cocok bila Anda</h2>
            <ul className="ticks big">
              {service.forWhom.map((x) => (
                <li key={x}>
                  <Tick />
                  {x}
                </li>
              ))}
            </ul>
          </article>
          <aside className="cta-card">
            <span className="pre-s">Konsultasi awal</span>
            <h3>Gratis 15 menit untuk {service.name}</h3>
            <p>Ceritakan kondisi Anda. Kami jelaskan langkah dan perkiraan ruang lingkupnya.</p>
            <a className="btn btn-gold" href={waLink(site, waMessage)} target="_blank" rel="noopener noreferrer">
              Chat WhatsApp
            </a>
            <span className="cc-small">Dibalas di hari kerja yang sama</span>
          </aside>
        </div>
      </section>

      {/* 4. Termasuk & tidak termasuk */}
      <section>
        <div className="in">
          <SectionHead title="Termasuk & tidak termasuk" sub="Ruang lingkup jelas sejak awal, tanpa biaya tak terduga." />
          <div className="scope">
            <div className="sc in-c">
              <h3>
                <span className="sc-i">
                  <Tick color="currentColor" />
                </span>
                Termasuk dalam layanan
              </h3>
              <ul>
                {service.included.map((x) => (
                  <li key={x}>
                    <span className="sc-b">
                      <Tick color="currentColor" />
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="sc ex-c">
              <h3>
                <span className="sc-i">
                  <Cross />
                </span>
                Tidak termasuk
              </h3>
              <ul>
                {service.excluded.map((x) => (
                  <li key={x}>
                    <span className="sc-b">
                      <Cross />
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="note-it c">Ruang lingkup final dituangkan dalam surat penawaran dan perjanjian kerja.</p>
        </div>
      </section>

      {/* 5. Cara kerja khusus layanan */}
      <FlowSection steps={service.steps} sub={`Langkah kerja ${service.name} beserta estimasi waktunya.`} waMessage={waMessage} />

      {/* 6. Ditangani oleh + FAQ */}
      <section>
        <div className="in about-faq">
          <article className="about-box">
            <span className="eyebrow">Ditangani oleh</span>
            <h2>Partner berizin, bukan staf junior.</h2>
            <p>
              {isLitigation
                ? "Sengketa ditangani langsung oleh Kalam Al-Iqbal, pemegang Izin Kuasa Hukum Pengadilan Pajak 1507/PP/IKH/2023 dan advokat."
                : "Pekerjaan diawasi langsung oleh partner TaxPlus yang memegang izin praktik konsultan pajak."}
            </p>
            <div className="about-facts">
              {credentials.slice(0, isLitigation ? 2 : 1).map((c) => (
                <span key={c.title}>
                  <b style={{ fontSize: 15, fontFamily: "var(--f-body)" }}>{c.title}</b>
                  {c.number}
                </span>
              ))}
            </div>
          </article>
          <div className="faq-col">
            <h3>Seputar {service.name}</h3>
            <FaqList items={service.faqs} />
          </div>
        </div>
      </section>

      {/* 7. Layanan lainnya + pita CTA */}
      <section className="soft">
        <div className="in">
          <SectionHead title="Layanan lainnya" sub="Butuh pendampingan di tahap lain? Kami siap." />
          <OtherServices current={service.slug} />
        </div>
      </section>
      <CtaBand title={`Butuh pendampingan ${service.name}?`} waMessage={waMessage} />
    </>
  );
}
