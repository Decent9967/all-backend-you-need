import { derivationEdges, domains, natures } from "@/data/framework";
import { useI18n } from "@/components/I18n";
import { enNatureDesc } from "@/data/en";

/* 单个本性的抽屉面板：本性 + 它推导出的治理域（可点击跳转） */

export default function NaturePanel({
  natureId,
  onOpen,
}: {
  natureId: string;
  onOpen: (id: string) => void;
}) {
  const { lang, t, tr } = useI18n();
  const n = natures.find((x) => x.id === natureId);
  if (!n) return null;
  const derived = derivationEdges
    .filter(([from]) => from === n.id)
    .map(([, to]) => domains.find((d) => d.id === to)!)
    .filter(Boolean);

  return (
    <div className="reveal">
      <header className="domain-view-head">
        <span className="domain-view-id">{n.id}</span>
        <h2 className="domain-view-name">{tr(n.name)}</h2>
      </header>

      <section className="domain-block">
        <h3 className="mini-label">{t.natureLabel}</h3>
        <p className="domain-thesis">{(lang === "en" ? enNatureDesc[n.id] ?? n.desc : n.desc)}.</p>
      </section>

      <section className="domain-block">
        <h3 className="mini-label">{t.natureDerived}</h3>
        <ul className="chips chips-click">
          {derived.map((d) => (
            <li key={d.id}>
              <button type="button" onClick={() => onOpen(d.id.toLowerCase())}>
                {d.id} {tr(d.name)}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="domain-block">
        <h3 className="mini-label">{t.natureCanvas}</h3>
        <ul className="chips chips-click">
          <li>
            <button type="button" onClick={() => onOpen("intro")}>
              {t.natureCanvasBtn}
            </button>
          </li>
        </ul>
      </section>

      <p className="figure-note">{t.natureClosing}</p>
    </div>
  );
}
