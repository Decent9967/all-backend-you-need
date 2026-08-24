import { domains } from "@/data/framework";
import { checks } from "@/data/sitemap";
import CheckView from "@/components/views/CheckView";

/* 毕业自检面板：这一站的不变量 + 检索题（有则附）。
   全部能不看答案讲清楚，这一站就算毕业。 */

export default function CheckpointPanel({
  domainId,
  checkId,
}: {
  domainId?: string;
  checkId?: string;
}) {
  const domain = domains.find((d) => d.id === domainId);
  if (!domain) return null;
  const check = checkId ? checks[checkId] : undefined;

  return (
    <div className="reveal">
      <header className="domain-view-head">
        <span className="domain-view-id">{domain.id}</span>
        <h2 className="domain-view-name">毕业自检 · {domain.name}</h2>
      </header>

      <p className="view-lede">
        合上材料，凭记忆把下面每条不变量讲清楚——讲不清的那条，就是你还没带走的东西。
      </p>

      <section className="domain-block domain-invariant-panel">
        <h3 className="mini-label mini-label-accent">不变量 · 换任何语言都成立</h3>
        <ul className="domain-invariant-list">
          {domain.invariants.map((inv) => (
            <li key={inv}>{inv}</li>
          ))}
        </ul>
      </section>

      {check ? (
        <section className="domain-block">
          <h3 className="mini-label">检索练习</h3>
          <CheckView check={check} title={null} eyebrow={null} />
        </section>
      ) : null}

      <p className="figure-note">毕业标准不是「读完了」，而是「能复述并解释每条不变量」。</p>
    </div>
  );
}
