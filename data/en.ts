/* 英文内容层：以中文源串为键（中文标题是全图的身份标识）。
   缺键时渲染层自动回退中文——翻译按域渐进落地，缺多少回退多少。 */

/* ---------- 节点/组框/副题标题（按中文字符串寻址，多处复用） ---------- */

export const enTitle: Record<string, string> = {
  /* 起点骨架 */
  "后端是什么": "What is Backend",
  "五个本性 → 七个治理域": "5 natures → 7 domains",
  "五个本性": "Five Natures",
  "对外提供服务": "Serving others",
  "并发处理": "Concurrency",
  "持久状态": "Persistent state",
  "依赖他系统": "Depending on others",
  "长期演进": "Long-term evolution",
  "怎么用这张图学": "How to use this map",
  "按域学，不按技术学": "By domain, not by tech",
  "提炼不变量": "Distill invariants",
  "新语言只做 L3 映射": "New language = L3 only",
  "用事故校验框架": "Verify with incidents",
  "三层知识模型": "Three-Layer Model",
  "L3 实现层": "L3 Implementation",
  "L2 范式层": "L2 Paradigms",
  "L1 原理层": "L1 Principles",
  "通用框架 = L1 + L2 · 学新语言 ≈ 只替换 L3 映射表": "Core = L1 + L2 · new language ≈ swap L3",
  "自检 · 「熔断」属于哪一层": "Check: circuit breaker lives on which layer?",

  /* 里程碑（= 域名，域面板复用）与副题 */
  "契约与 API": "Contracts & APIs",
  "并发与一致性": "Concurrency & Consistency",
  "数据与状态": "Data & State",
  "分布式弹性": "Distributed Resilience",
  "可观测性": "Observability",
  "安全": "Security",
  "工程治理": "Engineering Governance",
  "学完之后": "Where Next",
  "下一步": "next steps",
  "源 N1 · 对外提供服务": "from N1 · Serving others",
  "源 N2 · 并发处理": "from N2 · Concurrency",
  "源 N3 · 持久状态": "from N3 · Persistent state",
  "源 N4 · 依赖他系统": "from N4 · Depending on others",
  "源 N4 / N5 · 依赖他系统 / 长期演进": "from N4 / N5 · Dependence / Evolution",
  "源 N5 · 长期演进": "from N5 · Long-term evolution",

  /* 毕业闸（同 ×N 的闸共用同一标题串）与出口 */
  "毕业自检 · 不变量 ×4": "Graduation Gate · 4 invariants",
  "毕业自检 · 不变量 ×3": "Graduation Gate · 3 invariants",
  "毕业自检 · 不变量 ×5": "Graduation Gate · 5 invariants",
  "毕业自检 · 不变量 ×6": "Graduation Gate · 6 invariants",
  "校准全景": "Calibrate the Map",
  "判断新实践": "Judge New Practices",

  /* D1 子主题行（组框标题） */
  "契约思维：接口是承诺": "Contract thinking: interfaces are promises",
  "安全地演进：只加不改": "Evolving safely: add, never change",
  "健壮的输入": "Robust input",
  "缓存也是契约": "Caching is contract too",
  "怎么通信 · 同步选一种": "Sync: pick one style",
  "怎么通信 · 异步的消息语义": "Async: delivery semantics",
  "机器可读与机器验证": "Machine-readable & verifiable",

  /* D1 概念节点 */
  "统一响应模型": "Response Envelope",
  "错误码体系": "Error Codes",
  "版本化": "Versioning",
  "幂等键": "Idempotency Keys",
  "Schema 前向 / 后向兼容": "Schema Compatibility",
  "入参声明式校验": "Declarative Validation",
  "分页": "Pagination",
  "OpenAPI": "OpenAPI",
  "通信范式选择": "API Style Choice",
  "消息投递语义": "Delivery Semantics",
  "契约测试": "Contract Testing",
  "HTTP 缓存语义": "HTTP Caching",

  /* D2 子主题行与概念节点 */
  "先看见问题": "See the problem first",
  "数据库给的答案": "Answers from the database",
  "应用层的答案": "Answers in the application",
  "跨进程互斥": "Cross-process mutual exclusion",
  "跨服务的一致性": "Consistency across services",
  "后台的活：定时任务": "Background work: scheduled jobs",
  "竞态条件": "Race Conditions",
  "事务与隔离级别": "Transactions & Isolation",
  "乐观锁 · 悲观锁": "Optimistic vs Pessimistic Locks",
  "唯一约束": "Unique Constraints",
  "幂等 token": "Idempotency Tokens",
  "状态机": "State Machines",
  "定时任务与调度": "Scheduled Jobs",
  "分布式锁": "Distributed Locks",
  "分布式事务与 Saga": "Distributed Tx & Saga",

  /* D3 子主题行与概念节点 */
  "先建模：实体与两类特殊值": "Model first: entities & two special values",
  "安全地变更": "Changing safely",
  "日常状态": "Everyday state",
  "状态放哪：进程外": "Where state lives: outside the process",
  "读得快：索引": "Reading fast: indexes",
  "装得下：复制与分片": "Fitting more: replication & sharding",
  "两个系统的一致性": "Consistency across two systems",
  "流与批：数据管道": "Streams & batches: data pipelines",
  "数据的生老病死": "The life and death of data",
  "最后的兜底": "The last resort",
  "数据建模": "Data Modeling",
  "金额与精度": "Money & Precision",
  "时间与时区": "Time & Time Zones",
  "迁移版本化": "Versioned Migrations",
  "expand-contract": "Expand-Contract",
  "缓存一致性": "Cache Consistency",
  "软删除": "Soft Deletion",
  "审计字段": "Audit Columns",
  "索引与查询计划": "Indexes & Query Plans",
  "复制与分片": "Replication & Sharding",
  "事件发件箱（outbox）": "Transactional Outbox",
  "备份与恢复": "Backup & Restore",
  "无状态与状态外置": "Stateless Processes",
  "数据生命周期": "Data Lifecycle",
  "流处理与批处理": "Streams & Batches",

  /* D4 子主题行与概念节点 */
  "先给一切上闹钟": "Put a clock on everything",
  "失败后的反应": "Reacting to failure",
  "隔离与自救": "Isolation & self-rescue",
  "挡住洪流": "Holding back the flood",
  "知道极限在哪": "Know your limits",
  "演练：让弹性是真的": "Drills: making resilience real",
  "入口与排空": "Entry & draining",
  "放宽正确性换可用": "Trading correctness for availability",
  "超时预算": "Timeout Budgets",
  "重试 · 退避 · 抖动": "Retry · Backoff · Jitter",
  "熔断": "Circuit Breaker",
  "舱壁隔离": "Bulkheads",
  "降级": "Degradation",
  "背压": "Backpressure",
  "最终一致性": "Eventual Consistency",
  "限流与配额": "Rate Limiting & Quotas",
  "负载均衡与网关": "Load Balancing & Gateways",
  "优雅停机与健康检查": "Graceful Shutdown & Health Checks",
  "容量规划与压测": "Capacity & Load Testing",
  "故障演练（混沌工程）": "Chaos Engineering",

  /* D5 子主题行与概念节点 */
  "三支柱，不可互替": "Three pillars, not interchangeable",
  "工程化": "Operationalizing it",
  "从指标到目标": "From metrics to objectives",
  "闭环：从故障学习": "Closing the loop: learning from failures",
  "看到系统边界": "Seeing the system's edge",
  "结构化日志": "Structured Logs",
  "traceId · spanId（OpenTelemetry）": "Tracing (OpenTelemetry)",
  "RED 指标": "RED Metrics",
  "采样": "Sampling",
  "告警分级": "Alert Tiers",
  "前端异常上报": "Frontend Error Reporting",
  "SLO 与错误预算": "SLOs & Error Budgets",
  "故障复盘": "Postmortems",

  /* D6 子主题行与概念节点 */
  "先分清两件事": "Two different things first",
  "授权怎么做": "How to authorize",
  "凭证与会话": "Credentials & sessions",
  "技术攻击面": "The technical attack surface",
  "业务逻辑的攻击面": "The business-logic attack surface",
  "加密边界": "The encryption boundary",
  "资产与痕迹": "Assets & traces",
  "认证 vs 授权": "AuthN vs AuthZ",
  "RBAC · ABAC": "RBAC & ABAC",
  "注入类漏洞族": "The Injection Family",
  "对象级越权（IDOR）": "IDOR",
  "最小权限": "Least Privilege",
  "密钥管理": "Secrets Management",
  "脱敏": "Data Masking",
  "审计日志": "Audit Logs",
  "密码与凭证存储": "Password Storage",
  "会话与令牌管理": "Session & Token Management",
  "传输与静态加密": "TLS & Encryption at Rest",
  "业务逻辑与防滥用": "Business Logic & Abuse",

  /* D7 子主题行与概念节点 */
  "把系统切开": "Cutting the system apart",
  "谁对代码负责": "Who owns the code",
  "让知识流动：评审": "Knowledge flow: review",
  "让约定自动存活": "Keeping conventions alive automatically",
  "安全地放出": "Releasing safely",
  "环境一致性": "Environment Parity",
  "借来的复杂度": "Borrowed complexity",
  "欠下的债": "Accrued debt",
  "旧接口怎么退场": "Retiring old interfaces",
  "组织与系统": "Organization & system",
  "值班与升级": "On-call & escalation",
  "写下来": "Writing it down",
  "模块边界": "Module Boundaries",
  "依赖规则（单向 · 无环）": "Dependency Rules",
  "规范自动化（lint · 门禁）": "Automated Rules (lint gates)",
  "测试金字塔": "Test Pyramid",
  "CI/CD": "CI/CD",
  "ADR 架构决策记录": "ADRs",
  "功能开关与灰度发布": "Feature Flags & Canaries",
  "代码评审（Code Review）": "Code Review",
  "代码所有权（CODEOWNERS）": "Code Ownership",
  "第三方依赖管理": "Dependency Management",
  "技术债管理": "Technical Debt",
  "弃用与下线流程": "Deprecation & Sunset",
  "康威定律与团队边界": "Conway's Law & Team Boundaries",
  "值班与升级路径": "On-Call & Escalation",
  "文档与 Runbook": "Docs & Runbooks",

  /* 范围登记表：条目与分类 */
  "范围边界登记表": "Scope Registry",
  "Git 与版本控制基础": "Git & version-control basics",
  "HTTP / DNS / 网络基础": "HTTP / DNS / networking basics",
  "数据结构与算法": "Data structures & algorithms",
  "前端基础（HTML / CSS / JS）": "Frontend basics (HTML / CSS / JS)",
  "具体中间件用法（Redis / Kafka / Elasticsearch…）": "Middleware usage (Redis / Kafka / Elasticsearch…)",
  "语言与框架（Spring / Django / Gin…）": "Languages & frameworks (Spring / Django / Gin…)",
  "容器与编排操作（Docker / Kubernetes）": "Container & orchestration ops (Docker / Kubernetes)",
  "系统设计面试题解（秒杀 / 抢红包 / 短链…）": "System-design interview solutions (flash sales / red packets / short links…)",
  "对账系统（单列）": "Reconciliation systems (standalone)",
  "分支与合流策略（单列）": "Branching strategy (standalone)",
  "通知与推送渠道管理": "Notification & push channel management",
  "多租户数据隔离": "Multi-tenant data isolation",
  "Webhook 收发与验签": "Webhooks & signature verification",
  "雪花 ID / 唯一 ID 生成": "Snowflake / unique-ID generation",
  "服务发现与配置中心": "Service discovery & config centers",
  "共识算法（Raft / Paxos）与线性一致性": "Consensus (Raft / Paxos) & linearizability",
  "CQRS / 事件溯源": "CQRS / event sourcing",
  "开发基础": "Dev fundamentals",
  "计算机基础": "CS fundamentals",
  "相邻领域": "Adjacent field",
  "L3 实现层 ": "L3 implementation",
  "基础设施": "Infrastructure",
  "应用题": "Applied exercises",
  "已并入": "Merged elsewhere",
  "场景特定": "Scenario-specific",
  "实现细节": "Implementation detail",
  "基础设施层": "Infrastructure layer",
  "基础设施理论": "Infrastructure theory",
  "架构模式（特定）": "Architecture pattern (specific)",

  /* 概念图中文化材料标题 */
  "《高性能 MySQL》索引章节": "High Performance MySQL · index chapters",
  "Spec-First Development 实践": "Spec-first development practices",
  "PostgreSQL · 约束（唯一 / 主键 / 外键）": "PostgreSQL · Constraints (unique / PK / FK)",
  "12-Factor · Processes（中文）": "12-Factor · Processes",
  "12-Factor · Config（中文）": "12-Factor · Config",
  "12-Factor · Logs（中文）": "12-Factor · Logs",
  "12-Factor · Dev/Prod Parity（中文）": "12-Factor · Dev/Prod parity",
  "小林coding · 缓存雪崩/击穿/穿透": "xiaolincoding · cache avalanche/breakdown/penetration",
  "xxl-job 官方文档": "xxl-job documentation",
  "《企业应用架构模式》· Money 模式": "PoEAA · Money pattern",
  "《DDIA》第 7 章 · 事务": "DDIA · Ch.7 Transactions",
  "《DDIA》第 7 章 · Weak Isolation": "DDIA · Ch.7 Weak Isolation",
  "《DDIA》第 2 章 · 数据模型": "DDIA · Ch.2 Data Models",
  "《DDIA》第 5、6 章": "DDIA · Ch.5–6",
  "《DDIA》第 10、11 章": "DDIA · Ch.10–11",
  "《DDIA》第 5、9 章": "DDIA · Ch.5 & 9",
  "《DDIA》第 7、9 章": "DDIA · Ch.7 & 9",
  "《DDIA》": "DDIA (Designing Data-Intensive Applications)",
  "《DDIA》· Designing Data-Intensive Applications": "DDIA · Designing Data-Intensive Applications",
  "martinfowler.com · Parallel Change（expand/contract）": "martinfowler.com · Parallel Change (expand/contract)",
  "《Release It!》2nd Edition（Pragmatic）": "Release It! 2nd Edition (Pragmatic)",
  "你所用的数据库的隔离级别文档（以 PostgreSQL 为例）": "Your database's isolation docs (PostgreSQL as the example)",
  "有限状态机（Wikipedia）": "Finite-state machine (Wikipedia)",
  "令牌桶算法（Wikipedia）": "Token bucket (Wikipedia)",
  "Kafka 交付语义文档": "Kafka delivery semantics docs",
  "系统版本临时表 · SQL Server 官方文档": "Temporal tables · SQL Server docs",
  "《Release It!》第二版（Pragmatic Bookshelf）": "Release It! 2nd ed. (Pragmatic)",
  "《Release It!》· Bulkhead（Pragmatic Bookshelf）": "Release It! · Bulkheads (Pragmatic)",
  "《Release It!》": "Release It!",
  "adr.github.io · 架构决策记录": "adr.github.io · Architecture Decision Records",
  "Stripe Idempotency Keys 设计": "Stripe · Idempotency keys design",
  "Slack Pagination (cursor) 文档": "Slack pagination (cursor) docs",
  "Uncle Bob · The Clean Architecture（依赖规则）": "Uncle Bob · The Clean Architecture (dependency rule)",
  "Kamil Grzybek · Modular Monolith 系列": "Kamil Grzybek · Modular Monolith series",
  "《Software Engineering at Google》· Ch.19 Code Review（免费全文）": "Software Engineering at Google · Ch.19 Code Review (free)",
  "《Team Topologies》官网": "Team Topologies (official site)",
  "《Google SRE》· 处理过载": "Google SRE · Handling Overload",
  "《Google SRE》· 数据完整性": "Google SRE · Data Integrity",
  "《Google SRE Workbook》· NALSD 系统容量设计": "Google SRE Workbook · NALSD capacity design",
  "《Google SRE》· Service Level Objectives": "Google SRE · Service Level Objectives",
  "《Google SRE》· Postmortem Culture": "Google SRE · Postmortem Culture",
  "《Google SRE》· Being On-Call": "Google SRE · Being On-Call",
  "《Google SRE Workbook》· 事故响应与 Runbook": "Google SRE Workbook · Incident response & runbooks",
  "《Google SRE Workbook》· Alerting on SLOs": "Google SRE Workbook · Alerting on SLOs",
  "《Google SRE》· 监控分布式系统": "Google SRE · Monitoring Distributed Systems",
  "《Google SRE》": "Google SRE Book",
  "《个人信息保护法》全文 · 网信办": "PIPL (China's personal information law) · full text",
  "GDPR 全文检索（gdpr-info.eu）": "GDPR full text (gdpr-info.eu)",
  "3-2-1 备份原则": "The 3-2-1 backup rule",
  "Google SRE Book · 监控章节": "Google SRE Book · monitoring chapter",
  "OpenTelemetry 文档": "OpenTelemetry docs",

  /* 树与图内标签 */
  "为什么必须": "why they're unavoidable",
  "治理什么": "what they govern",
  "什么跨语言": "what transfers across languages",
  "怎么用": "how to use it",
  "概念词汇": "concept vocabulary",
  "不变量": "invariants",
  "条": "",
  "律": "invariants",

  /* 补遗：材料标题 / scope 尾部 / 树分支 */
  "七个治理域": "Seven governance domains",
  "四步循环": "Four-step cycle",
  "Airflow 工作流官网": "Airflow (official site)",
  "Envoy 官方文档": "Envoy documentation",
  "Nginx 官方文档": "Nginx documentation",
  "OpenTelemetry 官方文档": "OpenTelemetry documentation",
  "Pact 文档": "Pact documentation",
  "PostgreSQL 隔离级别文档": "PostgreSQL isolation levels docs",
  "Protobuf 兼容性规则": "Protobuf compatibility rules",
  "Quartz 调度器官网": "Quartz scheduler (official site)",
  "W3C Trace Context 规范": "W3C Trace Context spec",
  "pre-commit · Git 钩子门禁框架": "pre-commit · git hook gate framework",
  "OWASP ASVS（V11 · 业务逻辑）": "OWASP ASVS (V11 · business logic)",
  "NIST SP 800-207 · 零信任架构": "NIST SP 800-207 · zero trust architecture",
  "Kubernetes · Pod 生命周期与终止（SIGTERM 宽限期）": "Kubernetes · Pod lifecycle & termination (SIGTERM grace)",
  "DORA · Four Keys 指标": "DORA · the Four Keys metrics",
  "SLSA · 供应链完整性框架": "SLSA · supply-chain integrity framework",
  "《Google SRE》· 级联故障与降级": "Google SRE · Cascading Failures & Degradation",
  "CDN 与边缘缓存": "CDN & edge caching",
  "Reactive Streams JVM 规范 · Backpressure": "Reactive Streams JVM spec · Backpressure",
  "FinOps / 成本治理": "FinOps / cost governance",
  "GC 与内存模型": "GC & memory models",
  "生产数据变更纪律": "Production data-change discipline",
  "文件上传与对象存储（分片 / 断点 / 预签名）": "File upload & object storage (multipart / resumable / presigned)",
  "异地多活与单元化": "Multi-region active-active & cell-based architecture",
  "国际化（i18n 文案管理）": "Internationalization (i18n copy management)",
  "组织实践": "Org practice",
  "运行时 / L3": "Runtime / L3",
  "待评估": "Pending evaluation",
  "基础设施级容灾": "Infrastructure-grade DR",
  "产品化需求": "Product requirement",
};

