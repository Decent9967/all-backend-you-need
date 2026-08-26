import { useI18n } from "@/components/I18n";

export default function D1ContractDiagram() {
  const { lang } = useI18n();
  const L = (zh: string, en: string) => (lang === "en" ? en : zh);

  return (
    <svg viewBox="0 0 1040 340" role="img" aria-label={L("契约图：调用方与服务之间通过统一响应模型通信，错误也是契约的一部分", "Contract map: caller and service talk through a unified response model; errors are part of the contract")} className="diagram diagram-sm">
      <title>{L("D1 契约与 API", "D1 Contracts & APIs")}</title>
      <defs>
        <marker id="d1-m" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" className="marker-ink" />
        </marker>
      </defs>
      <text x={520} y={64} textAnchor="middle" className="mn-m">{L("请求 · POST /v1/orders · 所有输入不可信", "Request · POST /v1/orders · all input untrusted")}</text>
      <line x1={240} y1={82} x2={794} y2={82} className="mn-arrow" markerEnd="url(#d1-m)" />
      <rect x={40} y={110} width={200} height={150} rx={4} className="mn-r" />
      <text x={140} y={172} textAnchor="middle" className="mn-t2">{L("调用方", "Caller")}</text>
      <text x={140} y={198} textAnchor="middle" className="mn-f">{L("CLIENT · 不可信", "CLIENT · untrusted")}</text>
      <text x={140} y={222} textAnchor="middle" className="mn-s">{L("独立演化", "evolves independently")}</text>
      <rect x={800} y={110} width={200} height={150} rx={4} className="mn-r" />
      <text x={900} y={172} textAnchor="middle" className="mn-t2">{L("服务", "Service")}</text>
      <text x={900} y={198} textAnchor="middle" className="mn-f">{L("SERVICE · 任意语言", "SERVICE · any language")}</text>
      <text x={900} y={222} textAnchor="middle" className="mn-s">{L("L3 可整体替换", "L3 fully replaceable")}</text>
      <line x1={240} y1={185} x2={300} y2={185} className="mn-line" />
      <line x1={740} y1={185} x2={800} y2={185} className="mn-line" />
      <rect x={300} y={110} width={440} height={150} rx={4} className="mn-rt" />
      <text x={520} y={144} textAnchor="middle" className="mn-t2">{L("统一响应模型", "Response envelope")}</text>
      <text x={520} y={172} textAnchor="middle" className="mn-m">code · message · data</text>
      <line x1={330} y1={188} x2={710} y2={188} className="mn-line" />
      <text x={520} y={210} textAnchor="middle" className="mn-a">{L("错误码分段：1xxx 参数 · 2xxx 业务 · 5xxx 系统 · 6xxx 第三方", "Error bands: 1xxx params · 2xxx business · 5xxx system · 6xxx third-party")}</text>
      <text x={520} y={238} textAnchor="middle" className="mn-s">{L("版本化：只加字段，不改语义", "Versioning: add fields, never change semantics")}</text>
      <line x1={246} y1={300} x2={800} y2={300} className="mn-arrow" markerEnd="url(#d1-m)" />
      <text x={520} y={326} textAnchor="middle" className="mn-m">{L("响应 · 错误是契约的一部分，不是意外", "Response · errors are part of the contract, not accidents")}</text>
    </svg>
  );
}
