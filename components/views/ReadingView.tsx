import { readingList } from "@/data/framework";

export default function ReadingView() {
  return (
    <div className="reveal">
      <h2 className="view-title">按域阅读清单</h2>
      <p className="view-lede">
        每域 2–3 份材料足够建立骨架。按需取用，不必读完再前进。
      </p>
      <div className="metro">
        {readingList.map((r) => (
          <div key={r.domain} className="metro-row">
            <span className="metro-stop">{r.domain.slice(1)}</span>
            <span className="metro-name">{r.name}</span>
            <span className="metro-materials">{r.materials.join(" · ")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
