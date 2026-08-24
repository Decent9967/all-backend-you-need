import { derivationEdges, domains, natures } from "@/data/framework";

/* 起点面板：后端是什么 + 五个本性 → 七个域的推导关系 */

export default function IntroPanel({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <div className="reveal">
      <header className="domain-view-head">
        <span className="domain-view-id">START</span>
        <h2 className="domain-view-name">后端是什么</h2>
      </header>

      <p className="view-lede">
        后端工程的全部复杂性，来自五个绕不开的本性；七个治理域不是并列的分类，
        而是这五个本性一路推导出来的结果。这张图按学习顺序组织——沿左列里程碑一站站走。
      </p>

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
                <p className="intro-nature-name">{n.name}</p>
                <p className="intro-nature-desc">{n.desc}</p>
                <p className="intro-nature-targets">
                  推导出：
                  {targets.map((d) => (
                    <button
                      key={d!.id}
                      type="button"
                      className="intro-target"
                      onClick={() => onOpen(d!.id.toLowerCase())}
                    >
                      {d!.name}
                    </button>
                  ))}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="figure-note">
        每一站的组框副标题都标着「源 N·」——记住推导关系，忘了任何一个域在解决什么问题时，
        回到这条链上找。
      </p>
    </div>
  );
}
