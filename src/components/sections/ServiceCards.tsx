import Link from "next/link";
import { Icon } from "@/components/ui/icons";
import { routes } from "@/modules/content/navigation";
import { getServices, type Service } from "@/modules/content/data";

/** Four square cards + Tax Litigation full width (two columns with its four stages). */
export async function ServiceBoxes() {
  const services = await getServices();
  return (
    <div className="svc-big">
      {services.map((s, i) => (i === services.length - 1 ? <WideService key={s.slug} service={s} /> : (
        <Link key={s.slug} className="sbox" href={routes.service(s.slug)}>
          <span className="num" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="bico">
            <Icon name={s.icon} />
          </span>
          <h3>{s.name}</h3>
          <span className="sub">{s.subtitle}</span>
          <p>{s.summary}</p>
          <span className="ob">Lihat layanan &rarr;</span>
        </Link>
      )))}
    </div>
  );
}

function WideService({ service: s }: { service: Service }) {
  return (
    <Link className="sbox wide2" href={routes.service(s.slug)}>
      <div className="w-l">
        <span className="w-badge">Layanan unggulan</span>
        <div className="w-head">
          <span className="bico">
            <Icon name={s.icon} />
          </span>
          <div>
            <h3>{s.name}</h3>
            <span className="sub">Sengketa pajak sampai putusan</span>
          </div>
        </div>
        <p>Ditangani langsung oleh kuasa hukum Pengadilan Pajak yang juga advokat, dari keberatan sampai peninjauan kembali.</p>
      </div>
      <div className="w-r">
        <ol className="w-steps">
          {s.scope.map((c, k) => (
            <li key={c.title}>
              <span>{k + 1}</span>
              <div>
                <b>{c.title}</b>
                <small>{c.text}</small>
              </div>
            </li>
          ))}
        </ol>
        <span className="w-btn">Lihat layanan {s.name} &rarr;</span>
      </div>
    </Link>
  );
}

/** "Cakupan tiap layanan": numbered rows with sub-service pills. */
export async function ServiceRows() {
  const services = await getServices();
  return (
    <div className="srows">
      {services.map((s, i) => (
        <Link key={s.slug} className="srow" href={routes.service(s.slug)}>
          <div className="sr-l">
            <span className="sr-n">{String(i + 1).padStart(2, "0")}</span>
            <span className="bico">
              <Icon name={s.icon} />
            </span>
            <div>
              <h3>{s.name}</h3>
              <span className="sub">{s.subtitle}</span>
            </div>
          </div>
          <div className="sr-r">
            {s.scope.map((c) => (
              <span key={c.title} className="pill">
                {c.title}
              </span>
            ))}
            <span className="sr-go">Detail layanan &rarr;</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

/** "Layanan lainnya": four small cards with the icon centered. */
export async function OtherServices({ current }: { current: string }) {
  const services = await getServices();
  return (
    <div className="svc-big mini">
      {services
        .filter((s) => s.slug !== current)
        .map((s) => (
          <Link key={s.slug} className="sbox" href={routes.service(s.slug)}>
            <span className="bico">
              <Icon name={s.icon} />
            </span>
            <h3>{s.name}</h3>
            <span className="sub">{s.subtitle}</span>
            <span className="ob">Lihat layanan &rarr;</span>
          </Link>
        ))}
    </div>
  );
}
