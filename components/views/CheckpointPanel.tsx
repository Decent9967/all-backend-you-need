import { domains } from "@/data/framework";
import { checks } from "@/data/sitemap";
import CheckView from "@/components/views/CheckView";
import { useI18n } from "@/components/I18n";
import { enChecks, enDomainMeta, enInvariants } from "@/data/en";

/* 毕业自检面板：这一站的不变量 + 检索题（有则附）。
   全部能不看答案讲清楚，这一站就算毕业。 */

export default function CheckpointPanel({
  domainId,
  checkId,
}: {
  domainId?: string;
  checkId?: string;
}) {
  const { lang, t } = useI18n();
  const domain = domains.find((d) => d.id === domainId);
  const meta = domain && lang === "en" ? enDomainMeta[domain.id] : undefined;
  const invariants = domain && lang === "en" ? enInvariants[domain.id] ?? domain.invariants : domain?.invariants ?? [];
  if (!domain) return null;
  const check = checkId ? ((lang === "en" ? enChecks[checkId] : undefined) ?? checks[checkId]) : undefined;

  return (
    <div className="reveal">
      <header className="domain-view-head">
        <span className="domain-view-id">{domain.id}</span>
        <h2 className="domain-view-name">{t.gateTitle.replace("{name}", meta?.name ?? domain.name)}</h2>
      </header>

      <p className="view-lede">
        {t.gateLede}
      </p>

      <section className="domain-block domain-invariant-panel">
        <h3 className="mini-label mini-label-accent">{t.invariants}</h3>
        <ul className="domain-invariant-list">
          {invariants.map((inv) => (
            <li key={inv}>{inv}</li>
          ))}
        </ul>
      </section>

      {check ? (
        <section className="domain-block">
          <h3 className="mini-label">{t.retrieval}</h3>
          <CheckView check={check} title={null} eyebrow={null} />
        </section>
      ) : null}

      <p className="figure-note">{t.gateNote}</p>
    </div>
  );
}
