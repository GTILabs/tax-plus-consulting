import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ContactOptions } from "@/components/sections/ContactOptions";
import { Accordion } from "@/components/ui/Accordion";
import { Check, Cross } from "@/components/ui/icons";
import { routes } from "@/modules/content/navigation";
import { getService, services } from "@/modules/content/services";
import { whatsappLink } from "@/modules/content/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/layanan/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.name} — ${service.subtitle}`,
    description: service.intro,
    alternates: { canonical: routes.service(slug) },
  };
}

export default async function ServicePage(props: PageProps<"/layanan/[slug]">) {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <Breadcrumb items={[{ label: "Layanan", href: routes.services }, { label: service.name }]} />
      <div className="pg-svc">
        <header className="hero">
          <div className="wrap">
            <span className="eyebrow">{service.eyebrow}</span>
            <h1>{service.name}</h1>
            <p className="idn">{service.subtitle}</p>
            <p>{service.intro}</p>
            <div className="acts">
              <a
                className="btn btn-y"
                href={whatsappLink(`Halo TaxPlus, saya ingin konsultasi tentang ${service.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Konsultasi gratis 15 menit
              </a>
              <Link className="btn btn-o" href={routes.contact}>
                Kirim lewat formulir
              </Link>
            </div>
          </div>
        </header>

        <section className="blk">
          <div className="wrap">
            <h2>Untuk Anda jika&hellip;</h2>
            <div className="forme">
              {service.forMe.map((item) => (
                <div className="fm" key={item.title}>
                  <b>{item.title}</b>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="blk tint">
          <div className="wrap">
            <h2>Termasuk &amp; tidak termasuk</h2>
            <p className="sub">Jelas sejak awal, supaya tidak ada kejutan di tengah jalan.</p>
            <div className="two">
              <div className="box inc">
                <h4>Termasuk</h4>
                <ul>
                  {service.included.map((text) => (
                    <li key={text}>
                      <span className="mk"><Check /></span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="box exc">
                <h4>Tidak termasuk</h4>
                <ul>
                  {service.excluded.map((text) => (
                    <li key={text}>
                      <span className="mk"><Cross /></span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="blk">
          <div className="wrap">
            <h2>Prosesnya</h2>
            <p className="sub">Dengan tenggat nyata di setiap tahap.</p>
            <div className="steps">
              {service.steps.map((step, i) => (
                <div className="stp" key={step.title}>
                  <div className="n">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <h4>{step.title}</h4>
                    <p>{step.text}</p>
                  </div>
                  <div className="dl">{step.timing}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="blk tint">
          <div className="wrap">
            <h2>Yang Anda terima</h2>
            <div className="deliv">
              {service.deliverables.map((item) => (
                <div className="dv" key={item.title}>
                  <b>{item.title}</b>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="blk">
          <div className="wrap">
            <div className="case">
              <div className="lbl">Contoh kasus</div>
              <h4>{service.caseStudy.title}</h4>
              <div className="g">
                <div><b>Situasi</b><p>{service.caseStudy.situation}</p></div>
                <div><b>Yang kami lakukan</b><p>{service.caseStudy.action}</p></div>
                <div><b>Hasil</b><p>{service.caseStudy.result}</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="blk tint">
          <div className="wrap">
            <div className="cred">
              <h3>{service.whyUs.title}</h3>
              <p>{service.whyUs.text}</p>
              <div className="row">
                {service.whyUs.credentials.map((c) => (
                  <div className="c" key={c.label}>
                    {c.label}
                    {c.detail && <span style={{ whiteSpace: "pre-line" }}>{c.detail}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="blk">
          <div className="wrap">
            <h2>Pertanyaan yang sering muncul</h2>
            <Accordion
              items={service.faqs}
              itemClassName="fq"
              answerClassName="ans"
            />
          </div>
        </section>

        <section className="blk tint">
          <div className="wrap">
            <div className="cta2">
              <div>
                <h3>Ceritakan dulu masalahnya</h3>
                <p>15 menit, tanpa biaya. Kami tidak menawarkan paket sebelum tahu kondisi Anda.</p>
              </div>
              <div className="opts">
                <ContactOptions />
              </div>
            </div>
          </div>
        </section>

        <section className="blk">
          <div className="wrap">
            <h2 style={{ fontSize: 22, marginBottom: 18 }}>Layanan terkait</h2>
            <div className="rel">
              {service.related.map((rel) => (
                <Link className="rl" key={rel.slug} href={routes.service(rel.slug)}>
                  {getService(rel.slug)!.name}
                  <span>{rel.text}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
