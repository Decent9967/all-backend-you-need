import { sources } from "@/data/framework";

export default function EndView() {
  return (
    <div className="reveal end">
      <p className="eyebrow">END OF SHEET</p>
      <h2 className="view-title">读完了。接下来用它。</h2>
      <p className="end-lede">
        这套框架的价值不在阅读，而在使用：下次设计评审拿它过一遍七个域，
        下次故障试着归因到某条不变量，下次学语言只做 L3 映射表。
      </p>
      <ul className="end-sources">
        {sources.map((s) => (
          <li key={s.href}>
            <a href={s.href} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="cover-colophon">KB-01 · V1.0 · 2026-08 · END OF SHEET</p>
    </div>
  );
}
