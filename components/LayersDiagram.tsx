import { layers } from "@/data/framework";

const X = 40;
const W = 620;
const YS = [40, 152, 288]; // L3, L2, L1 顶部 y

export default function LayersDiagram({ stage = 3 }: { stage?: number }) {
  const bottomL1 = YS[2] + layers[2].height; // 460
  const bracketTop = YS[1]; // L2 顶
  return (
    <svg
      viewBox="0 0 1120 500"
      role="img"
      aria-label="三层知识模型：实现层快变，范式层慢变，原理层几乎不变；通用框架由原理层加范式层构成"
      className="diagram"
    >
      <title>三层知识模型</title>
      <desc>
        三层堆叠：实现层（Spring Boot、Gin、Express、FastAPI）快变；
        范式层（分层架构、12-Factor、SRE）慢变；原理层（幂等、ACID、CAP）几乎不变。
        范式层与原理层合起来是跨语言复用的通用知识框架。
      </desc>

      {layers.map((l, i) => {
        const y = YS[i];
        return (
          <g key={l.id} className={`ly-band ${stage >= i ? "bld bld-on" : "bld"}`}>
            <rect x={X} y={y} width={W} height={l.height} rx={4} />
            <text x={X + 20} y={y + 30} className="ly-meta">
              {l.id} · {l.pace} — {l.paceNote}
            </text>
            <text x={X + 20} y={y + 60} className="ly-name">
              {l.name}
            </text>
            <text x={X + 20} y={y + l.height - 18} className="ly-examples">
              {l.examples.join("  ·  ")}
            </text>
          </g>
        );
      })}

      <g className={stage >= 3 ? "bld bld-on" : "bld"}>
        {/* 学习成本注释：L3 */}
        <line x1={X + W + 8} y1={90} x2={704} y2={90} className="ly-leader" />
        <text x={724} y={86} className="ly-note-strong">
          学一门新语言
        </text>
        <text x={724} y={106} className="ly-note">
          ≈ 只替换最上面这一层
        </text>

        {/* L1 + L2 括号 = 通用框架 */}
        <path
          d={`M 696 ${bracketTop} h 14 V ${bottomL1} h -14`}
          className="ly-bracket"
        />
        <text x={724} y={300} className="ly-bracket-title">
          通用知识框架
        </text>
        <text x={724} y={324} className="ly-note">
          L1 + L2 —— 换语言也复用的部分
        </text>
        <text x={724} y={344} className="ly-note">
          也是本页七域所承载的内容
        </text>
      </g>
    </svg>
  );
}
