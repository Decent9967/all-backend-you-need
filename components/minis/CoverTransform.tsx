const KNOWN = ["统一异常处理", "统一日志", "前端上报", "模块化", "避免循环依赖", "CI/CD"];

const SCATTER: { x: number; y: number; r: number }[] = [
  { x: 4, y: 6, r: -3 },
  { x: 118, y: 2, r: 2 },
  { x: 214, y: 12, r: -1 },
  { x: 14, y: 58, r: 1 },
  { x: 148, y: 66, r: -2 },
  { x: 56, y: 106, r: 2 },
];

const ROWS: { name: string; chips: { t: string; n?: boolean }[] }[] = [
  { name: "契约与 API", chips: [{ t: "统一异常处理" }, { t: "错误码体系", n: true }] },
  { name: "并发一致性", chips: [{ t: "幂等 token", n: true }] },
  { name: "数据与状态", chips: [{ t: "迁移版本化", n: true }] },
  { name: "分布式弹性", chips: [{ t: "超时 · 熔断", n: true }] },
  { name: "可观测性", chips: [{ t: "统一日志" }, { t: "前端上报" }] },
  { name: "安全", chips: [{ t: "对象级越权", n: true }] },
  { name: "工程治理", chips: [{ t: "模块化" }, { t: "避免循环依赖" }, { t: "CI/CD" }] },
];

export default function CoverTransform() {
  return (
    <div className="transform-fig">
      <div className="tf-side">
        <div className="tf-head">现在 · 散落</div>
        <div className="tf-scatter">
          {KNOWN.map((k, i) => (
            <span
              key={k}
              className="tf-chip"
              style={{
                position: "absolute",
                left: SCATTER[i].x,
                top: SCATTER[i].y,
                transform: `rotate(${SCATTER[i].r}deg)`,
              }}
            >
              {k}
            </span>
          ))}
        </div>
      </div>
      <div className="tf-mid" aria-hidden="true">
        <span className="tf-arrow">→</span>
        <span className="tf-mid-label">归类 · 补缺</span>
      </div>
      <div className="tf-side">
        <div className="tf-head tf-head-accent">22 步之后 · 归位</div>
        <div className="tf-rows">
          {ROWS.map((row) => (
            <div key={row.name} className="tf-row">
              <span className="tf-domain">{row.name}</span>
              <span className="tf-row-chips">
                {row.chips.map((c) => (
                  <span key={c.t} className={`tf-chip${c.n ? " tf-new" : ""}`}>
                    {c.t}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
        <div className="tf-legend">
          <span className="tf-chip">实线 = 你已有的</span>
          <span className="tf-chip tf-new">虚线 = 补齐的</span>
        </div>
      </div>
    </div>
  );
}
