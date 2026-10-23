import type { Metadata } from "next";
import { FlowSteps } from "@/components/sections/FlowSection";
import { Mark, PageHero } from "@/components/sections/PageHero";
import { SectionHead } from "@/components/sections/SectionHead";
import { Icon } from "@/components/ui/icons";
import { APPLICATION_SUBJECT, careerPerks, jobOpenings, recruitmentSteps } from "@/modules/content/company";
import { routes } from "@/modules/content/navigation";
import { mailtoLink, site, whatsappLink } from "@/modules/content/site";

export const metadata: Metadata = {
  title: "Karier",
  description:
    "Tumbuh bersama TaxPlus Consulting. Lowongan Sales Marketing dan Program Magang Pajak & Akuntansi di Bandung, belajar langsung dari praktisi berizin.",
  alternates: { canonical: routes.career },
};

export default function CareerPage() {
  const applyHref = mailtoLink(APPLICATION_SUBJECT);
  return (
    <>
      <PageHero
        crumbs={[{ label: "Karier" }]}
        kicker="Karier di TaxPlus"
        title={
          <>
            Tumbuh bersama
            <br />
            <Mark>TaxPlus.</Mark>
          </>
        }
        sub="Kami mencari orang yang teliti, mau belajar, dan siap mendampingi klien dari kantor pajak sampai ruang sidang."
        photo="/images/photos/team/team-01.jpg"
        actions={
          <div className="ctas">
            <a className="btn btn-gold" href="#lowongan">
              Lihat posisi tersedia
            </a>
            <a className="btn btn-line" href="#lamar" style={{ color: "#fff", borderColor: "rgba(255,255,255,.55)" }}>
              Cara melamar
            </a>
          </div>
        }
      />
      <section>
        <div className="in">
          <SectionHead title="Tumbuh bersama TaxPlus" sub="Belajar langsung dari praktisi, di kasus nyata." />
          <div className="perks">
            {careerPerks.map((p) => (
              <div key={p.title} className="perk">
                <span className="pl-i">
                  <Icon name={p.icon} size={26} />
                </span>
                <b>{p.title}</b>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="soft" id="lowongan">
        <div className="in">
          <SectionHead title="Posisi tersedia" sub="Lamar sekarang, kami hubungi kandidat yang sesuai." />
          <div className="jobs">
            {jobOpenings.map((j) => (
              <article key={j.title} className="job">
                <div>
                  <div className="job-tags">
                    <span className="pill">{j.type}</span>
                    <span className="pill">{j.location}</span>
                  </div>
                  <h3>{j.title}</h3>
                  <p>{j.text}</p>
                </div>
                <a
                  className="btn btn-navy"
                  href={whatsappLink(`Halo TaxPlus, saya ingin melamar posisi ${j.title}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Lamar posisi ini
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="flow" id="lamar">
        <div className="in">
          <SectionHead title="Proses rekrutmen" sub="Empat tahap menuju tim TaxPlus." variant="on-gold" />
          <FlowSteps steps={recruitmentSteps} />
          <div className="apply">
            <div className="ap-main">
              <span className="ap-ico">
                <Icon name="mail" size={26} />
              </span>
              <div>
                <span className="ap-k">Kirim lamaran ke</span>
                <a className="ap-mail" href={applyHref}>
                  {site.contact.email}
                </a>
              </div>
            </div>
            <div className="ap-sub">
              <span className="ap-k">Format subjek email</span>
              <code>Lamaran &ndash; [Posisi] &ndash; [Nama]</code>
            </div>
            <div className="ap-act">
              <a className="btn btn-gold" href={applyHref}>
                Kirim email
              </a>
              <a
                className="btn ap-wa"
                href={whatsappLink("Halo TaxPlus, saya ingin bertanya tentang lowongan.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Tanya via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
