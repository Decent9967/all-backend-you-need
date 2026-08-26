import { useI18n } from "@/components/I18n";

export default function D4BreakerDiagram({ stage = 3 }: { stage?: number }) {
  const { lang } = useI18n();
  const L = (zh: string, en: string) => (lang === "en" ? en : zh);

  const on = (n: number) => stage >= n;
  return (
    <svg viewBox="0 0 1040 300" role="img" aria-label={L("熔断器状态机：关闭态连续失败达到阈值进入打开态，冷却后半开探测，成功恢复", "Breaker state machine: consecutive failures in closed cross a threshold to open; after cooldown, half-open probes; success restores")} className="diagram diagram-sm">
      <title>{L("D4 分布式弹性 · 熔断器状态机", "D4 Resilience · the breaker state machine")}</title>
      <defs>
        <marker id="d4-m" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" className="marker-ink" />
        </marker>
      </defs>
      <circle cx={170} cy={140} r={40} className="mn-state" />
      <text x={170} y={136} textAnchor="middle" className="mn-t2">{L("关闭", "Closed")}</text>
      <text x={170} y={158} textAnchor="middle" className="mn-f">CLOSED</text>
      <text x={170} y={210} textAnchor="middle" className="mn-s">{L("放行请求 · 统计连续失败", "pass requests · count consecutive failures")}</text>
      <g className={on(1) ? "bld bld-on" : "bld"}>
        <circle cx={520} cy={140} r={40} className="mn-state mn-state-open" />
        <text x={520} y={136} textAnchor="middle" className="mn-t2">{L("打开", "Open")}</text>
        <text x={520} y={158} textAnchor="middle" className="mn-f">OPEN</text>
        <text x={520} y={210} textAnchor="middle" className="mn-s">{L("直接失败 / 降级 · 冷却计时", "fail fast / degrade · cooldown timer")}</text>
        <path d="M 218 112 C 300 72 400 72 468 112" className="mn-arrow" markerEnd="url(#d4-m)" />
        <text x={345} y={64} textAnchor="middle" className="mn-m">{L("连续失败 ≥ 阈值", "consecutive failures ≥ threshold")}</text>
      </g>
      <g className={on(2) ? "bld bld-on" : "bld"}>
        <circle cx={870} cy={140} r={40} className="mn-state" />
        <text x={870} y={136} textAnchor="middle" className="mn-t2">{L("半开", "Half-open")}</text>
        <text x={870} y={158} textAnchor="middle" className="mn-f">HALF-OPEN</text>
        <text x={870} y={210} textAnchor="middle" className="mn-s">{L("放行少量探测 · 失败回 OPEN", "a few probes through · failure returns to OPEN")}</text>
        <path d="M 572 112 C 650 72 750 72 818 112" className="mn-arrow" markerEnd="url(#d4-m)" />
        <text x={695} y={64} textAnchor="middle" className="mn-m">{L("冷却结束", "cooldown ends")}</text>
      </g>
      <g className={on(3) ? "bld bld-on" : "bld"}>
        <path d="M 826 168 C 740 244 300 244 214 168" className="mn-arrow" markerEnd="url(#d4-m)" />
        <text x={520} y={262} textAnchor="middle" className="mn-m">{L("探测成功 → 恢复", "probe succeeds → recover")}</text>
      </g>
    </svg>
  );
}
