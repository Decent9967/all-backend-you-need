export default function D7DependencyDiagram() {
  return (
    <svg viewBox="0 0 1040 310" role="img" aria-label="依赖规则图：分层单向依赖只能向下；循环依赖不可测试，正确做法是无环单向，并用机器门禁在 CI 强制" className="diagram diagram-sm">
      <title>D7 工程治理 · 依赖规则与机器门禁</title>
      <defs>
        <marker id="d7-m" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" className="marker-ink" />
        </marker>
      </defs>
      <text x={40} y={52} className="mn-t">分层 · 依赖只能向下</text>
      <rect x={40} y={72} width={220} height={44} rx={4} className="mn-r" />
      <text x={150} y={100} textAnchor="middle" className="mn-t">Controller · 接口层</text>
      <rect x={40} y={148} width={220} height={44} rx={4} className="mn-r" />
      <text x={150} y={176} textAnchor="middle" className="mn-t">Service · 业务层</text>
      <rect x={40} y={224} width={220} height={44} rx={4} className="mn-r" />
      <text x={150} y={252} textAnchor="middle" className="mn-t">Repository · 数据层</text>
      <line x1={150} y1={116} x2={150} y2={142} className="mn-arrow" markerEnd="url(#d7-m)" />
      <line x1={150} y1={192} x2={150} y2={218} className="mn-arrow" markerEnd="url(#d7-m)" />
      <text x={150} y={290} textAnchor="middle" className="mn-s">自上而下 · 无环 · common 只被依赖</text>
      <text x={540} y={52} className="mn-t">循环依赖 = 不可测试</text>
      <rect x={540} y={76} width={90} height={44} rx={4} className="mn-rd" />
      <text x={585} y={104} textAnchor="middle" className="mn-t">A</text>
      <rect x={720} y={76} width={90} height={44} rx={4} className="mn-rd" />
      <text x={765} y={104} textAnchor="middle" className="mn-t">B</text>
      <path d="M 632 86 C 660 60 690 60 718 86" className="mn-arrow" markerEnd="url(#d7-m)" />
      <path d="M 718 112 C 690 138 660 138 632 112" className="mn-arrow" markerEnd="url(#d7-m)" />
      <text x={675} y={104} textAnchor="middle" className="mn-x">✕</text>
      <rect x={540} y={190} width={90} height={44} rx={4} className="mn-r" />
      <text x={585} y={218} textAnchor="middle" className="mn-t">A</text>
      <rect x={720} y={190} width={90} height={44} rx={4} className="mn-r" />
      <text x={765} y={218} textAnchor="middle" className="mn-t">B</text>
      <line x1={634} y1={212} x2={716} y2={212} className="mn-arrow" markerEnd="url(#d7-m)" />
      <text x={840} y={218} className="mn-ok">✓</text>
      <rect x={540} y={262} width={460} height={36} rx={4} className="mn-rd" />
      <text x={770} y={286} textAnchor="middle" className="mn-m">机器门禁：ArchUnit / dependency-cruiser / lint → CI 拒绝</text>
    </svg>
  );
}
