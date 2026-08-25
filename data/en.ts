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
  "熔断": "Circuit Breakers",
  "舱壁隔离": "Bulkheads",
  "降级": "Graceful Degradation",
  "背压": "Backpressure",
  "最终一致性": "Eventual Consistency",
  "限流与配额": "Rate Limiting & Quotas",
  "负载均衡与网关": "Load Balancing & Gateways",
  "优雅停机与健康检查": "Graceful Shutdown & Health Checks",
  "容量规划与压测": "Capacity & Load Testing",
  "故障演练（混沌工程）": "Chaos Engineering",
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
};