/* ---------- 概念笔记正文（按 `域|中文标题` 寻址，与 notes.ts 同键） ---------- */

export type NoteEn = { def: string; why: string; points: string[]; pitfall?: string };

export const enNotes: Record<string, NoteEn> = {
  "D1|统一响应模型": {
    def: "Every endpoint returns the same envelope (code / message / data); error paths share the structure of success paths.",
    why: "Callers shouldn't write per-endpoint parsing logic; a uniform structure is what lets gateways, SDKs and monitoring handle everything once.",
    points: [
      "Envelope fields, once shipped, can only be added — never redefined. The envelope is itself a contract.",
      "Business codes and HTTP status codes live on separate layers: transport semantics to HTTP, business semantics to code.",
      "List/pagination structures should be uniform too — don't let each endpoint invent its own array wrapper.",
    ],
    pitfall: "Using HTTP status codes as business error codes — gateways and monitoring can't tell transport failure from business refusal.",
  },
  "D1|错误码体系": {
    def: "Errors are part of the API: namespaced, enumerable, documented error codes that tell callers what to do next.",
    why: "Callers must programmatically distinguish \"retrying helps\" from \"retrying is useless\" — otherwise they string-match on message.",
    points: [
      "Error codes should be readable and hierarchical, e.g. ORDER.STOCK_INSUFFICIENT.",
      "Every error states the caller's move: retry, fix the request, or page the on-call.",
      "Error responses carry a traceable requestId that joins back to logs.",
    ],
    pitfall: "Returning \"system busy\" or a bare 500 for everything — no retry policy is possible on top of that.",
  },
  "D1|版本化": {
    def: "Mark API versions in the URL path (/v1) or media type so incompatible changes can coexist.",
    why: "You can't force every caller to upgrade simultaneously — versioning is the buffer zone for independent evolution.",
    points: [
      "For APIs there are only two version grades: compatible and incompatible.",
      "Old versions need an explicit retirement timeline, not eternal coexistence.",
      "Ship the new version alongside the old, watch traffic migrate, then retire.",
    ],
    pitfall: "Passing the version as a query parameter — routing, caching and monitoring never see the version dimension.",
  },
  "D1|幂等键": {
    def: "The client generates a unique key per write (Idempotency-Key); the server uses it to detect retries and return the original result.",
    why: "Networks retry; the same request may arrive twice — idempotency keys turn \"duplicate submission\" into \"duplicate response\", not \"duplicate execution\".",
    points: [
      "Idempotency keys need a TTL and a scope (per user, per operation type).",
      "Cache the first result: repeated requests return the original response, not an error.",
      "Enforcement rides on a server-side unique constraint — conflict means duplicate, which also handles concurrency for free.",
    ],
    pitfall: "Adding a unique constraint in the database while the application mutates state before the constraint ever fires.",
  },
  "D1|Schema 前向 / 后向兼容": {
    def: "Adding fields must not break old readers (backward compatibility); new readers must tolerate old data missing fields (forward compatibility).",
    why: "Producers and consumers deploy independently — messages and responses will inevitably meet across versions.",
    points: [
      "Only add optional fields; never change field semantics or types.",
      "Removing a field takes three steps: deprecate → observe → delete.",
      "Enums and oneOf need a fallback branch for unknown values.",
      "Distinguish missing from null: missing = never written, null = explicitly cleared — conflating them is the most common consumer bug.",
    ],
    pitfall: "Changing a field from string to object — an atomic break for old consumers; it detonates mid-rollout.",
  },
  "D1|入参声明式校验": {
    def: "Declare input constraints in a schema (type/length/format) and let the framework validate them uniformly before business logic runs.",
    why: "All input is untrusted (nature N1); validate once at the boundary instead of scattering checks through business code.",
    points: [
      "Validation rules and API docs come from the same source (annotations/OpenAPI) — write once, use twice.",
      "Have an explicit policy for unknown fields: reject or ignore, never silently swallow.",
      "Validation failures are structured errors that flow through the unified error-code system.",
    ],
    pitfall: "Scattering if-checks deep inside business logic — invisible rules, untestable, never fully tested.",
  },
  "D1|分页": {
    def: "Limit response size with a uniform cursor or offset parameter.",
    why: "Unbounded queries crush databases and networks; list endpoints must default to a finite size.",
    points: [
      "Cursor pagination stays stable at scale; deep offset pages drift as rows are written.",
      "Page size needs a hard cap; keep the default modest.",
      "Cursors should encode sort keys and position, stay opaque, and never leak internal structure.",
      "The list trio — pagination / sorting / filtering — shares one parameter spec; no per-endpoint inventions.",
    ],
    pitfall: "A row inserted during a deep offset page makes results duplicate or skip entries.",
  },
  "D1|OpenAPI": {
    def: "Describe the API in a machine-readable contract (paths, schemas, error codes); docs, clients and tests all generate from it.",
    why: "A contract written down is the only one that gets followed; hand-written docs always go stale.",
    points: [
      "Contract first: settle the OpenAPI spec in review before writing the implementation.",
      "CI verifies implementation matches contract — drift fails the build.",
      "Spin up mocks from the contract so frontend and backend build in parallel.",
    ],
    pitfall: "Writing code first and generating docs after — the contract becomes a stale snapshot nobody trusts.",
  },
  "D1|通信范式选择": {
    def: "For the synchronous external surface, choose among REST / gRPC / GraphQL — not the best one, the matching one.",
    why: "The paradigm determines the contract's expressiveness, evolution path and caching strategy; switching later costs as much as a rewrite.",
    points: [
      "REST + JSON is the default: best ecosystem, debugging tools and gateway support.",
      "gRPC fits high-frequency internal calls: strong schemas, bidirectional streaming, small payloads.",
      "GraphQL fits multi-source aggregation with flexible client queries — caching and rate limiting cost extra.",
      "One paradigm externally; divergence allowed internally.",
    ],
    pitfall: "Migrating a public API from REST to GraphQL for the technology's sake — every client and the whole caching stack relearns.",
  },
  "D1|消息投递语义": {
    def: "The three delivery promises of messaging systems — at-most-once / at-least-once / exactly-once — plus the engineering meaning of DLQs, redelivery and ordering.",
    why: "Delivery semantics dictate the consumer's entire error-handling logic; write the consumer wrong if you don't know them.",
    points: [
      "Distributed exactly-once is mostly marketing: real systems run at-least-once plus consumer-side idempotency (the D1 invariant).",
      "Failed processing goes to a dead-letter queue for human or scheduled handling — not infinite redelivery.",
      "Ordering is per-partition only; global ordering costs single-partition throughput.",
      "Delayed jobs and scheduled tasks are close kin of message semantics: their reliability shares the same roots.",
    ],
    pitfall: "Assuming messages arrive exactly once, skipping idempotency — one redelivery and you've charged twice.",
  },
  "D1|契约测试": {
    def: "Consumer and provider each test against the same contract (consumer-driven); drift gets caught in CI.",
    why: "OpenAPI describes the contract; contract testing keeps it machine-verified — static docs can't catch an implementation drifting.",
    points: [
      "Consumer tests record expectations; the provider replays and verifies them (the Pact model).",
      "Run in both sides' CI: whoever breaks the contract goes red.",
      "Complements integration tests: it verifies the contract, not implementation details.",
    ],
    pitfall: "Contract testing only on the provider side — nobody records the consumers' actual expectations.",
  },
  "D1|HTTP 缓存语义": {
    def: "Use response headers like Cache-Control / ETag / If-None-Match to write \"can this be cached, for how long, how to revalidate\" into the contract.",
    why: "Caching behavior is an agreement between the server and browsers/gateways/CDNs — these headers are part of the contract, and semantics changes must update them.",
    points: [
      "Cache-Control says it precisely: max-age / no-store / private — don't lean on the obsolete Expires.",
      "ETag revalidation: unchanged content returns 304, saving bandwidth and time.",
      "Cache keys must include session/version dimensions — personalized responses are forbidden from public shared caches.",
    ],
    pitfall: "A user-specific response without `private` gets cached by a shared CDN — the next user reads someone else's data.",
  },
  "D2|竞态条件": {
    def: "The outcome depends on how concurrent operations interleave — same inputs, different order, different result.",
    why: "Multiple requests share one piece of state (nature N2); there is always a time window between check and write.",
    points: [
      "Reproduce before fixing: use concurrency tests (many threads hitting one endpoint) to force the interleaving out.",
      "Fixes in priority order: database constraints > transactions/locks > application-layer retry.",
      "Whatever the storage layer can guarantee, don't hand-write in the application.",
    ],
    pitfall: "The default read-then-write ORM pattern works in dev, then oversells the moment load testing starts.",
  },
  "D2|事务与隔离级别": {
    def: "Atomicity and isolation guarantees provided by the database; the isolation level decides what concurrent transactions can see of each other.",
    why: "The first line of defense for correctness belongs in the storage layer — the application shouldn't reinvent it.",
    points: [
      "Every common level (RC/RR) has its anomalies: dirty reads, non-repeatable reads, phantoms, lost updates.",
      "Stronger isolation means lower throughput; pick the level per business case, not max by default.",
      "Transaction boundary = business boundary: no external calls inside a transaction.",
    ],
    pitfall: "Believing a transaction makes you concurrency-safe — lost updates still happen under RC.",
  },
  "D2|乐观锁 · 悲观锁": {
    def: "Pessimistic locking takes the lock before operating (assumes conflicts are frequent); optimistic locking validates a version at commit (assumes they're rare).",
    why: "Two cost models for concurrent writes to the same data — waiting vs retrying.",
    points: [
      "Choose by conflict rate: low → optimistic, high → pessimistic.",
      "Optimistic retries need a cap and backoff, or you build your own retry storm.",
      "Pessimistic locks must bound hold time — holding a lock across a network call breeds deadlocks.",
      "Deadlock trio: consistent lock ordering everywhere, short transactions, no external calls while holding — the database deadlock log is the first evidence.",
    ],
    pitfall: "Insisting on optimistic locking under high conflict — the retry storm hurts more than lock waiting.",
  },
  "D2|唯一约束": {
    def: "Back business uniqueness (one account per phone, one order per key) with a database unique index.",
    why: "Application-layer checks can't close the concurrency window; a database constraint is the last line of defense, immune to deployment timing.",
    points: [
      "A unique index is the foundation of idempotent writes: conflict means duplicate.",
      "Translate constraint violations into business error codes, not a 500.",
      "Composite unique constraints model business keys (user_id + sku_id).",
    ],
    pitfall: "Deduplicating only in the application — two requests pass the check simultaneously, both inserts succeed.",
  },
  "D2|幂等 token": {
    def: "A credential the server uses to recognize the same logical operation; repeated submissions return the first result instead of executing again.",
    why: "Networks retry, so every write may execute twice (the D2 invariant) — idempotency is the default requirement for write APIs.",
    points: [
      "Persist the token inside the first write transaction — concurrency protection for free.",
      "For in-flight tokens: hold subsequent requests or answer that it is in progress; never run them in parallel.",
      "Tokens need a TTL and a scope (isolated per operation type).",
    ],
    pitfall: "Implementing idempotency as repeats-also-return-success while actually executing twice.",
  },
  "D2|状态机": {
    def: "Model an entity's states and legal transitions explicitly; reject illegal transitions outright instead of relying on scattered ifs.",
    why: "Concurrent interleavings often surface as illegal state jumps (paid, then cancelled again); a state machine turns those bugs into explicit checks.",
    points: [
      "Define transitions in one place; code may only call transition(from, event).",
      "Persisted state + version number = optimistic locking for free.",
      "Illegal transitions return a distinct error code, which makes timing bugs traceable.",
    ],
    pitfall: "Expressing state as boolean flags (isActive + isDeleted + isFrozen) — combinatorial explosion, nothing to validate against.",
  },
  "D2|定时任务与调度": {
    def: "Governance of recurring background jobs: idempotent execution, multi-instance mutual exclusion, missed-run and off-peak policies.",
    why: "Scheduled jobs are the quietest landmines in production (D2 invariant): scale to two instances and every job runs twice; miss one settlement window and it is an incident.",
    points: [
      "Jobs must be idempotent and re-runnable: a retry can't double the effect.",
      "Multi-instance needs a distributed lock or a scheduler so exactly one instance runs at a time.",
      "Off-peak timing (avoid the top of the hour) and catch-up for missed runs are explicit, written into job config.",
      "Record each run (start/end/duration) and monitor it — silently failing jobs are the most dangerous.",
    ],
    pitfall: "A bare cron with two app replicas — every schedule issues double the coupons.",
  },
  "D2|分布式锁": {
    def: "Cross-process mutual exclusion: Redis / etcd / the database arbitrating that only one instance runs this logic at a time.",
    why: "Once you deploy multiple instances, in-process locks all stop working (N2's cluster version); cross-process critical sections need an external arbiter.",
    points: [
      "Locks must carry a TTL and an owner token: TTL prevents deadlock, the token prevents deleting someone else's lock.",
      "Redis locks can vanish on failover — use fencing tokens or etcd/Consul on critical paths.",
      "First ask whether you can skip the lock: unique constraints, idempotency, or queue serialization are often sturdier.",
    ],
    pitfall: "SETNX without an expiry — the holder crashes once and the whole system deadlocks forever.",
  },
  "D2|分布式事务与 Saga": {
    def: "No atomic commit across services: 2PC sacrifices availability by locking resources; Saga splits a long transaction into local transactions plus compensating actions.",
    why: "A single database's atomicity can't leave the process boundary (N2's distributed version); cross-service consistency is bought with business semantics.",
    points: [
      "Two Saga shapes: orchestration (central coordinator) vs choreography (event-driven); team size decides.",
      "Every participant must be able to write its own undo — compensation is not optional (D2 invariant).",
      "Isolation leaks: intermediate states are visible; add semantic locks where dirty reads would hurt.",
    ],
    pitfall: "Designing compensation only for the happy path — the first failure triggers a compensation chain that crashes itself.",
  },
  "D3|数据建模": {
    def: "Settle entities, relationships and constraints before performance — the model is a shared language between business and engineering.",
    why: "Data outlives processes (nature N3): a modeling error is the most expensive bug class to fix.",
    points: [
      "Start from normal forms; denormalize only with measurements, not hunches.",
      "Foreign keys and constraints are documentation and defense at once — don't leave them in the ER diagram only.",
      "Naming is documentation: table and column names should read like business meaning.",
      "Primary key choice is a trade-off: auto-increment writes fast but leaks volume, UUIDs are irregular but bloat index writes — pick per case, stay consistent across the database.",
    ],
    pitfall: "Designing tables straight from page fields — one requirement change forces a full table rebuild.",
  },
  "D3|金额与精度": {
    def: "Store money as integer minor units (cents) or fixed-point types; define arithmetic and rounding rules explicitly.",
    why: "Floats computing money always err (D3 invariant): 0.1 + 0.2 ≠ 0.3, and the drift grows into real losses in reports and reconciliation.",
    points: [
      "Store integer cents or DECIMAL; float/double are banned from money columns.",
      "Rounding rules belong in the contract: half-up or banker's rounding, and who eats the remainder.",
      "Cross-currency: fix the booking currency and snapshot the exchange rate — the deal-time rate is persisted with the order.",
    ],
    pitfall: "A float price column: stack two promotions and reconciliation is off by one cent every day — the root cause turns out to be precision.",
  },
  "D3|时间与时区": {
    def: "Store time in UTC, transmit ISO 8601 with offset, and localize only at the presentation layer.",
    why: "Servers, databases and browsers are three systems each carrying their own zone (N3 across systems); timezone bugs erupt only with cross-region users and DST switches.",
    points: [
      "Database stores UTC (or timezone-aware timestamptz); the application computes in UTC throughout.",
      "APIs transmit ISO 8601 with offset; model business dates separately from physical instants (billing period vs timestamp).",
      "Zone-less dates like birthdays and billing periods use DATE and never join timezone conversion.",
    ],
    pitfall: "Local time end to end — the DST day has 23 hours and every daily-settlement job goes wrong.",
  },
  "D3|迁移版本化": {
    def: "Schema changes go through versioned scripts: in the repo, reviewable, rollbackable, replayable.",
    why: "Schema is a production asset; hand-run DDL is a release without a version.",
    points: [
      "Migration scripts live in the same repo and review flow as code.",
      "Destructive changes must split into multiple steps (see expand-contract).",
      "Every migration replays in the same order across all environments.",
    ],
    pitfall: "Hand-editing the schema before launch — environments drift, and the problem only shows up in production.",
  },
  "D3|expand-contract": {
    def: "Zero-downtime change in three steps: expand (add new structure) → migrate (dual-write and backfill) → contract (drop the old), each shipped separately.",
    why: "Old and new code versions must both run on the same schema (D3 invariant).",
    points: [
      "Expand and contract are two separate releases with a full migration window between them.",
      "Backfill runs in batches to avoid long lock-holding transactions.",
      "Contract's precondition: every reader has upgraded to the new structure.",
    ],
    pitfall: "One ALTER that adds and drops columns at once — the old version crashes on the spot.",
  },
  "D3|缓存一致性": {
    def: "Cache and database are two systems: the inconsistency window can only be shortened or tolerated, never eliminated.",
    why: "Dual writes have no atomicity — database-first or cache-first, an intermediate state always exists (D3 invariant).",
    points: [
      "Default order: write the database, then invalidate the cache (Cache-Aside).",
      "TTL is the hard ceiling on the inconsistency window — always set one.",
      "For read-your-own-writes, read the database directly for a short window after writes.",
      "Know the three classics cold: penetration (missing keys → cache nulls / bloom filter), breakdown (hot key expiry → single-flight mutex / logical expiry), avalanche (mass expiry → jittered TTL / HA cluster).",
    ],
    pitfall: "Chasing strongly consistent caches until you've built a distributed transaction — the cost swamps the benefit.",
  },
  "D3|软删除": {
    def: "Mark rows with deleted_at instead of physically deleting — data stays recoverable and auditable.",
    why: "Data is both asset and audit evidence (nature N3); deletion usually just means hidden from users.",
    points: [
      "Filter deleted rows in one query layer, not by remembering the condition in every query.",
      "Unique constraints conflict with soft deletion: use partial indexes (WHERE deleted_at IS NULL).",
      "When compliance demands physical deletion, anonymize instead.",
    ],
    pitfall: "Unique index ignoring soft-deleted rows — after deleting one record, creating the same name fails a second time.",
  },
  "D3|审计字段": {
    def: "Standardized metadata columns on every table: created_at / updated_at / created_by / version.",
    why: "Debugging, auditing and optimistic locking all depend on them — the data's factory information.",
    points: [
      "Injected by the framework; hand-assignment is forbidden.",
      "Timestamps come from the database clock, never the application server's.",
      "The version column directly powers optimistic locking.",
    ],
    pitfall: "Filling timestamps from application servers — machines drift a few seconds apart and the ordering falls apart.",
  },
  "D3|索引与查询计划": {
    def: "Steer queries down the right path with structures like B-trees: index design plus reading plans with EXPLAIN.",
    why: "Once volume grows, 80% of performance trouble is queries missing or losing indexes — the database's first performance lever.",
    points: [
      "Design composite indexes around query patterns, honoring the leftmost-prefix rule.",
      "Indexes cost write amplification: more isn't better; prune redundant ones.",
      "Slow-query log plus EXPLAIN is a daily habit: read the plan before talking optimization.",
      "Watch for N+1: ORM lazy loading querying per loop iteration — turn on SQL logging and repeats jump out.",
    ],
    pitfall: "Applying functions or implicit type casts to indexed columns — the index dies on the spot, full table scan.",
  },
  "D3|复制与分片": {
    def: "Replication = multiple copies (primary-replica, read/write split) for availability; sharding = splitting data by key for capacity.",
    why: "A single machine's capacity and throughput both cap out (N3 at scale); replicate first, shard second — don't reverse the order.",
    points: [
      "With read/write splitting, decide up front where read-your-own-writes lands.",
      "Choose the shard key by query pattern: a wrong choice can't be rebalanced.",
      "Consistent hashing reduces data movement when scaling out.",
    ],
    pitfall: "Reaching for sharding as soon as data grows — most problems yield to indexes and archiving first; sharding is the last resort.",
  },
  "D3|事件发件箱（outbox）": {
    def: "While writing business data, write pending events into an outbox table in the same database; a separate process delivers them — turning dual writes into one local transaction.",
    why: "Commit the database + publish the message has no atomicity: a lost message or an uncommitted one leaves state and events inconsistent.",
    points: [
      "The outbox record is written inside the same local transaction as the business change.",
      "A dispatcher polls the table or tails the binlog (CDC) to publish.",
      "Consumers still need idempotency — delivery is at-least-once.",
    ],
    pitfall: "Publish first, write later, compensate on failure — the compensation branches sprawl; a single transaction beats them all.",
  },
  "D3|备份与恢复": {
    def: "Scheduled backups plus a rehearsed restore process, quantified by RPO / RTO: how much data you can lose, how fast you recover.",
    why: "No consistency design survives the data center disappearing; backup is the data domain's final fallback (N3's extreme case).",
    points: [
      "Set explicit business targets for RPO (set by backup frequency) and RTO (set by the restore process).",
      "Restores must be rehearsed regularly — a backup never restored doesn't count as a backup (D3 invariant).",
      "Backups themselves need encryption and access control.",
    ],
    pitfall: "Backups run forever, restores never once — the day disaster hits, the backups turn out to be corrupt.",
  },
  "D3|无状态与状态外置": {
    def: "Processes keep no business state — sessions and files live in databases, caches and object storage, so any process can be killed or replaced at any time.",
    why: "The shared premise of horizontal scaling and rolling releases: instances are interchangeable, so traffic can land anywhere (N2/N5 in cluster form).",
    points: [
      "Externalize sessions (Redis or self-contained tokens); no cross-request state in local memory.",
      "Files go to object storage with presigned direct uploads, never local disk.",
      "Graceful shutdown can only drain because state lives outside the process.",
    ],
    pitfall: "Sessions in memory just temporarily — the second instance comes online and users randomly lose their login.",
  },
  "D3|数据生命周期": {
    def: "Retention, archiving, cleanup and compliant deletion: how long each data class lives, where it goes cold, how it gets deleted on request.",
    why: "Data that only grows pushes cost and risk up monotonically (D3 invariant); privacy laws make deletability a legal obligation.",
    points: [
      "Define retention per data class — hot → cold archive → delete — in the schema design, not in verbal agreements.",
      "Cleanup is an automated job (Steady State), not a panic script after the incident.",
      "The right to delete covers copies: personal data in logs, caches and backups is all in scope.",
    ],
    pitfall: "Deleting only from the primary database while logs and backups keep everything — it all counts in a compliance audit.",
  },
  "D3|流处理与批处理": {
    def: "Batch processing works in scheduled chunks (ETL, reconciliation); stream processing works as events arrive (CDC, real-time features).",
    why: "Data serves more than online requests (N3's other face): reports, reconciliation, search indexes and risk features all come from pipelines.",
    points: [
      "Pipelines must be idempotent and replayable: re-running a batch must not corrupt data.",
      "The batch/stream boundary is the latency budget, not fashion.",
      "Reconciliation jobs are the final consistency net — catching and fixing whatever slipped past upstream.",
    ],
    pitfall: "A non-replayable pipeline: one consumption failure forces a full backfill, and the backfill itself becomes the next incident.",
  },
  "D4|超时预算": {
    def: "Set one end-to-end deadline for the whole call chain, then allocate it backwards hop by hop.",
    why: "A call without a timeout is a random hang (D4 invariant); timeouts are a budget to allocate, not a guess.",
    points: [
      "Derive the budget from user-tolerable latency: 3s total — gateway 0.5s, service 1.5s, database 1s.",
      "Upstream timeout >= the sum of downstream hops, or the upstream gives up while downstream keeps spinning.",
      "Set connect, read and write timeouts separately.",
    ],
    pitfall: "Every layer sets 30s — one request can hang end to end for 90 seconds.",
  },
  "D4|重试 · 退避 · 抖动": {
    def: "Retry with exponential backoff plus random jitter; retry only retryable errors.",
    why: "Each layer retrying on its own exponentially amplifies downstream traffic (the retry storm, D4 invariant).",
    points: [
      "Retry only idempotent operations; for non-idempotent ones, build the idempotency token first.",
      "Retries spend the timeout budget: cap the total duration.",
      "Retry and circuit breaking act together: when the breaker is open, stop retrying.",
    ],
    pitfall: "Blindly retrying the order endpoint — one timeout becomes two orders.",
  },
  "D4|熔断": {
    def: "After consecutive failures cross a threshold, trip the breaker: fail fast for a while and stop hitting the downstream.",
    why: "The downstream is already sick; retries just twist the knife. Breaking gives the downstream recovery time and the upstream fast failure.",
    points: [
      "Three-state cycle: closed (normal) → open (fail fast) → half-open (probe recovery).",
      "Break per dependency, not one global breaker.",
      "Errors during an open breaker differ from ordinary errors and get their own monitoring signal.",
    ],
    pitfall: "One global circuit breaker — a single slow dependency fails every route fast together.",
  },
  "D4|舱壁隔离": {
    def: "Give each dependency class its own resource pool (connections/threads/semaphores); failures stay contained in one compartment.",
    why: "One flooded compartment shouldn't sink the ship — resource isolation decides the failure radius.",
    points: [
      "Pool size = the concurrency that dependency can bear, not as large as possible.",
      "Isolation must cover both synchronous and asynchronous paths.",
      "Couple with degradation: when a compartment fills, trigger that dependency's fallback.",
    ],
    pitfall: "Every downstream sharing one connection pool — the slowest one hogs it and everything else queues.",
  },
  "D4|降级": {
    def: "When a dependency is unavailable, return a lossy but usable result: fallback values, stale cache, trimmed views.",
    why: "Availability can be tiered by business — a broken recommendation panel must not take down checkout.",
    points: [
      "Fallback paths must be rehearsed in peacetime; an untested fallback is not trusted.",
      "Degraded data carries a freshness label — don't pretend it's live.",
      "Writes degrade through queue-and-compensate, never by dropping.",
    ],
    pitfall: "The first real degradation triggers an NPE inside the fallback logic itself.",
  },
  "D4|背压": {
    def: "When the downstream overloads, the upstream senses it and slows down: bounded queues plus explicit rejection policies.",
    why: "An unbounded queue only postpones failure to the moment memory runs out — and loses even more then.",
    points: [
      "Queues must be bounded; the bound is the backpressure trigger point.",
      "Rejection policies need business semantics: fail fast, drop oldest, or degrade.",
      "Consumption rate pushes back on production rate instead of brute-forcing through.",
    ],
    pitfall: "Absorbing the flood with an unbounded thread pool — ending in OOM and total failure.",
  },
  "D4|最终一致性": {
    def: "Accept brief replica inconsistency in exchange for availability under partition — provided convergence is defined and measurable.",
    why: "Strong consistency across a network is too expensive (the CAP trade) — most businesses need it consistent within N seconds.",
    points: [
      "Set a convergence target per inconsistency scenario (e.g. 5s).",
      "Make conflict resolution explicit: LWW, version vectors, or business merges.",
      "Read-your-own-writes needs session stickiness or reads from the primary.",
    ],
    pitfall: "Treating eventual consistency as don't-care consistency — never measuring convergence lag, never knowing how long it's been broken.",
  },
  "D4|限流与配额": {
    def: "Limit request rate per unit time with token bucket / leaky bucket algorithms, with layered quotas by IP / user / endpoint.",
    why: "Traffic from nature N1 is untrusted and unbounded — manage it proactively or be managed by it (OWASP API4, unrestricted resource consumption).",
    points: [
      "Layered limiting: coarse backstop at the gateway, fine-grained per user/endpoint in services.",
      "Distributed limiting uses centralized counters (e.g. Redis); decide your clock-vs-accuracy trade.",
      "Return a clear error code (429) plus Retry-After so callers can back off.",
    ],
    pitfall: "Limiting only at the gateway with no protection on internal calls — one runaway cron still punches through the whole chain.",
  },
  "D4|负载均衡与网关": {
    def: "Reverse proxies / load balancers spread traffic across instances; the gateway centralizes authn, rate limiting and routing.",
    why: "Multiple instances are the premise of availability; the entry layer decides how traffic arrives and how bad instances get removed.",
    points: [
      "Failing health checks remove instances automatically; recovery adds them back.",
      "Session stickiness interacts with retry semantics: a retry may land on another instance, so writes must be idempotent.",
      "Be stingy with LB-level retries — they multiply with upstream retries into a storm.",
    ],
    pitfall: "The gateway retrying POSTs by default — non-idempotent requests fired twice.",
  },
  "D4|优雅停机与健康检查": {
    def: "On shutdown, drain traffic first and finish in-flight requests before exiting; expose liveness and readiness probes.",
    why: "Releases are frequent (N5); without draining, every deploy is a small outage.",
    points: [
      "Read traffic leaves via readiness removal; write traffic waits for queues to drain or hands over.",
      "Cap the shutdown wait — force-quit and alert past the deadline; never wait forever.",
      "Health checks must probe real dependencies (database connectivity), not just return 200.",
    ],
    pitfall: "kill -9 straight to the process — in-flight requests all turn 502, a minutes-long error spike on every release.",
  },
  "D4|容量规划与压测": {
    def: "Find the system's true limits by load testing, then plan resources against growth forecasts — rate limits and SLO commitments are grounded here.",
    why: "Without knowing the limits, timeout budgets and rate quotas are guesses; capacity needs lead time.",
    points: [
      "Load-test the real chain with real data volume (shadow traffic / replay) — bare endpoint benchmarks don't count.",
      "Express limits as input capacity: QPS x data size x concurrency, not a single number.",
      "Capacity plans track growth forecasts with review dates on the calendar.",
    ],
    pitfall: "Load testing against ten thousand rows, shipping against a hundred million — the latency curve is a different animal.",
  },
  "D4|故障演练（混沌工程）": {
    def: "Inject failures deliberately and controlled — kill instances, add latency, cut dependencies — to verify that breakers, fallbacks and draining actually work.",
    why: "Resilience that has never fired only exists in config files (D4 invariant) — drills turn paper resilience into verified fact.",
    points: [
      "Start with a small blast radius: one instance → one availability zone → dependency cascades.",
      "Define observability metrics and abort conditions before the drill; watch the dashboards throughout.",
      "Findings feed the postmortem loop, or the drill is just theater.",
    ],
    pitfall: "Performing drills only in low-traffic windows, never rehearsing the real cascading-failure scenarios.",
  },
  "D5|结构化日志": {
    def: "Logs are data with fields (JSON), not concatenated strings for humans to read.",
    why: "Debugging needs filtering, aggregation and statistics by field; regex-parsing string logs is unmaintainable.",
    points: [
      "Strict level semantics: ERROR = a human must look; WARN = auto-recovered but worth tracking.",
      "One log line, one event; exception stacks go in a dedicated field.",
      "Sensitive fields (phone numbers/tokens) are masked at the serialization boundary.",
    ],
    pitfall: "Concatenating stack traces into the message — no dedup, no aggregation, alert noise explodes.",
  },
  "D5|traceId · spanId（OpenTelemetry）": {
    def: "One traceId per request, one spanId per hop, propagated across services by the standard (W3C Trace Context).",
    why: "Without a traceId threading through the logs, debugging runs on luck (D5 invariant).",
    points: [
      "Traces start at the frontend/gateway and run all the way to the database (D5 invariant).",
      "Propagate context explicitly across thread pools and async tasks, or the trace breaks.",
      "Use OpenTelemetry semantic conventions; don't invent field names.",
    ],
    pitfall: "Context lost in an async thread pool — the trace breaks exactly at the message-consumer hop.",
  },
  "D5|RED 指标": {
    def: "Three metrics per endpoint: request Rate, Errors, and Duration distribution.",
    why: "Metrics answer where it broke; without per-endpoint RED, fault localization starts with guessing.",
    points: [
      "Label by endpoint/route with controlled label cardinality.",
      "Use histograms (p50/p95/p99) for latency, never averages.",
      "SLOs are defined on RED, not on resource utilization.",
    ],
    pitfall: "Watching only the global average latency — the long tail of users gets averaged away.",
  },
  "D5|采样": {
    def: "Keep only a fraction of traces/logs, spending the collection budget on high-value signals.",
    why: "Full capture is unaffordable and unnecessary; the sampling policy decides what you can see.",
    points: [
      "Sample errors and slow requests at 100%; tail-sample normal traffic.",
      "Head sampling (decided at entry) vs tail sampling (decided after the full trace) each carry trade-offs.",
      "Sampling decisions must be consistent end to end, or traces won't reassemble.",
    ],
    pitfall: "Each service sampling randomly on its own — the aggregator can't rebuild a single complete trace.",
  },
  "D5|告警分级": {
    def: "Tier alerts by actionability: page now, ticket during business hours, dashboard for awareness only.",
    why: "Alert fatigue gets real alarms ignored — tiering exists to protect the on-call engineer's attention.",
    points: [
      "Every alert must state what to do when it fires; if you can't write it, delete the alert.",
      "Alert on symptoms (SLO burn rate), not causes (high CPU).",
      "Alerts carry a runbook link.",
    ],
    pitfall: "Paging on CPU > 80% — two weeks later the on-call is immune to every alert.",
  },
  "D5|前端异常上报": {
    def: "Frontend errors, API failures and performance metrics reported back with a traceId for correlation.",
    why: "Users see more breakage than you think; observing the system's boundary starts at the outermost layer.",
    points: [
      "Report over an independent channel — the main API being down must not kill error reporting too.",
      "Sample, dedupe and aggregate to survive reporting floods.",
      "Carry the traceId so frontend errors join the backend trace.",
    ],
    pitfall: "Frontend errors without a traceId — you know that something broke, never which hop.",
  },
  "D5|SLO 与错误预算": {
    def: "Define service quality targets with SLIs (success rate, latency percentiles); the allowance for falling short is the error budget.",
    why: "Metrics answer how much; SLOs answer whether that's enough — without a target you can't tell noise from incident (D5's decision layer).",
    points: [
      "Choose SLIs from the user's perspective (success rate, p95 latency), not resource utilization.",
      "Budget burned → freeze releases, focus on reliability until it recovers.",
      "Never set the target at 100%: a zero budget makes every release a violation.",
    ],
    pitfall: "SLOs defined and never consulted — they must hook into the release process and alerting, or they're numbers on a wall.",
  },
  "D5|故障复盘": {
    def: "Structured review after incidents: timeline, root cause, action items — pursue the system, not the person (blameless postmortem).",
    why: "Incidents without postmortems repeat (D5 invariant); the material observability collects only becomes organizational memory through review.",
    points: [
      "Blameless: analyze why the system allowed the incident, not who typed the wrong change.",
      "Action items need owners and deadlines, tracked to closure — otherwise the next review repeats the agenda.",
      "Root causes stated as which invariant was violated prevent recurrence far better than whose fault it was.",
    ],
    pitfall: "Running the review as a blame session — soon nobody reports incidents early; everyone learns to cover first.",
  },
  "D6|认证 vs 授权": {
    def: "Authentication answers who you are; authorization answers what you may do to what.",
    why: "Conflating the two turns logged-in-users-can-edit-others-data vulnerabilities into features.",
    points: [
      "AuthN outputs a principal; AuthZ takes principal + resource + action as input.",
      "Authorization checks land on every object access, not just at the endpoint.",
      "Implement and test the two layers separately.",
    ],
    pitfall: "Authenticating only at the gateway while the business layer assumes every incoming request may write.",
  },
  "D6|RBAC · ABAC": {
    def: "RBAC grants permissions by role; ABAC decides dynamically by attribute rules (user/resource/environment).",
    why: "The permission model decides authorization granularity and long-term maintainability — a wrong model means permanent patching.",
    points: [
      "Start with RBAC; introduce ABAC hybrid when rules explode.",
      "Roles follow responsibilities, not the org chart.",
      "Feature permission (what you can do) and data-scope permission (which rows: self / department) are two dimensions — don't cram them into one role model.",
      "Permission changes are themselves audited.",
    ],
    pitfall: "One super-admin role absorbing every privilege — least privilege in name only.",
  },
  "D6|注入类漏洞族": {
    def: "User input interpreted as part of code or queries: SQL injection, command injection, template injection, LDAP injection.",
    why: "The most extreme consequence of all-input-is-untrusted (nature N1) — input literally becomes executable logic.",
    points: [
      "Parameterized queries / prepared statements are the wholesale fix, not filtering case by case.",
      "Anywhere a concatenated string reaches an interpreter is an injection point.",
      "Code review specifically watches for hand-concatenated native queries.",
    ],
    pitfall: "Assuming an ORM makes you immune — concatenated native queries inject just fine.",
  },
  "D6|对象级越权（IDOR）": {
    def: "Users reach objects that aren't theirs by changing an id: someone else's order number in /orders/1042.",
    why: "The authorization check landed on the endpoint instead of the object (D6 invariant) — endpoint auth is not ownership verification.",
    points: [
      "Verify ownership on every object access: WHERE id = ? AND user_id = ?.",
      "Unguessable ids (UUIDs) only mitigate; they don't replace the check.",
      "Authorization-bypass paths need automated test coverage.",
    ],
    pitfall: "The endpoint requires login, but enumerating order ids reads the whole site's data.",
  },
  "D6|最小权限": {
    def: "Deny by default, grant on demand; prefer temporary elevation over permanently accumulated privilege.",
    why: "The larger the permission surface, the bigger the blast radius of leaks and mistakes — it decides how bad things get when they go bad.",
    points: [
      "Service accounts too: the application shouldn't connect to the database as admin.",
      "Three-way database account split: application (DML), migration (DDL), human (per-use approval).",
      "Permissions have requests, expiries, and revocations.",
      "Audit actual usage of privileged accounts regularly.",
    ],
    pitfall: "Granting DBA to the service account for convenience — it's just internal network anyway.",
  },
  "D6|密钥管理": {
    def: "Full-lifecycle management of secrets: generation, storage, rotation, auditing.",
    why: "A secret that has been in git once should be treated as leaked (D6 invariant) — leakage is irreversible.",
    points: [
      "Secrets live in KMS/secret managers, injected at runtime — never in code or config files.",
      "Rotation is routine: every release can rotate; quarterly it must.",
      "Install repo leak scanning that covers historical commits too.",
    ],
    pitfall: "Committing secrets in config and hiding behind the repo is private excuse.",
  },
  "D6|脱敏": {
    def: "Mask or remove sensitive fields when logging, displaying or exporting (phone 138****5678).",
    why: "Minimal exposure is the shared bottom line of security and compliance — the fewer eyes, the better.",
    points: [
      "Mask at the serialization boundary uniformly, not scattered hand-written spots.",
      "Preserve usability: last four digits, hash lookup tables.",
      "Classify the data first, then set masking rules.",
    ],
    pitfall: "Logging whole request bodies — passwords and tokens land in the log system in plaintext.",
  },
  "D6|审计日志": {
    def: "Tamper-evident records of who, when, did what to which object — kept separate from business logs.",
    why: "Accountability, compliance checks and forensics all depend on it (N5's time dimension).",
    points: [
      "Audit logs have independent storage and retention policies; application log rotation must not erase them.",
      "Record before-and-after values, not just that something changed.",
      "Make the audit-write-failure policy explicit: block the business or alert and proceed — decide deliberately.",
    ],
    pitfall: "Mixing audit logs with ordinary logs — one disk cleanup and the evidence is gone.",
  },
  "D6|密码与凭证存储": {
    def: "Store passwords with salted slow hashes (bcrypt / argon2): irreversible, per-user salt.",
    why: "Assume the database will be dumped one day — that moment, the slow hash is the user's last line of defense (D6 invariant).",
    points: [
      "bcrypt / argon2 with a cost factor: raise it as compute grows, migrate re-hashes transparently.",
      "Uniform login-failure messages (no distinction between unknown user and wrong password).",
      "Password-reset tokens are single-use, short-lived, sent through a separate channel.",
    ],
    pitfall: "MD5/SHA with salt for passwords — fast hashes are built for collisions; GPUs try a hundred million per second.",
  },
  "D6|会话与令牌管理": {
    def: "The full lifecycle of sessions (server-side state) and tokens (self-contained JWT): issuance, renewal, logout, revocation.",
    why: "Credential lifetime and revocation policy decide what a leak is worth — session management is the other half of authentication.",
    points: [
      "Stateless JWT means unrevokable: for sensitive flows use short-lived access tokens plus refresh rotation.",
      "Logout/password change must invalidate old tokens (blocklist or per-user version number).",
      "Regenerate the session identifier after login to prevent session fixation.",
    ],
    pitfall: "A seven-day non-revocable JWT — one leak means a week of free rein.",
  },
  "D6|传输与静态加密": {
    def: "TLS everywhere in transit (including internal service-to-service) plus encryption at rest for sensitive fields and disks.",
    why: "The internal network isn't trusted either (N1's intranet version) — design as if traffic will be tapped.",
    points: [
      "TLS covers inter-service traffic, not just the entry point.",
      "Automated certificate rotation (ACME): an expired certificate means the whole site is down.",
      "Encryption at rest guards pulled disks; field-level encryption/hashing guards dumped databases.",
    ],
    pitfall: "No encryption internally — one compromised instance becomes the whole intranet's tap.",
  },
  "D6|业务逻辑与防滥用": {
    def: "Attacks don't always use technical exploits: farming coupons, bulk registration and abuse ride legal endpoints used illegally.",
    why: "Scanners catch injection and broken access control; only designers can prevent business-logic flaws (OWASP ASVS V11 business logic).",
    points: [
      "Critical flows (registration / coupons / withdrawal) get abuse thresholds and graduated challenges.",
      "Internal endpoints need authn and audit too — a compromised internal service shouldn't become a springboard.",
      "Risk-control actions must be explainable and appealable; false kills hurt more than misses.",
    ],
    pitfall: "A marketing campaign launches without rate limits or budgets — one night, farmed to zero by scripts.",
  },
  "D7|模块边界": {
    def: "Split modules by business capability (not technical layers); boundaries are contracts, and crossing them goes through public interfaces only.",
    why: "Parallel team development (nature N5) presupposes stable boundaries — the boundary is the division of labor.",
    points: [
      "Boundaries are explicit APIs/interfaces, not directory conventions.",
      "Data ownership is decided at the boundary: every table has exactly one owner.",
      "Technical layering (web/service/dao) lives inside a module, not between modules.",
    ],
    pitfall: "Modules by controller/service/dao — every business spreads horizontally and one requirement touches five directories.",
  },
  "D7|依赖规则（单向 · 无环）": {
    def: "Module dependencies point one way only; a cycle means the boundary was drawn wrong.",
    why: "An acyclic dependency graph is the precondition of testability (D7 invariant) — with cycles, nothing can be tested independently.",
    points: [
      "Check with tooling (ArchUnit/dependency-constraint), not by eye.",
      "Shared code sinks downward; it doesn't get pulled sideways between modules.",
      "Depend on interfaces, not implementations.",
    ],
    pitfall: "Easing circular dependencies by extracting yet another common — which becomes a dumping ground.",
  },
  "D7|规范自动化（lint · 门禁）": {
    def: "Translate conventions into machine-checkable CI rules; violations fail the build.",
    why: "Verbal conventions always rot; only machine-checkable ones survive (D7 invariant).",
    points: [
      "Rules live in CI; code review stops policing style manually.",
      "New rules run in warn-only mode for two weeks before turning blocking.",
      "Every rule documents its why, or it gets deleted as noise half a year later.",
    ],
    pitfall: "Shipping too many rules at once — the team switches lint off and it becomes theater.",
  },
  "D7|测试金字塔": {
    def: "Many unit tests, fewer integration tests, fewer still end-to-end — layered by feedback speed.",
    why: "Higher layers are slower and flakier; the pyramid shape is the natural result of maintenance cost.",
    points: [
      "Unit tests verify behavior, not implementation — refactors shouldn't turn them red.",
      "Integration tests concentrate on boundaries: database, messaging, external services.",
      "End-to-end keeps only critical-path smoke; it is not your functional regression.",
    ],
    pitfall: "All integration tests, forty minutes and randomly red — eventually nobody runs them.",
  },
  "D7|CI/CD": {
    def: "Commit triggers automatic build, test and deployability; releasing becomes a low-risk, high-frequency act.",
    why: "The more releases hurt, the rarer they get; the rarer, the bigger the batch, the more they hurt (N5's vicious cycle).",
    points: [
      "A red pipeline is the top-priority fix — don't skip it or rerun on luck.",
      "Decouple deploy from release: deploy first, let traffic in via feature flags.",
      "Every release has a rollback path, and the rollback has been rehearsed.",
    ],
    pitfall: "The CD pipeline is all green but nobody dares press release — what's missing is confidence, not tooling.",
  },
  "D7|ADR 架构决策记录": {
    def: "One page per decision: context, options considered, the decision, reasoning, consequences.",
    why: "Team memory drains away (N5); an unrecorded decision gets re-litigated six months later.",
    points: [
      "Numbered and stored in the repo, reviewed alongside code.",
      "Overturned decisions are kept, with the reasons for the overturn.",
      "The first reading for every new teammate's onboarding.",
    ],
    pitfall: "Decisions living only in meeting notes — gone with the next person.",
  },
  "D7|功能开关与灰度发布": {
    def: "Control feature visibility with flags, combined with canary / blue-green: releases become controlled small-traffic experiments.",
    why: "Deploy is not release: code goes up first, traffic follows — shrinking the error radius from everyone to 1%.",
    points: [
      "Flags default to off and carry expiry dates in their names — cleanup after release.",
      "During canaries, watch SLOs / error rates; automated rollback beats humans.",
      "Flags are a release tool, not architecture: every flag left behind is a new state combination.",
    ],
    pitfall: "Flags accumulate until the combinations explode and nobody dares delete any — the flags became the tech debt.",
  },
  "D7|环境一致性": {
    def: "Development / staging / production are isomorphic: same images, same configuration approach, same dependency versions (dev/prod parity).",
    why: "Works on my machine is rooted in environment drift (N5): the differences themselves are a defect source.",
    points: [
      "Build the artifact once, deploy to every environment — build once, run anywhere.",
      "All configuration differences are explicit and external (env vars / config center), no if-environment in code.",
      "Test data comes from masked production data, not hand-made toys.",
    ],
    pitfall: "A locally installed dependency missing from the lockfile — production builds a different thing than your machine runs.",
  },
  "D7|代码评审（Code Review）": {
    def: "Small-batch, high-frequency peer review: every line of code gets a second pair of eyes.",
    why: "Review is where governance executes — lint covers what machines can check, review covers what they can't: design soundness, edge cases, knowledge flow (D7 invariant).",
    points: [
      "PRs small enough to review in 30 minutes; a PR too big to review equals unreviewed.",
      "Review standards live in the contributing guide: what must be raised vs. personal preference.",
      "The primary output is knowledge flow, not gatekeeping — nobody is the only person who understands a module.",
    ],
    pitfall: "Reviews nitpicking formatting and naming — that's lint's job; review should look at error paths, boundaries and tests.",
  },
  "D7|代码所有权（CODEOWNERS）": {
    def: "Every module has an explicit owner whose approvals gate changes to it (the CODEOWNERS mechanism).",
    why: "Module boundaries degrade when nobody is accountable (N5); ownership is the social enforcement of boundaries.",
    points: [
      "The owner is the boundary's gatekeeper, not the sole author — others still contribute.",
      "Ownership transfers explicitly when owners leave or rotate — process, not vibes.",
      "CI validates the ownership file: a new directory must declare an owner.",
    ],
    pitfall: "Everyone is an owner = nobody is; approvals degenerate into reflexive sign-offs.",
  },
  "D7|第三方依赖管理": {
    def: "Full-lifecycle dependency management: lockfiles pin versions, upgrades keep a cadence, vulnerabilities get responses.",
    why: "Dependencies are borrowed complexity (D7 invariant): without proactive upgrades, they'll force one at the worst moment — a security incident.",
    points: [
      "Lockfiles in the repo for reproducible builds; direct and transitive dependencies both visible.",
      "Minor upgrades are routine (weekly); major upgrades get their own schedule and review.",
      "Subscribe to advisories (dependabot-style) and respond by severity tier.",
    ],
    pitfall: "A five-year-old dependency forced into a major-version jump by an incident — nobody knows what will break.",
  },
  "D7|技术债管理": {
    def: "Register shortcuts explicitly: the debt amount, the interest (impact scope), and the repayment plan.",
    why: "Unregistered debt doesn't disappear — it collects at the worst moment, billed as an incident (N5's time dimension).",
    points: [
      "Register into issues/ADRs tagged tech-debt, recording why it was the right call at the time.",
      "Repayment takes a fixed slice of every iteration, not whenever we have time.",
      "New debt passes review: state the interest and the repayment trigger.",
    ],
    pitfall: "We'll refactor after this crunch — the crunch never ends and the interest compounds monthly.",
  },
  "D7|弃用与下线流程": {
    def: "Exit management for old interfaces and fields: announcement, per-caller usage monitoring, migration docs, sunset on schedule.",
    why: "A system that only adds becomes a museum; without a deprecation process, staying compatible turns into an indefinite promise.",
    points: [
      "Deprecation notices carry a sunset date — an announcement without a date is just an apology letter (D7 invariant).",
      "Monitor usage per caller; only cut off after it drops below threshold.",
      "Provide migration docs and a grace window; internal callers migrate before the external sunset.",
    ],
    pitfall: "Just slap Deprecated on it, nobody reads it anyway — three years later it's still there and untouchable.",
  },
  "D7|康威定律与团队边界": {
    def: "System structure mirrors the organization's communication structure — draw service boundaries along team boundaries.",
    why: "A service boundary crossing teams means cross-team coordination on every change; governance must acknowledge organizational reality (N5).",
    points: [
      "One service, one clearly owning team — and vice versa.",
      "Boundaries between teams go through formal API contracts, not shared libraries or shared tables.",
      "Splitting microservices without moving the org just relocates the friction.",
    ],
    pitfall: "Three teams co-owning one service — priorities collide and nobody dares refactor it.",
  },
  "D7|值班与升级路径": {
    def: "Who responds to which alert severity at which time, and who it escalates to when stuck — written down as an institution.",
    why: "Alert tiers answer how severe; the on-call system answers who looks. Without an escalation path, the 3 a.m. incident runs on heroism.",
    points: [
      "Write and rehearse the escalation chain: primary → secondary → manager, with response windows.",
      "On-call follows service ownership: those who operate it carry the pager.",
      "Rotate and compensate; perpetual single-person duty ends in resignation.",
    ],
    pitfall: "When it breaks, call the one person who understands — the day he's on vacation, the incident upgrades to a disaster.",
  },
  "D7|文档与 Runbook": {
    def: "Three document types reviewed alongside code: README (what it is), Runbook (how to operate), ADR (why it was decided).",
    why: "Team memory drains (N5); alert tiers require every alert to carry a runbook — an alert without docs is not actionable.",
    points: [
      "Docs travel with code: reviewed in the same PR, versioned in the same directory.",
      "Runbooks spell out steps and rollbacks, written for your panicked 3 a.m. self.",
      "Every doc names its maintainer; stale docs are worse than none.",
    ],
    pitfall: "Docs that expire on arrival — an unowned wiki page misleads more than a blank page.",
  },
};

