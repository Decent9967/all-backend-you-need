export default function NaturesContextDiagram() {
  return (
    <svg viewBox="0 0 1040 328" role="img" aria-label="系统上下文图：任意后端系统被五个本性别包围——不可信网络的调用方、并发请求、持久状态、会失败的第三方依赖、以及时间轴上的长期演进" className="diagram diagram-sm">
      <title>五个本性 · 任意后端系统的上下文</title>
      <defs>
        <marker id="nc-m" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" className="marker-ink" />
        </marker>
        <marker id="nc-ma" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" className="marker-accent" />
        </marker>
      </defs>
      <rect x={40} y={60} width={170} height={52} rx={4} className="mn-r" />
      <text x={52} y={78} className="mn-badge">N1</text>
      <text x={125} y={86} textAnchor="middle" className="mn-t">调用方</text>
      <text x={125} y={104} textAnchor="middle" className="mn-f">不可信网络</text>
      <line x1={210} y1={86} x2={394} y2={166} className="mn-arrow" markerEnd="url(#nc-m)" />
      <text x={40} y={150} className="mn-badge">N2</text>
      <text x={40} y={168} className="mn-m">并发请求 ×N</text>
      <line x1={210} y1={176} x2={394} y2={170} className="mn-arrow" markerEnd="url(#nc-m)" />
      <line x1={210} y1={194} x2={394} y2={182} className="mn-arrow" markerEnd="url(#nc-m)" />
      <line x1={210} y1={212} x2={394} y2={194} className="mn-arrow" markerEnd="url(#nc-m)" />
      <rect x={400} y={140} width={240} height={88} rx={4} className="mn-core" />
      <text x={520} y={178} textAnchor="middle" className="mn-core-t">任意后端系统</text>
      <text x={520} y={202} textAnchor="middle" className="mn-f">ANY BACKEND · ANY LANGUAGE</text>
      <rect x={830} y={140} width={170} height={68} rx={4} className="mn-r" />
      <text x={842} y={160} className="mn-badge">N3</text>
      <text x={915} y={180} textAnchor="middle" className="mn-t">持久状态</text>
      <text x={915} y={200} textAnchor="middle" className="mn-f">活得比进程久</text>
      <line x1={646} y1={174} x2={824} y2={174} className="mn-arrow" markerStart="url(#nc-ma)" markerEnd="url(#nc-ma)" />
      <rect x={830} y={40} width={170} height={52} rx={4} className="mn-rd" />
      <text x={842} y={58} className="mn-badge">N4</text>
      <text x={915} y={70} textAnchor="middle" className="mn-t">第三方依赖</text>
      <text x={915} y={88} textAnchor="middle" className="mn-f">一定会失败</text>
      <line x1={830} y1={66} x2={646} y2={142} className="mn-arrow mn-dash" markerEnd="url(#nc-m)" />
      <text x={340} y={278} className="mn-badge">N5</text>
      <line x1={400} y1={284} x2={636} y2={284} className="mn-acc-line" markerEnd="url(#nc-ma)" />
      <line x1={520} y1={228} x2={520} y2={284} className="mn-line mn-dash" />
      <text x={520} y={310} textAnchor="middle" className="mn-m">7×24 运行 · 团队长期演进</text>
    </svg>
  );
}
