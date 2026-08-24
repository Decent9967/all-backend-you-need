export default function MethodCycleDiagram() {
  return (
    <svg viewBox="0 0 1040 400" role="img" aria-label="学习循环图：按域学、提炼不变量、L3 映射、事故归因，四步循环往复" className="diagram diagram-sm">
      <title>学习四步循环</title>
      <defs>
        <marker id="mc-m" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" className="marker-ink" />
        </marker>
      </defs>
      <circle cx={520} cy={190} r={105} className="mn-circ" />
      <text x={520} y={196} textAnchor="middle" className="mn-f">LOOP</text>
      <path d="M 572.5 98.9 A 105 105 0 0 1 610.9 137.5" className="mn-arrow" markerEnd="url(#mc-m)" />
      <path d="M 610.9 242.5 A 105 105 0 0 1 572.5 281.1" className="mn-arrow" markerEnd="url(#mc-m)" />
      <path d="M 467.5 281.1 A 105 105 0 0 1 429.1 242.5" className="mn-arrow" markerEnd="url(#mc-m)" />
      <path d="M 429.1 137.5 A 105 105 0 0 1 467.5 98.9" className="mn-arrow" markerEnd="url(#mc-m)" />
      <circle cx={520} cy={85} r={12} className="mn-node" />
      <text x={520} y={89} textAnchor="middle" className="mn-node-t">1</text>
      <text x={520} y={46} textAnchor="middle" className="mn-t2">按域学</text>
      <text x={520} y={66} textAnchor="middle" className="mn-s">每域 2–3 份经典材料</text>
      <circle cx={625} cy={190} r={12} className="mn-node" />
      <text x={625} y={194} textAnchor="middle" className="mn-node-t">2</text>
      <text x={655} y={186} className="mn-t2">提炼不变量</text>
      <text x={655} y={206} className="mn-s">换语言还成立吗？</text>
      <circle cx={520} cy={295} r={12} className="mn-node" />
      <text x={520} y={299} textAnchor="middle" className="mn-node-t">3</text>
      <text x={520} y={336} textAnchor="middle" className="mn-t2">L3 映射</text>
      <text x={520} y={356} textAnchor="middle" className="mn-s">新语言只补实现层</text>
      <circle cx={415} cy={190} r={12} className="mn-node" />
      <text x={415} y={194} textAnchor="middle" className="mn-node-t">4</text>
      <text x={385} y={186} textAnchor="end" className="mn-t2">事故归因</text>
      <text x={385} y={206} textAnchor="end" className="mn-s">故障定位到某条不变量</text>
    </svg>
  );
}