/* ---------- 不变量 / 域元信息 / 毕业闸检索题 ---------- */

export const enInvariants: Record<string, string[]> = {
  D1: [
    "A published contract is a liability: fields can be added, semantics never changed.",
    "Errors are part of the contract, not accidents.",
    "All input is untrusted.",
    "Message systems only promise at-least-once: real exactly-once is assembled by consumer-side idempotency.",
  ],
  D2: [
    "Check-then-write always leaves a race window.",
    "Networks retry, so every write may execute twice — idempotency is the default requirement for write APIs, not a bonus.",
    "There is no atomic commit across services: every distributed-transaction participant must be able to write its own compensation.",
    "Scheduled jobs re-enter and run concurrently by default: a background task without idempotency and mutual exclusion is a landmine in production.",
  ],
  D3: [
    "Schema changes decouple from code releases: old and new code versions must both run on the same schema.",
    "Cache and database are two systems; the inconsistency window can only be shortened or tolerated, never eliminated.",
    "A backup that has never been restored is not a backup.",
    "Data that only goes in never coming out — the system will eventually be crushed by its own history.",
    "Money is always integer or fixed-point: floats computing money lose cents.",
    "Store time in UTC, transmit ISO 8601, localize only at the presentation layer.",
  ],
  D4: [
    "A call without a timeout is a random hang.",
    "Each layer retrying on its own exponentially amplifies downstream traffic (the retry storm).",
    "Timeouts are allocated backwards from an end-to-end budget, not guessed per layer.",
    "Under overload, proactively rejecting some requests is protection; letting every request time out together is the incident.",
    "Resilience that has never been rehearsed is just decoration in a config file.",
  ],
  D5: [
    "Logs without a traceId threading through them make debugging a matter of luck.",
    "Metrics tell you where, logs tell you why, traces tell you which hop — none can substitute for another.",
    "The traceId should be generated at the frontend and carried through gateway, services, and database.",
    "Incidents without postmortems repeat; postmortems pursue the system, not the person.",
  ],
  D6: [
    "A secret that has been in git once should be treated as leaked.",
    "Authorization checks must land on every object access, not just on endpoints.",
    "Passwords must be irreversible: when the database leaks, the slow hash is the user's last line of defense.",
  ],
  D7: [
    "Verbal conventions always rot; only machine-checkable conventions survive.",
    "An acyclic dependency graph is the precondition of testability.",
    "Code review's primary purpose is knowledge flow: a module only one person understands is a single point of failure.",
    "Third-party dependencies are borrowed complexity: the moment there's no upgrade strategy, they start becoming liability.",
    "A deprecation notice without a sunset date is just an apology letter.",
  ],
};

