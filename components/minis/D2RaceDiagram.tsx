import { useI18n } from "@/components/I18n";

export default function D2RaceDiagram({ stage = 5 }: { stage?: number }) {
  const { lang } = useI18n();
  const L = (zh: string, en: string) => (lang === "en" ? en : zh);

  const on = (n: number) => stage >= n;
  return (
    <svg viewBox="0 0 1040 300" role="img" aria-label={L("竞态图：两个请求同时先读后写，A 的更新被 B 覆盖", "Race map: two concurrent read-then-writes; B overwrites A's update")} className="diagram diagram-sm">
      <title>{L("D2 并发与一致性 · 先检查后写入的竞态", "D2 Concurrency · the check-then-write race")}</title>
      <defs>
        <marker id="d2-m" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" className="marker-ink" />
        </marker>
      </defs>
      <g className={on(5) ? "bld bld-on" : "bld"}>
        <rect x={200} y={36} width={680} height={164} className="mn-racewin" />
        <text x={540} y={24} textAnchor="middle" className="mn-a">{L("竞态窗口", "race window")}</text>
      </g>
      <text x={40} y={64} className="mn-t">{L("请求 A", "Request A")}</text>
      <line x1={120} y1={70} x2={1000} y2={70} className="mn-line" />
      <g className={on(1) ? "bld bld-on" : "bld"}>
        <circle cx={240} cy={70} r={5} className="mn-ev" />
        <text x={240} y={52} textAnchor="middle" className="mn-m">read x=1</text>
      </g>
      <g className={on(3) ? "bld bld-on" : "bld"}>
        <circle cx={660} cy={70} r={5} className="mn-ev" />
        <text x={660} y={52} textAnchor="middle" className="mn-m">write x=2</text>
      </g>
      <text x={40} y={144} className="mn-t">{L("请求 B", "Request B")}</text>
      <line x1={120} y1={150} x2={1000} y2={150} className="mn-line" />
      <g className={on(2) ? "bld bld-on" : "bld"}>
        <circle cx={440} cy={150} r={5} className="mn-ev" />
        <text x={440} y={132} textAnchor="middle" className="mn-m">read x=1</text>
      </g>
      <g className={on(4) ? "bld bld-on" : "bld"}>
        <circle cx={880} cy={150} r={5} className="mn-ev mn-ev-lost" />
        <text x={880} y={132} textAnchor="middle" className="mn-m">write x=3</text>
      </g>
      <line x1={120} y1={240} x2={994} y2={240} className="mn-arrow" markerEnd="url(#d2-m)" />
      <text x={240} y={264} textAnchor="middle" className="mn-f">t1</text>
      <text x={440} y={264} textAnchor="middle" className="mn-f">t2</text>
      <text x={660} y={264} textAnchor="middle" className="mn-f">t3</text>
      <text x={880} y={264} textAnchor="middle" className="mn-f">t4</text>
      <text x={120} y={292} className="mn-s">{L("A 基于旧值 1 的写入被 B 覆盖 —— lost update", "A's write based on stale 1 is overwritten by B — lost update")}</text>
    </svg>
  );
}
