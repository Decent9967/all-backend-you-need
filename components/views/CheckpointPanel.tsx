import { domains } from "@/data/framework";
import { checks } from "@/data/sitemap";
import CheckView from "@/components/views/CheckView";
import { useI18n } from "@/components/I18n";

/* 毕业自检面板：这一站的不变量 + 检索题（有则附）。
   全部能不看答案讲清楚，这一站就算毕业。 */

export default function CheckpointPanel({
  domainId,
  checkId,
}: {
  domainId?: string;
  checkId?: string;
}) {
  const { t } = useI18n();
  const domain = domains.find((d) => d.id === domainId);
  if (!domain) return null;
  const check = checkId ? checks[checkId] : undefined;

  return (
    <div className="reveal">
      <header className="domain-view-head">
        <span className="domain-view-id">{domain.id}</span>
        <h2 className="domain-view-name">{t.gateTitle.replace("{name}", domain.name)}</h2>
      </header>

      <p className="view-lede">
        {t.gateLede}
      </p>

      <section className="domain-block domain-invariant-panel">
        <h3 className="mini-label mini-label-accent">{t.invariants}</h3>
        <ul className="domain-invariant-list">
          {domain.invariants.map((inv) => (
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