export const enDomainMeta: Record<string, { name: string; problem: string; cross?: string }> = {
  D1: {
    name: "Contracts & APIs",
    problem: "How do two independently evolving systems cooperate without breaking each other?",
    cross: "Prior experience: unified exception handling ≈ the D1 × D7 intersection",
  },
  D2: {
    name: "Concurrency & Consistency",
    problem: "When many requests read and write the same state simultaneously, how do you stay correct?",
  },
  D3: {
    name: "Data & State",
    problem: "Make data outlive processes — and let it evolve safely.",
  },
  D4: {
    name: "Distributed Resilience",
    problem: "Design as if dependencies will definitely fail — treat it as the norm, not the exception.",
  },
  D5: {
    name: "Observability",
    problem: "When the system breaks, answer within minutes: what broke, why, and which hop of the chain.",
    cross: "Structured logging · frontend error reporting",
  },
  D6: {
    name: "Security",
    problem: "Facing an untrusted network, real users and attackers — defend the data and the boundary.",
  },
  D7: {
    name: "Engineering Governance",
    problem: "Make conventions survive teams and time.",
    cross: "Boundary drawing · modularity · internal packaging · no circular deps · shared common library · shared constants · CI/CD",
  },
};

export const enChecks: Record<
  string,
  { question: string; options: { label: string; correct: boolean }[]; explanation: string }
