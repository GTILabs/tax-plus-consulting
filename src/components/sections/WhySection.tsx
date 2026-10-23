import { Icon } from "@/components/ui/icons";
import { credentials } from "@/modules/content/company";

/** "Mengapa TaxPlus?": four credential cards, each with its license number and issuer. */
export function WhySection() {
  return (
    <section className="why2">
      <div className="in">
        <div className="w2-head">
          <span className="w2-badge">Keunggulan TaxPlus</span>
          <h2 className="w2-title">Mengapa TaxPlus?</h2>
          <p className="w2-tag">Dari kantor pajak sampai ruang sidang, dalam satu tim.</p>
          <p className="w2-sub">Empat kewenangan yang jarang dimiliki satu kantor sekaligus. Semuanya resmi dan bisa diverifikasi.</p>
        </div>
        <div className="w2-grid">
          {credentials.map((c, i) => (
            <article key={c.title} className="w2">
              <div className="w2-top">
                <span className="w2-ico">
                  <Icon name={c.icon} size={30} strokeWidth={1.6} />
                </span>
                <span className="w2-n">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <dl>
                <dt>{c.issuer}</dt>
                <dd>{c.number}</dd>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
