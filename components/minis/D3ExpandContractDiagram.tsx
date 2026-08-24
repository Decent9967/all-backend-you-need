export default function D3ExpandContractDiagram() {
  const cards = [
    { x: 40, label: "阶段一 · 加列", cols: ["id", "name", "new"], note: "新列可空 · 老代码不感知", newStyle: "dash" },
    { x: 400, label: "阶段二 · 双写", cols: ["id", "name", "new"], note: "新旧双写 · 数据回填", newStyle: "solid" },
    { x: 760, label: "阶段三 · 删旧列", cols: ["id", "new"], note: "确认无旧读 · 再删除", newStyle: "solid", struck: "name" },
  ];
  return (
    <svg viewBox="0 0 1040 250" role="img" aria-label="expand-contract 三阶段：加列、双写、删旧列，实现零停机 schema 变更" className="diagram diagram-sm">
      <title>D3 数据与状态 · expand-contract</title>
      <defs>
        <marker id="d3-m" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" className="marker-ink" />
        </marker>
      </defs>
      {cards.map((c, ci) => (
        <g key={c.label}>
          <text x={c.x + 120} y={40} textAnchor="middle" className="mn-t">{c.label}</text>
          <rect x={c.x} y={56} width={240} height={140} rx={4} className="mn-r" />
          <text x={c.x + 16} y={82} className="mn-f">orders</text>
          <line x1={c.x} y1={92} x2={c.x + 240} y2={92} className="mn-line" />
          {c.struck === "name" ? (
            <g>
              <rect x={c.x + 90} y={104} width={60} height={72} rx={2} className="mn-rd mn-strike" />
              <text x={c.x + 120} y={146} textAnchor="middle" className="mn-f">name</text>
              <rect x={c.x + 20} y={104} width={60} height={72} rx={2} className="mn-r" />
              <text x={c.x + 50} y={146} textAnchor="middle" className="mn-m">id</text>
            </g>
          ) : (
            <g>
              <rect x={c.x + 20} y={104} width={60} height={72} rx={2} className="mn-r" />
              <text x={c.x + 50} y={146} textAnchor="middle" className="mn-m">id</text>
              <rect x={c.x + 90} y={104} width={60} height={72} rx={2} className="mn-r" />
              <text x={c.x + 120} y={146} textAnchor="middle" className="mn-m">name</text>
            </g>
          )}
          {c.cols.includes("new") ? (
            <g>
              <rect x={c.x + 160} y={104} width={60} height={72} rx={2} className={c.newStyle === "solid" ? "mn-rt" : "mn-rd"} />
              <text x={c.x + 190} y={146} textAnchor="middle" className="mn-a">new</text>
            </g>
          ) : null}
          <text x={c.x + 120} y={224} textAnchor="middle" className="mn-s">{c.note}</text>
          {ci < 2 ? (
            <g>
              <line x1={c.x + 246} y1={126} x2={c.x + 354} y2={126} className="mn-arrow" markerEnd="url(#d3-m)" />
              <text x={c.x + 300} y={112} textAnchor="middle" className="mn-f">发布</text>
            </g>
          ) : null}
        </g>
      ))}
    </svg>
  );
}
