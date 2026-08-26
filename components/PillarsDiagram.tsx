import { useI18n } from "@/components/I18n";

const PANELS_EN = [
  { key: "metrics", head: "METRICS", name: "Metrics", q: 'answers “where did it break?”', note: "RED: rate · errors · duration" },
  { key: "logs", head: "LOGS", name: "Logs", q: 'answers “why did it break?”', note: "structured JSON · always carries traceId" },
  { key: "traces", head: "TRACES", name: "Traces", q: 'answers “which hop broke?”', note: "OpenTelemetry · spans chain the call path" },
];

const PANELS = [
  {
    key: "metrics",
    head: "METRICS",
    name: "指标",
    q: "它回答「哪里坏了？」",
    note: "RED：速率 · 错误率 · 延迟",
  },
  {
    key: "logs",
    head: "LOGS",
    name: "日志",
    q: "它回答「为什么坏？」",
    note: "结构化 JSON · 必带 traceId",
  },
  {
    key: "traces",
    head: "TRACES",
    name: "追踪",
    q: "它回答「链路哪一跳坏？」",
    note: "OpenTelemetry · span 串联调用链",
  },
];

const XS = [40, 380, 720];
const W = 312;
const Y = 40;
const H = 176;

export default function PillarsDiagram() {
  const { lang } = useI18n();
  const L = (zh: string, en: string) => (lang === "en" ? en : zh);

  return (
    <svg
      viewBox="0 0 1040 300"
      role="img"
      aria-label={L("可观测性三支柱：指标回答哪里坏了，日志回答为什么坏，追踪回答链路哪一跳坏；traceId 从前端贯穿到数据库", "Three pillars: metrics say where, logs say why, traces say which hop; the traceId threads from frontend to database")}
      className="diagram"
    >
      <title>{L("可观测性三支柱", "The three pillars of observability")}</title>
      <defs>
        <marker
          id="pil-arrow"
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L8,4 L0,8 z" className="marker-accent" />
        </marker>
      </defs>

      {(lang === "en" ? PANELS_EN : PANELS).map((p, i) => (
        <g key={p.key} className="pl-panel">
          <rect x={XS[i]} y={Y} width={W} height={H} rx={4} />
          <text x={XS[i] + 20} y={Y + 30} className="pl-head">
            {p.head}
          </text>
          <text x={XS[i] + 20} y={Y + 66} className="pl-name">
            {p.name}
          </text>
          <line
            x1={XS[i] + 20}
            y1={Y + 84}
            x2={XS[i] + W - 20}
            y2={Y + 84}
            className="pl-rule"
          />
          <text x={XS[i] + 20} y={Y + 116} className="pl-q">
            {p.q}
          </text>
          <text x={XS[i] + 20} y={Y + 142} className="pl-note">
            {p.note}
          </text>
        </g>
      ))}

      {/* traceId 贯穿线 */}
      <text x={40} y={270} className="pl-endpoint">
        {L("前端", "frontend")}
      </text>
      <line
        x1={80}
        y1={266}
        x2={916}
        y2={266}
        className="pl-trace"
        markerEnd="url(#pil-arrow)"
      />
      <text x={1000} y={270} textAnchor="end" className="pl-endpoint">
        {L("数据库", "database")}
      </text>
      <text x={498} y={254} textAnchor="middle" className="pl-trace-label">
        {L("traceId 自前端生成 → 贯穿网关 · 服务 · 数据库", "traceId generated at the frontend → through gateway · services · database")}
      </text>
    </svg>
  );
}
