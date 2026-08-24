import { calibration } from "@/data/framework";
import FrameworkTree from "@/components/minis/FrameworkTree";

export default function SynthesisView() {
  return (
    <div className="reveal">
      <h2 className="view-title">校准：你的经验在框架里的位置</h2>
      <p className="view-lede">
        左侧把一份典型的三年经验清单放回框架，看清经验集中在哪里、缺口在哪里；
        右侧是一棵可逐支展开的框架全景树——先凭记忆猜一支里有什么，再点开对照。
      </p>
      <div className="synth-cols">
        <div className="calibration">
          {calibration.map((row) => (
            <div key={row.to} className="cal-row">
              <div className="cal-items">
                {row.items.map((item) => (
                  <span key={item} className="cal-chip">
                    {item}
                  </span>
                ))}
              </div>
              <span className="cal-arrow">→</span>
              <span className="cal-to">{row.to}</span>
            </div>
          ))}
          <p className="cal-conclusion">
            经验集中在 <strong>D7 工程治理</strong> 与 <strong>D5 可观测性</strong>；
            框架补齐的是 <strong>D1–D4 与 D6</strong>——契约、并发一致性、数据、弹性与安全。
          </p>
        </div>
        <div className="synthesis-recap">
          <h3 className="mini-label">全景 · 可展开的框架树</h3>
          <FrameworkTree />
          <p className="figure-note">
            每一支都可点击展开或收起；不变量前的墨蓝短标是整套框架最该带走的东西。
          </p>
        </div>
      </div>
      <p className="synthesis-line">
        五个本性推导出七个域；越靠近原理层的知识越稳定；
        不变量是跨语言的本体——学新语言，只补实现层的那张映射表。
      </p>
    </div>
  );
}
