export default function D1ContractDiagram() {
  return (
    <svg viewBox="0 0 1040 340" role="img" aria-label="契约图：调用方与服务之间通过统一响应模型通信，错误也是契约的一部分" className="diagram diagram-sm">
      <title>D1 契约与 API</title>
      <defs>
        <marker id="d1-m" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" className="marker-ink" />
        </marker>
      </defs>
      <text x={520} y={64} textAnchor="middle" className="mn-m">请求 · POST /v1/orders · 所有输入不可信</text>
      <line x1={240} y1={82} x2={794} y2={82} className="mn-arrow" markerEnd="url(#d1-m)" />
      <rect x={40} y={110} width={200} height={150} rx={4} className="mn-r" />
      <text x={140} y={172} textAnchor="middle" className="mn-t2">调用方</text>
      <text x={140} y={198} textAnchor="middle" className="mn-f">CLIENT · 不可信</text>
      <text x={140} y={222} textAnchor="middle" className="mn-s">独立演化</text>
      <rect x={800} y={110} width={200} height={150} rx={4} className="mn-r" />
      <text x={900} y={172} textAnchor="middle" className="mn-t2">服务</text>
      <text x={900} y={198} textAnchor="middle" className="mn-f">SERVICE · 任意语言</text>
      <text x={900} y={222} textAnchor="middle" className="mn-s">L3 可整体替换</text>
      <line x1={240} y1={185} x2={300} y2={185} className="mn-line" />
      <line x1={740} y1={185} x2={800} y2={185} className="mn-line" />
      <rect x={300} y={110} width={440} height={150} rx={4} className="mn-rt" />
      <text x={520} y={144} textAnchor="middle" className="mn-t2">统一响应模型</text>
      <text x={520} y={172} textAnchor="middle" className="mn-m">code · message · data</text>
      <line x1={330} y1={188} x2={710} y2={188} className="mn-line" />
      <text x={520} y={210} textAnchor="middle" className="mn-a">错误码分段：1xxx 参数 · 2xxx 业务 · 5xxx 系统 · 6xxx 第三方</text>
      <text x={520} y={238} textAnchor="middle" className="mn-s">版本化：只加字段，不改语义</text>
      <line x1={246} y1={300} x2={800} y2={300} className="mn-arrow" markerEnd="url(#d1-m)" />
      <text x={520} y={326} textAnchor="middle" className="mn-m">响应 · 错误是契约的一部分，不是意外</text>
    </svg>
  );
}
