import { Icon, Tick, type IconName } from "@/components/ui/icons";
import { getHome, getSite, waLink } from "@/modules/content/data";
import { SectionHead } from "./SectionHead";

type Step = { title: string; text: string; timing?: string };

const STEP_ICONS: IconName[] = ["chat", "form", "trend", "report"];

/** Pills under the "Cara kerja" title. */
function FlowPills() {
  return (
    <>
      <span className="pg">
        <b>4</b> langkah jelas
      </span>
      <span className="pg">
        <b>1</b> PIC untuk Anda
      </span>
      <span className="pg">Tanpa urusan yang menggantung</span>
    </>
  );
}

/** Numbered steps on a yellow band. */
export function FlowSteps({ steps, icons = false }: { steps: Step[]; icons?: boolean }) {
  return (
    <ol className="fsteps" style={{ "--n": steps.length } as React.CSSProperties}>
      {steps.map((s, i) => (
        <li key={s.title}>
          <span className="fnum">{i + 1}</span>
          <div className="fcard">
            {icons && STEP_ICONS[i] && (
              <span className="fi">
                <Icon name={STEP_ICONS[i]} size={30} strokeWidth={1.8} />
              </span>
            )}
            <b>{s.title}</b>
            <span>{s.text}</span>
            {s.timing && <em>{s.timing}</em>}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Navy bar with the three service promises and a button. */
export async function PromiseBar({ waMessage }: { waMessage?: string }) {
  const [site, home] = await Promise.all([getSite(), getHome()]);
  return (
    <div className="promise">
      {home.servicePromises.map((p) => (
        <div key={p}>
          <Tick color="currentColor" />
          {p}
        </div>
      ))}
      <a className="btn btn-gold" href={waLink(site, waMessage ?? site.messages.freeConsult)} target="_blank" rel="noopener noreferrer">
        Mulai dari langkah 1
      </a>
    </div>
  );
}

/**
 * "Cara kerja" (yellow): the general four steps by default, or a service's own
 * steps with time estimates.
 */
export async function FlowSection({
  steps,
  sub,
  waMessage,
}: {
  steps?: Step[];
  sub?: string;
  waMessage?: string;
}) {
  const workSteps = steps ? [] : (await getHome()).workSteps;
  return (
    <section className="flow">
      <div className="in">
        {steps ? (
          <SectionHead title="Cara kerja" sub={sub} variant="on-gold" />
        ) : (
          <SectionHead title="Cara kerja" sub={<FlowPills />} variant="on-gold" pills />
        )}
        <FlowSteps steps={steps ?? workSteps} icons={!steps} />
        <PromiseBar waMessage={waMessage} />
      </div>
    </section>
  );
}
