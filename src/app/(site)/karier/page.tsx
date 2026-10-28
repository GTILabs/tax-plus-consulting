import type { Metadata } from "next";
import Image from "next/image";
import { FlowSteps } from "@/components/sections/FlowSection";
import { Mark, PageHero } from "@/components/sections/PageHero";
import { SectionHead } from "@/components/sections/SectionHead";
import { Icon } from "@/components/ui/icons";
import { getCareer, getJobs, getSite, waLink } from "@/modules/content/data";
import { routes } from "@/modules/content/navigation";
import { mailtoLink } from "@/modules/content/site";

export const metadata: Metadata = {
  title: "Karier",
  description:
    "Tumbuh bersama TaxPlus Consulting. Lowongan Sales Marketing dan Program Magang Pajak & Akuntansi di Bandung, belajar langsung dari praktisi berizin.",
  alternates: { canonical: routes.career },
};

export default async function CareerPage() {
  const [site, career, jobOpenings] = await Promise.all([getSite(), getCareer(), getJobs()]);
  const { careerPerks, recruitmentSteps, applicationSubject } = career;
  const applyHref = mailtoLink(site.contact.email, applicationSubject || undefined);
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
        photo="/images/photos/team/karier-hero.webp"
        photoPosition="50% 30%"
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
          <figure className="team-photo">
            <Image src="/images/photos/team/tim-taxplus.webp" alt="Tim TaxPlus Consulting di kantor Bandung" width={2000} height={1330} sizes="(max-width: 1160px) 100vw, 1120px" />
            <figcaption>Tim TaxPlus Consulting di kantor Bandung.</figcaption>
          </figure>
        </div>
      </section>
      <section className="soft" id="lowongan">
        <div className="in">
          <SectionHead title="Posisi tersedia" sub="Lamar sekarang, kami hubungi kandidat yang sesuai." />
          {jobOpenings.length === 0 && (
            <p className="lead" style={{ textAlign: "center", margin: "0 auto" }}>
              Belum ada posisi terbuka saat ini. Lamaran terbuka tetap bisa dikirim lewat email di bawah.
            </p>
          )}
          <div className="jobs">
            {jobOpenings.map((j) => (
              <article key={j.title} className="job">
                <div>
                  <div className="job-tags">
                    {j.type && <span className="pill">{j.type}</span>}
                    {j.location && <span className="pill">{j.location}</span>}
                  </div>
                  <h3>{j.title}</h3>
                  <p>{j.text}</p>
                </div>
                <a
                  className="btn btn-navy"
                  href={waLink(site, `Halo TaxPlus, saya ingin melamar posisi ${j.title}.`)}
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
            {applicationSubject && (
              <div className="ap-sub">
                <span className="ap-k">Format subjek email</span>
                <code>{applicationSubject}</code>
              </div>
            )}
            <div className="ap-act">
              <a className="btn btn-gold" href={applyHref}>
                Kirim email
              </a>
              <a
                className="btn ap-wa"
                href={waLink(site, "Halo TaxPlus, saya ingin bertanya tentang lowongan.")}
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
