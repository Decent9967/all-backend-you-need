export type Nature = {
  id: string;
  name: string;
  desc: string;
};

export type Domain = {
  id: string;
  name: string;
  en: string;
  sources: string[]; // 推导自哪些本性，如 ["N1"]
  problem: string;   // 该域要解决的根本问题
  concepts: string[]; // 核心概念（跨语言词汇）
  invariants: string[]; // 不变量：换任何语言都成立的规律
  cross?: string;    // 与既有经验的映射
  wide?: boolean;    // 是否通栏展示
};

export type Layer = {
  id: string;
  name: string;
  pace: string;      // 变化速度
  paceNote: string;
  examples: string[];
  height: number;    // 示意图中的层厚（越稳定越厚）
};

export const natures: Nature[] = [
  { id: "N1", name: "对外提供服务", desc: "请求来自不可信的网络" },
  { id: "N2", name: "并发处理", desc: "多个请求同时到达，共享状态" },
  { id: "N3", name: "持久状态", desc: "数据活得比进程久" },
  { id: "N4", name: "依赖他系统", desc: "网络、DB、第三方一定会失败" },
  { id: "N5", name: "长期演进", desc: "团队维护，在生产环境 7×24 运行" },
];

// 推导边：本性 → 治理域
export const derivationEdges: [string, string][] = [
  ["N1", "D1"],
  ["N1", "D6"],
  ["N2", "D2"],
  ["N3", "D3"],
  ["N4", "D4"],
  ["N4", "D5"],
  ["N5", "D5"],
  ["N5", "D7"],
];

export const domains: Domain[] = [
  {
    id: "D1",
    name: "契约与 API",
    en: "Contract & API",
    sources: ["N1"],
    problem: "两个独立演化的系统，如何协作而不互相破坏。",
    concepts: ["统一响应模型", "错误码体系", "版本化", "幂等键", "分页", "Schema 前向 / 后向兼容", "入参声明式校验", "OpenAPI", "通信范式选择", "消息投递语义", "契约测试", "HTTP 缓存语义"],
    invariants: [
      "契约一旦发布就是负债：只能加字段，不能改语义。",
      "错误是契约的一部分，不是意外。",
      "所有输入不可信。",
      "消息系统只保证 at-least-once：真正的 exactly-once 由消费端幂等拼出来。",
    ],
    cross: "统一异常处理 ≈ 本域与 D7 的交叉点",
  },
  {
    id: "D2",
    name: "并发与一致性",
    en: "Concurrency",
    sources: ["N2"],
    problem: "多个请求同时读写同一份状态时，如何保持正确。",
    concepts: ["事务与隔离级别", "乐观锁 · 悲观锁", "竞态条件", "唯一约束", "幂等 token", "状态机", "分布式锁", "分布式事务与 Saga", "定时任务与调度"],
    invariants: [
      "先检查后写入，必然存在竞态窗口。",
      "网络会重试，每个写操作都可能执行两次——幂等是写接口的默认要求，不是加分项。",
      "跨服务没有原子提交：每个分布式事务的参与方，都要写得出自己的补偿动作。",
      "定时任务默认会重入和并发：不幂等、不互斥的后台任务，是埋在生产里的雷。",
    ],
  },
  {
    id: "D3",
    name: "数据与状态",
    en: "Data & State",
    sources: ["N3"],
    problem: "让数据活得比进程久，并且能安全地演变。",
    concepts: ["数据建模", "金额与精度", "时间与时区", "迁移版本化", "expand-contract", "缓存一致性", "软删除", "审计字段", "索引与查询计划", "复制与分片", "事件发件箱（outbox）", "备份与恢复", "无状态与状态外置", "数据生命周期", "流处理与批处理"],
    invariants: [
      "schema 变更与代码发布解耦：新旧版本代码必须能跑在同一个 schema 上。",
      "缓存与数据库是两个系统，不一致窗口只能缩短或容忍，不能消灭。",
      "没做过恢复演练的备份，等于没有备份。",
      "数据只进不出，系统终将被自己的历史压垮。",
      "金额永远用整数或定点表示：浮点算钱，分币必错。",
      "时间统一 UTC 存储、ISO 8601 传输，本地化只发生在展示层。",
    ],
  },
  {
    id: "D4",
    name: "分布式弹性",
    en: "Resilience",
    sources: ["N4"],
    problem: "把「依赖一定会失败」当作常态来设计，而不是异常。",
    concepts: ["超时预算", "重试 · 退避 · 抖动", "熔断", "舱壁隔离", "降级", "背压", "最终一致性", "限流与配额", "负载均衡与网关", "优雅停机与健康检查", "容量规划与压测", "故障演练（混沌工程）"],
    invariants: [
      "没有超时的调用等于随机挂死。",
      "每层各自重试，会指数放大下游流量（重试风暴）。",
      "超时从端到端预算倒推分配，而不是各层拍脑袋。",
      "过载面前，主动拒绝一部分请求是保护，让所有请求一起超时才是事故。",
      "没被演练过的弹性设计，只是配置文件里的装饰。",
    ],
  },
  {
    id: "D5",
    name: "可观测性",
    en: "Observability",
    sources: ["N4", "N5"],
    problem: "系统坏了之后，如何在分钟级回答：哪里坏、为什么坏、链路哪一跳坏。",
    concepts: ["结构化日志", "traceId · spanId（OpenTelemetry）", "RED 指标", "采样", "告警分级", "前端异常上报", "SLO 与错误预算", "故障复盘"],
    invariants: [
      "日志没有 traceId 贯穿，排障就靠运气。",
      "指标告诉你「哪里」，日志告诉你「为什么」，追踪告诉你「哪一跳」——三者不可互相替代。",
      "traceId 应从前端生成，一路贯穿网关、服务、数据库。",
      "没有复盘的事故会重演；复盘追系统，不追人。",
    ],
    cross: "结构化日志、前端异常上报",
    wide: true,
  },
  {
    id: "D6",
    name: "安全",
    en: "Security",
    sources: ["N1"],
    problem: "面对不可信的网络、真实用户与攻击者，守住数据与边界。",
    concepts: ["认证 vs 授权", "RBAC · ABAC", "注入类漏洞族", "对象级越权（IDOR）", "最小权限", "密钥管理", "脱敏", "审计日志", "密码与凭证存储", "会话与令牌管理", "传输与静态加密", "业务逻辑与防滥用"],
    invariants: [
      "密钥进过一次 git，就应视为已泄露。",
      "越权检查必须落在每一次对象访问上，而不是只落在接口上。",
      "密码必须不可逆：数据库泄露时，慢哈希是用户的最后一道防线。",
    ],
  },
  {
    id: "D7",
    name: "工程治理",
    en: "Engineering Governance",
    sources: ["N5"],
    problem: "让约定在团队与时间中存活下来。",
    concepts: ["模块边界", "依赖规则（单向 · 无环）", "规范自动化（lint · 门禁）", "测试金字塔", "CI/CD", "ADR 架构决策记录", "功能开关与灰度发布", "环境一致性", "代码评审（Code Review）", "代码所有权（CODEOWNERS）", "第三方依赖管理", "技术债管理", "弃用与下线流程", "康威定律与团队边界", "值班与升级路径", "文档与 Runbook"],
    invariants: [
      "口头约定必然腐化，只有机器可检查的约定能存活。",
      "依赖图无环，是可测试性的前提。",
      "代码评审的首要目的是让知识流动：一个人独懂的模块，就是系统的单点。",
      "第三方依赖是借来的复杂度：没有升级策略的那一刻起，它开始变成负债。",
      "没有下线日期的弃用公告，只是一封道歉信。",
    ],
    cross: "边界划分 · 模块化 · 内部分包 · 避免循环依赖 · 统一依赖 common · 统一常量 · CI/CD",
  },
];

