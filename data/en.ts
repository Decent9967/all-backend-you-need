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
};