> = {
  check4: {
    question:
      "A production API needs to add a new value \"partially refunded\" to the \"order status\" enum. Which approach does not break existing callers?",
    options: [
      { label: "A. Rename the old enum value and announce it in release notes", correct: false },
      {
        label: "B. Add the new value only, keep old semantics, and clients have a fallback for unknown values",
        correct: true,
      },
      { label: "C. Coordinate all callers to switch over on the same day", correct: false },
    ],
    explanation:
      "Contracts only ever add fields, never change semantics. \"Everyone ships simultaneously\" is a distributed-systems fantasy — additive values plus unknown-value fallbacks are what's actually safe.",
  },
  check1: {
    question:
      "Networks retry, so every write may execute twice — which domain owns this rule most directly?",
    options: [
      { label: "D3 Data & State: migrations must be idempotent", correct: false },
      { label: "D2 Concurrency & Consistency: write APIs require idempotency by default", correct: true },
      { label: "D4 Distributed Resilience: retries need backoff and jitter", correct: false },
    ],
    explanation:
      "Duplicate execution from retries lands on the semantics of write — idempotency is D2's invariant; backoff and jitter are D4's countermeasures.",
  },
  check5: {
    question: "Half the new code is deployed and now you need to drop a database column. What is the correct order?",
    options: [
      { label: "Drop first; errors from old code will trigger an automatic rollback", correct: false },
      { label: "Put the release and the drop in one deploy ticket and finish atomically", correct: false },
      { label: "Expand-contract: old and new code coexist on one schema first; drop only after the full switchover", correct: true },
    ],
    explanation:
      "Schema changes must decouple from code releases — old and new code running on the same schema is D3's first invariant.",
  },
  check6: {
    question:
      "Services A → B → C each configure retry-3-times on failure. When C breaks, what is the most likely chain reaction?",
    options: [
      { label: "No impact — retries are a protection mechanism", correct: false },
      { label: "Circuit breakers auto-scale and absorb it", correct: false },
      { label: "A retry storm: C's failure is amplified several-fold by two retrying layers above it", correct: true },
    ],
    explanation:
      "Independent per-layer retries exponentially amplify downstream traffic; retries must obey an end-to-end budget — timeouts allocate backwards from the total, a D4 invariant.",
  },
  check7: {
    question:
      "Users report occasional slow checkouts, and all you have is per-machine sharded logs. What should you add first?",
    options: [
      { label: "A traceId generated at the frontend, carried through gateway, services and database", correct: true },
      { label: "Turn every log level up to DEBUG", correct: false },
      { label: "Add machines to spread the log load", correct: false },
    ],
    explanation:
      "Without a traceId threading through, debugging runs on luck; metrics say where, logs say why, traces say which hop — none interchangeable, a D5 invariant.",
  },
  check3: {
    question:
      "A secret that has been in git once should be treated as leaked — which domain's invariant is this?",
    options: [
      { label: "D7 Engineering Governance: rules must be machine-checkable", correct: false },
      { label: "D1 Contracts & APIs: errors are part of the contract", correct: false },
      { label: "D6 Security: the irreversible-leak assumption of secrets management", correct: true },
    ],
    explanation:
      "Secrets management belongs to D6 Security; machine-checkable rules are D7's invariant — don't mix the two.",
  },
  check8: {
    question:
      "The team agrees services must not import each other. Six months later, how do you confirm the convention is still alive?",
    options: [
      { label: "Write it in the wiki and read it aloud quarterly", correct: false },
      { label: "Rely on reviewers remembering during code review", correct: false },
      { label: "Encode it in lint gates / dependency checks; CI goes red on violation", correct: true },
    ],
    explanation:
      "Verbal conventions rot; only machine-checkable ones survive — and an acyclic dependency graph is likewise CI-checkable. D7 invariants.",
  },
  check2: {
    question: "Where does circuit breaking sit in the three-layer model?",
    options: [
      { label: "L1 Principles: the pattern itself hasn't changed in decades", correct: true },
      { label: "L3 Implementation: Resilience4j must be relearned in every language", correct: false },
      { label: "L2 Paradigms only, unrelated to principles", correct: false },
    ],
    explanation:
      "Circuit breaking lives at the principle/paradigm layer — learn it once; Resilience4j, gobreaker and cockatiel are just different L3 skins.",
  },
};

