import { derivationEdges, domains, natures } from "@/data/framework";
import { useI18n } from "@/components/I18n";
import { enNatureDesc } from "@/data/en";

/* 起点面板：后端是什么 + 五个本性 → 七个域的推导关系 */

export default function IntroPanel({ onOpen }: { onOpen: (id: string) => void }) {
  const { lang, t, tr } = useI18n();
  return (
    <div className="reveal">
      <header className="domain-view-head">
        <span className="domain-view-id">START</span>
        <h2 className="domain-view-name">{tr("后端是什么")}</h2>
      </header>

      <p className="view-lede">{t.introLede}</p>

      <ul className="intro-natures">
        {natures.map((n) => {
          const targets = derivationEdges
            .filter(([f]) => f === n.id)
            .map(([, t]) => domains.find((d) => d.id === t))
            .filter(Boolean);
          return (
            <li key={n.id}>
              <span className="intro-nature-id">{n.id}</span>
              <div>
                <p className="intro-nature-name">{tr(n.name)}</p>
                <p className="intro-nature-desc">{lang === "en" ? enNatureDesc[n.id] ?? n.desc : n.desc}</p>
                <p className="intro-nature-targets">
                  {t.introDerives}
                  {targets.map((d) => (
                    <button
                      key={d!.id}
                      type="button"
                      className="intro-target"
                      onClick={() => onOpen(d!.id.toLowerCase())}
                    >
                      {tr(d!.name)}
                    </button>
                  ))}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="figure-note">{t.introNote}</p>
    </div>
  );
}