export const layers: Layer[] = [
  {
    id: "L3",
    name: "实现层",
    pace: "快变",
    paceNote: "月 · 年计",
    examples: ["Spring Boot", "Gin", "Express", "FastAPI", "Django"],
    height: 100,
  },
  {
    id: "L2",
    name: "范式层",
    pace: "慢变",
    paceNote: "5–10 年",
    examples: ["分层架构", "12-Factor", "SRE", "DDD", "测试金字塔"],
    height: 124,
  },
  {
    id: "L1",
    name: "原理层",
    pace: "几乎不变",
    paceNote: "数十年",
    examples: ["幂等", "ACID", "CAP", "超时预算", "背压", "隔离级别"],
    height: 172,
  },
];

export const conceptMappingExample = {
  concept: "熔断 Circuit Breaker",
  rows: [
    { lang: "Java", tool: "Resilience4j" },
    { lang: "Go", tool: "sony/gobreaker" },
    { lang: "Node.js", tool: "cockatiel" },
    { lang: "Python", tool: "pybreaker" },
  ],
};

export const learningSteps = [
  {
    step: "01",
    title: "按域学，不按技术学",
    desc: "每个域读 2–3 份经典材料，先建立骨架，再补细节。",
  },
  {
    step: "02",
    title: "提炼不变量",
    desc: "每学一个概念就问：换语言还成立吗？成立的是 L1/L2 知识，不成立的是 L3。",
  },
  {
    step: "03",
    title: "新语言只做 L3 映射",
    desc: "概念层全部复用，学一门新后端语言的合理成本应该只剩实现层。",
  },
  {
    step: "04",
    title: "用事故校验框架",
    desc: "每次故障尝试归因到「某域的某条不变量被违反」。能归因，说明框架已内化。",
  },
];

export const readingList: { domain: string; name: string; materials: string[] }[] = [
  { domain: "D1", name: "契约与 API", materials: ["RFC 9457 Problem Details", "Google API Design Guide"] },
  { domain: "D2", name: "并发与一致性", materials: ["《DDIA》第 7 章 · 事务", "你所用的数据库的隔离级别文档"] },
  { domain: "D3", name: "数据与状态", materials: ["《DDIA》", "expand-contract 零停机迁移模式"] },
  { domain: "D4", name: "分布式弹性", materials: ["《Release It!》", "Google SRE Book"] },
  { domain: "D5", name: "可观测性", materials: ["Google SRE Book · 监控章节", "OpenTelemetry 文档"] },
  { domain: "D6", name: "安全", materials: ["OWASP Top 10", "OWASP ASVS"] },
  { domain: "D7", name: "工程治理", materials: ["12-Factor App", "adr.github.io"] },
];

export const calibration = [
  { items: ["统一结构化日志", "前端异常上报"], to: "D5 可观测性" },
  { items: ["统一异常处理"], to: "D1 契约 × D7 治理" },
  {
    items: ["边界划分", "模块化", "内部分包", "避免循环依赖", "统一依赖 common", "统一常量管理", "CI/CD"],
    to: "D7 工程治理",
  },
];

export const sources = [
  { label: "The Twelve-Factor App", href: "https://12factor.net/" },
  { label: "Google SRE Book", href: "https://sre.google/books/" },
  { label: "OWASP Top 10", href: "https://owasp.org/www-project-top-ten/" },
  { label: "OpenTelemetry", href: "https://opentelemetry.io/docs/" },
  { label: "RFC 9457 Problem Details", href: "https://www.rfc-editor.org/rfc/rfc9457" },
  { label: "diagram-design", href: "https://github.com/cathrynlavery/diagram-design" },
];