/* ---------- 本性描述 / 三层 / 四步 / 校准 / 范围 / 分幕解说 ---------- */

export const enNatureDesc: Record<string, string> = {
  N1: "Requests arrive from an untrusted network",
  N2: "Many requests arrive at once, sharing state",
  N3: "Data outlives processes",
  N4: "Networks, databases and third parties will fail",
  N5: "Maintained by teams, running 24/7 in production",
};

export const enLayerNotes: Record<string, { name: string; lede: string; pace: string; examples: string[]; note: string }> = {
  l1: {
    name: "Principles & invariants",
    lede: "Phenomenon-level laws that answer why it must be so.",
    pace: "Unchanged for decades — learn one, own it forever; the highest compound interest",
    examples: ["CAP trade-offs", "Isolation-level anomalies", "Preconditions of idempotency", "Cost model of locks and waiting"],
    note: "What interviews probe and postmortems trace back to almost always lives on this layer.",
  },
  l2: {
    name: "Paradigms & patterns",
    lede: "Proven approaches to classes of problems, transferable across languages.",
    pace: "Evolves yearly — the asset you carry when switching languages",
    examples: ["Circuit breakers / bulkheads", "Event-driven", "CQRS", "Saga distributed transactions"],
    note: "The same paradigm resurfaces in every language wearing new skin — recognizing it cuts learning cost by an order of magnitude.",
  },
  l3: {
    name: "Implementation",
    lede: "The mapping table of concrete languages, frameworks and APIs.",
    pace: "Changes monthly — findable in docs, no need to memorize",
    examples: ["Spring transaction annotations", "Resilience4j", "Sequelize / MyBatis", "Cloud vendor SDKs"],
    note: "Learning a new backend language should cost only this layer.",
  },
};

