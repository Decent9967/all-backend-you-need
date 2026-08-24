import CoverTransform from "@/components/minis/CoverTransform";

const BENEFITS = [
  {
    num: "01",
    key: "定位",
    desc: "把任何实践、规范、依赖放进七个治理域，看清它属于哪一层",
  },
  {
    num: "02",
    key: "判断",
    desc: "用「是否由本性推导」决定要不要做，而不是跟风或拍脑袋",
  },
  {
    num: "03",
    key: "迁移",
    desc: "学一门新后端语言，只补实现层的映射表，概念全部复用",
  },
];

export default function CoverView() {
  return (
    <div className="reveal cover">
      <p className="cover-eyebrow">图 KB-01 · 跨语言后端知识体系</p>
      <h1 className="cover-title">
        后端工程<span className="cover-accent">治理</span>知识框架
      </h1>
      <p className="cover-sub">
        给有几年经验的后端工程师：把零散的工程规范，收敛成一张跨语言的地图，
        和一套判断「要不要做」的标准。
      </p>

      <div className="figure figure-tight cover-fig">
        <CoverTransform />
      </div>
      <p className="cover-quote">
        语言只决定用什么工具治理，<span className="cover-accent">不决定要不要治理</span>。
      </p>

      <div className="benefits">
        {BENEFITS.map((b) => (
          <div key={b.num} className="benefit">
            <span className="benefit-num">{b.num}</span>
            <span className="benefit-key">{b.key}</span>
            <p className="benefit-desc">{b.desc}</p>
          </div>
        ))}
      </div>

      <p className="hook-line">
        你已经在做的模块化、统一日志、CI/CD，大多属于「工程治理」与「可观测性」两个域——
        这张地图补齐的是契约、并发一致性、数据、弹性与安全。
      </p>

      <div className="cover-foot">
        <a className="btn btn-primary" href="#/c1">
          开始 · 22 步 · 约 15 分钟 →
        </a>
        <div className="cover-meta-col">
          <span className="cover-route-text">路线：根基 → 层次 → 七域 → 方法 → 判断</span>
          <span className="cover-coords">坐标系：5 本性 · 3 层 · 7 域 · 17 不变量</span>
        </div>
      </div>
    </div>
  );
}
