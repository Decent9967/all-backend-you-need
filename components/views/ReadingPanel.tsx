import { readingList } from "@/data/framework";

/* 阅读清单面板：传入 domainId 只列该域；不传则列出全部（里程碑入口） */

export default function ReadingPanel({ domainId }: { domainId?: string }) {
  const items = domainId ? readingList.filter((x) => x.domain === domainId) : readingList;
  if (!items.length) return null;

  return (
    <div className="reveal">
      {items.map((r) => (
        <section key={r.domain} className={items.length > 1 ? "checks-item" : undefined}>
          <header className="domain-view-head">
            <span className="domain-view-id">{r.domain}</span>
            <h2 className="domain-view-name">{r.name}</h2>
          </header>
          <section className="domain-block">
            <h3 className="mini-label">经典材料 · 先读这几份建骨架</h3>
            <ul className="read-list">
              {r.materials.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </section>
        </section>
      ))}

      <p className="figure-note">
        按域学、不按技术学：每个域先用 2–3 份经典把骨架立起来，
        细节在遇到真实问题时再回来补。
      </p>
    </div>
  );
}