export const enStepNotes: Record<string, { practice: string }> = {
  m1: {
    practice: "For any new technology, ask two questions: which domain does it belong to, and which invariant does it guard? No answer means you haven't learned it yet.",
  },
  m2: {
    practice: "Translate every rule you read into: does this still hold in another language? If yes, it's L1/L2 — remember it; if no, it's L3 — just look it up.",
  },
  m3: {
    practice: "When learning a new language, build a mapping table: every domain concept you know → its counterpart in the new language. Fill the table and you're halfway there.",
  },
  m4: {
    practice: "In every postmortem, tag the root cause with domain + the invariant that was violated. If you can attribute it, the framework has become intuition.",
  },
};

export const enLearningSteps: Record<string, string> = {
  m1: "Read 2–3 classic sources per domain: skeleton first, details later.",
  m2: "For every concept ask: does it survive a language switch? What survives is L1/L2; what doesn't is L3.",
  m3: "Reuse the whole concept layer — the only legitimate cost of a new backend language is the implementation layer.",
  m4: "Attribute every incident to a domain and a violated invariant. Attribution means the framework has been internalized.",
};

export const enCalibration: { items: string[]; to: string }[] = [
  {
    items: ["Unified structured logging", "Frontend error reporting"],
    to: "D5 Observability",
  },
  { items: ["Unified exception handling"], to: "D1 Contracts × D7 Governance" },
  {
    items: ["Boundary drawing", "Modularity", "Internal packaging", "Avoiding circular deps", "Shared common library", "Shared constants", "CI/CD"],
    to: "D7 Engineering Governance",
  },
];

