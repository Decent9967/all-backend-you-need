import { derivationEdges, domains, natures } from "@/data/framework";

/* 单个本性的抽屉面板：本性 + 它推导出的治理域（可点击跳转） */

export default function NaturePanel({
  natureId,
  onOpen,
}: {
  natureId: string;
  onOpen: (id: string) => void;
}) {
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
        <h2 className="domain-view-name">{n.name}</h2>
      </header>

      <section className="domain-block">
        <h3 className="mini-label">本性 · 任何后端系统都逃不掉</h3>
        <p className="domain-thesis">{n.desc}。</p>
      </section>

      <section className="domain-block">
        <h3 className="mini-label">由此推导出的治理域 · 点击查看</h3>
        <ul className="chips chips-click">
          {derived.map((d) => (
            <li key={d.id}>
              <button type="button" onClick={() => onOpen(d.id.toLowerCase())}>
                {d.id} {d.name}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <p className="figure-note">
        这条本性不接受妥协——由它推出的治理动作是必然推论，而不是行业惯例。
        换任何语言、任何框架，它都在那里。
      </p>
    </div>
  );
}