export const enScopeRows: Record<string, { reason: string; revisit?: string }> = {
  "Git 与版本控制基础": {
    reason: "Target readers already have it; tool operations aren't governance knowledge — the framework only consumes its outputs (branches, reviews).",
  },
  "HTTP / DNS / 网络基础": {
    reason: "Beginner material; the framework directly consumes its conclusions (HTTP caching semantics, TLS).",
  },
  "数据结构与算法": {
    reason: "General CS fundamentals orthogonal to backend governance; a separate track would dilute the focus.",
  },
  "前端基础（HTML / CSS / JS）": {
    reason: "The backend-relevant intersection is already covered by D1 communication contracts.",
  },
  "具体中间件用法（Redis / Kafka / Elasticsearch…）": {
    reason: "Expires with a language or component swap; allowed only as material links in concept notes, never as nodes.",
  },
  "语言与框架（Spring / Django / Gin…）": {
    reason: "Same as above: L3 is a mapping table, not the knowledge framework itself.",
  },
  "容器与编排操作（Docker / Kubernetes）": {
    reason: "The governance concepts are already in (bulkheads, graceful shutdown, environment parity); platform operations are ops skills.",
  },
  "系统设计面试题解（秒杀 / 抢红包 / 短链…）": {
    reason: "Application exercises of this framework's knowledge, not new knowledge; every solution maps onto the seven domains.",
  },
  "对账系统（单列）": {
    reason: "Reconciliation as a safety net is already a key point of Streams & Batches.",
  },
  "分支与合流策略（单列）": {
    reason: "Trunk-based and short branches are folded into the Feature Flags & Canaries note.",
  },
  "通知与推送渠道管理": {
    reason: "The common core of channel retries / templates / backoff is covered by Delivery Semantics.",
  },
  "多租户数据隔离": {
    reason: "B2B / SaaS specific; the shared parts (authorization, least privilege) are covered in D6.",
    revisit: "When the audience is mostly SaaS builders",
  },
  "Webhook 收发与验签": {
    reason: "Delivery semantics and signature anti-forgery are covered by Delivery Semantics.",
    revisit: "When the async-contract section expands",
  },
  "雪花 ID / 唯一 ID 生成": {
    reason: "The invariant level is covered by Unique Constraints; generation schemes are L3.",
    revisit: "As an extension of the Unique Constraints note",
  },
  "服务发现与配置中心": {
    reason: "The governance surface is covered by Environment Parity and Secrets Management.",
    revisit: "When a self-built platform chapter appears",
  },
  "共识算法（Raft / Paxos）与线性一致性": {
    reason: "Application backends almost never implement these; fencing tokens are touched on in Distributed Locks.",
    revisit: "When an infrastructure chapter is added",
  },
  "CQRS / 事件溯源": {
    reason: "The core ideas are covered by the transactional outbox, read/write splitting and state machines.",
    revisit: "When the D3 data-modeling section expands",
  },

  "CDN 与边缘缓存": {
    reason: "The contract surface is covered by HTTP Caching; the rest is platform configuration.",
    revisit: "—",
  },
  "FinOps / 成本治理": {
    reason: "Engineering governance here stays within delivery and quality; cost is an organizational budget practice.",
    revisit: "When users ask for it",
  },
  "GC 与内存模型": {
    reason: "Language-runtime knowledge; its impact on tail latency is enough to mention in the relevant notes.",
    revisit: "—",
  },
  "生产数据变更纪律": {
    reason: "Overlaps with Audit Logs and Least Privilege; a difference analysis comes first.",
    revisit: "Next scope review round",
  },
  "文件上传与对象存储（分片 / 断点 / 预签名）": {
    reason: "Large-file transfer is a separate engineering problem; its security side (type validation / path traversal) belongs to ASVS V12.",
    revisit: "When content-management needs appear",
  },
  "异地多活与单元化": {
    reason: "Beyond application-backend governance; same-city DR concepts are covered by Replication & Backup.",
    revisit: "When multi-datacenter deployment becomes real",
  },
  "国际化（i18n 文案管理）": {
    reason: "Time & Time Zones already stands alone; multilingual copy management is product scope, not engineering governance.",
    revisit: "When serving overseas users",
  },
};

export const enStages: Record<string, string[]> = {
  derivation: [
    "The left side is the premise: five natures no backend system escapes.",
    "Serving others over an untrusted network → Contracts & APIs, Security.",
    "Handling concurrency → Concurrency & Consistency.",
    "Persistent state, data outliving processes → Data & State.",
    "Dependencies that will fail → Distributed Resilience, Observability.",
    "Long-term evolution → Observability, Engineering Governance. Seven domains, fully derived — not one of them an industry fashion.",
  ],
  layers: [
    "L3 Implementation: Spring Boot, Gin, Express — replaced in months to years.",
    "L2 Paradigms: layered architecture, 12-Factor, SRE — evolving over five to ten years.",
    "L1 Principles: idempotency, ACID, CAP — unchanged for decades.",
    "The shared core = L1 + L2; learning a new language ≈ replacing only the top layer.",
  ],
  d2: [
    "Two requests arrive together, both doing check-then-write.",
    "t1 · Request A reads x = 1.",
    "t2 · Request B also reads x = 1 — a stale value.",
    "t3 · A writes x = 2 based on the stale read.",
    "t4 · B writes x = 3 the same way — A's update is overwritten (lost update).",
    "The race window sits between the two reads and two writes. Countermeasures: unique constraints, idempotency tokens, state machines.",
  ],
  d4: [
    "Closed (default): requests pass through normally while consecutive failures are counted.",
    "Failures cross the threshold → open: fail fast or fall back, stop hitting the downstream.",
    "Cooldown timer elapses → half-open: let a few probe requests through.",
    "Probes succeed → back to closed; probes fail → back to open.",
  ],
};
