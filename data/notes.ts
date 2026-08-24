/* 节点笔记：一节点一页内容（对齐 roadmap.sh 的 per-node content 模型）。
   conceptNotes 按键 `域ID|概念名` 索引，概念名必须与 framework.ts 完全一致。 */

export type NoteMaterial = {
  title: string; // 材料标题
  url?: string; // 真实链接（已验证可访问；书籍等无公开版本时可留空，渲染为纯文本）
};

export type ConceptNote = {

  def: string; // 一句话定义
  why: string; // 为什么存在（挂到域的根本问题/本性）
  points: string[]; // 关键点
  pitfall?: string; // 常见误区
  related?: string[]; // 相关概念（同域概念名，可跳转）
  materials?: NoteMaterial[]; // 精选材料（挂真实链接；无公开电子版的书籍可省 url）
};

export const conceptNotes: Record<string, ConceptNote> = {
  /* ---------- D1 契约与 API ---------- */
  "D1|统一响应模型": {
    def: "所有接口返回同一种信封结构（code / message / data），错误路径与成功路径结构一致。",
    why: "调用方不该为每个接口写一套解析逻辑；结构统一，才能在网关、SDK、监控层做统一处理。",
    points: [
      "信封字段一旦发布就只能加、不能改语义——它本身就是契约。",
      "业务码与 HTTP 状态码分层：传输层归 HTTP，业务语义归 code。",
      "列表/分页结构也要统一，别让每个接口自带一种数组包装。",
    ],
    pitfall: "把 HTTP 状态码当业务错误码用，网关和监控无法区分「传输失败」和「业务拒绝」。",
    related: ["错误码体系", "分页"],
    materials: [
      { title: "Google JSON Style Guide", url: "https://google.github.io/styleguide/jsoncstyleguide.xml" },
      { title: "RFC 9457 Problem Details", url: "https://www.rfc-editor.org/rfc/rfc9457" },
    ],
  },
  "D1|错误码体系": {
    def: "错误是 API 的一部分：有命名空间、可枚举、有文档、有「调用方该怎么办」的稳定错误码。",
    why: "调用方要能程序化地区分「重试能好」和「重试也没用」，否则只能拿 message 做字符串匹配。",
    points: [
      "错误码可读且有层级，如 ORDER.STOCK_INSUFFICIENT。",
      "每条错误写清楚：调用方该重试、该修参数、还是该找值班。",
      "错误响应带上可追踪的 requestId，和日志对得上。",
    ],
    pitfall: "所有错误都返回「系统繁忙」或裸 500，重试策略无从谈起。",
    related: ["统一响应模型", "幂等键"],
    materials: [
      { title: "RFC 9457 Problem Details", url: "https://www.rfc-editor.org/rfc/rfc9457" },
      { title: "Google API Design Guide · Errors", url: "https://cloud.google.com/apis/design/errors" },
    ],
  },
  "D1|版本化": {
    def: "用 URL 路径（/v1）或媒体类型标注 API 版本，让不兼容变更可以并行存在。",
    why: "你无法控制所有调用方同时升级——版本化就是给「独立演化」留出缓冲区。",
    points: [
      "对 API 而言，版本号只分「兼容」与「不兼容」两档。",
      "旧版本要有明确的退役时间表，而不是无限共存。",
      "新版本先与旧版本共存、观察流量迁移、再下线。",
    ],
    pitfall: "用请求参数做版本号，网关路由、缓存、监控都看不见版本维度。",
    related: ["Schema 前向 / 后向兼容"],
    materials: [
      { title: "Stripe API Versioning", url: "https://docs.stripe.com/api/versioning" },
      { title: "Microsoft REST API Guidelines", url: "https://github.com/microsoft/api-guidelines" },
    ],
  },
  "D1|幂等键": {
    def: "客户端为每次写操作生成唯一键（Idempotency-Key），服务端据此识别重试并返回首次的结果。",
    why: "网络会重试，同一请求可能到达两次——幂等键把「重复提交」变成「重复返回」，而不是「重复执行」。",
    points: [
      "幂等键要有 TTL 与作用域（按用户、按操作类型隔离）。",
      "首次结果要缓存：重复请求返回原响应，而不是报错。",
      "落地依赖服务端唯一约束——冲突即重复，天然防并发。",
    ],
    pitfall: "只在数据库加了唯一约束，应用层却在约束触发前先改了状态。",
    related: ["幂等 token", "错误码体系"],
    materials: [{ title: "Stripe Idempotency Keys 设计", url: "https://docs.stripe.com/api/idempotent_requests" }],
  },
  "D1|Schema 前向 / 后向兼容": {
    def: "加字段不破坏旧读者（后向兼容），新读者能容忍旧数据缺字段（前向兼容）。",
    why: "生产者与消费者独立部署，消息和响应一定会跨版本相遇。",
    points: [
      "只加可选字段，不改字段语义和类型。",
      "删字段要走「废弃 → 观察 → 删除」三步。",
      "枚举与 oneOf 要给 unknown 留兜底分支。",
      "null 与缺字段语义要区分：缺＝从没写过，null＝显式清空——混用是消费端最常踩的坑。",
    ],
    pitfall: "把字段从 string 改成 object——对旧消费者是原子级破坏，灰度瞬间炸。",
    related: ["版本化", "expand-contract"],
    materials: [
      { title: "Protobuf 兼容性规则", url: "https://protobuf.dev/programming-guides/dos-donts/" },
      { title: "Kleppmann · Schema Evolution（Avro/Protobuf/Thrift）", url: "https://martin.kleppmann.com/2012/12/05/schema-evolution-in-avro-protocol-buffers-thrift.html" },
    ],
  },
  "D1|入参声明式校验": {
    def: "用 Schema 声明入参约束（类型/长度/格式），在进入业务逻辑之前由框架统一校验。",
    why: "所有输入不可信（源 N1）；校验要在边界一次做完，而不是散落在业务代码里。",
    points: [
      "校验规则与 API 文档同源（注解/OpenAPI），写一遍用两处。",
      "对未知字段要有显式策略：拒绝或忽略，不能默认吞掉。",
      "校验失败也是结构化错误，走统一错误码体系。",
    ],
    pitfall: "在业务代码深处散落 if 校验——规则不可见、不可测、也测不全。",
    related: ["OpenAPI"],
    materials: [{ title: "OWASP Input Validation Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html" }],
  },
  "D1|分页": {
    def: "用统一的游标（cursor）或偏移（offset）参数限制单次返回量。",
    why: "无界查询会拖垮数据库和网络；列表接口的默认值必须是有限值。",
    points: [
      "游标分页在大数据量下稳定；offset 深翻页会随写入而漂移。",
      "page size 必须有硬上限，默认值克制。",
      "游标要编码排序键和位置，opaque 返回，不暴露内部结构。",
      "列表三件套——分页 / 排序 / 过滤——统一参数规范，别每个接口自造一套。",
    ],
    pitfall: "offset 深翻页时正好有数据插入，结果出现重复或遗漏。",
    related: ["统一响应模型"],
    materials: [{ title: "Slack Pagination (cursor) 文档", url: "https://api.slack.com/docs/pagination" }],
  },
  "D1|OpenAPI": {
    def: "用机器可读的契约描述 API（路径、Schema、错误码），文档、客户端、测试都从它生成。",
    why: "契约写在纸面上才会被遵守；手写文档必然过期。",
    points: [
      "契约先行：先定 OpenAPI，评审通过再写实现。",
      "CI 里校验「实现与契约一致」，漂移即失败。",
      "基于契约起 mock 服务，前后端并行开发。",
    ],
    pitfall: "先写代码后生成文档，契约沦为过期快照，没人再信它。",
    related: ["入参声明式校验", "Schema 前向 / 后向兼容"],
    materials: [
      { title: "OpenAPI 3.1 Specification", url: "https://spec.openapis.org/oas/v3.1.0" },
      { title: "Spec-First Development 实践" },
    ],
  },
  "D1|通信范式选择": {
    def: "同步对外形态在 REST / gRPC / GraphQL 之间选型——不是选最好的，是选匹配的。",
    why: "范式决定契约的表达力、演化方式和缓存策略；选错之后，改的成本接近重写。",
    points: [
      "REST + JSON 是默认解：生态、调试工具、网关兼容都最好。",
      "gRPC 适合内部高频服务间调用：强 Schema、双向流、体积小。",
      "GraphQL 适合「多来源聚合 + 客户端灵活查询」的场景，缓存与限流要额外做。",
      "对外统一一种范式，内部可以分化。",
    ],
    pitfall: "为了用新技术把对外 API 从 REST 迁到 GraphQL，客户端和整套缓存体系全部重学。",
    related: ["OpenAPI", "消息投递语义"],
  },
  "D1|消息投递语义": {
    def: "消息系统的三种交付承诺——at-most-once / at-least-once / exactly-once——以及 DLQ、重投、顺序的工程含义。",
    why: "异步契约的错误处理逻辑完全由交付语义决定；不知道语义，消费者就写不对。",
    points: [
      "分布式下的 exactly-once 基本是营销：真正落地是 at-least-once + 消费端幂等（D1 不变量）。",
      "处理失败进死信队列（DLQ）人工或定时处理，不是无限重投。",
      "主流只保证分区内有序；全局有序要付单分区吞吐的代价。",
      "延迟任务/定时任务是消息语义的近亲：可靠性同源。",
    ],
    pitfall: "默认「消息只来一次」，消费者不做幂等，重投一次就重复扣款。",
    related: ["幂等 token", "幂等键", "事件发件箱（outbox）"],
    materials: [
      { title: "Kafka 交付语义文档", url: "https://kafka.apache.org/documentation/#semantics" },
      { title: "RabbitMQ Consumer Acknowledgements", url: "https://www.rabbitmq.com/docs/confirms" },
    ],
  },
  "D1|契约测试": {
    def: "消费者与提供者各自对着同一份契约跑测试（消费者驱动），漂移在 CI 就被抓住。",
    why: "OpenAPI 描述契约，契约测试让契约持续被机器验证——静态文档发现不了实现跑偏。",
    points: [
      "消费者测试记录期望，提供者回放验证期望（Pact 模式）。",
      "跑在双方 CI 里：谁破坏契约谁红灯。",
      "与集成测试互补：测的是契约，不是实现细节。",
    ],
    pitfall: "只在提供者一侧做契约测试，消费者的真实期望没人记录。",
    related: ["OpenAPI", "版本化"],
    materials: [
      { title: "Pact 文档", url: "https://docs.pact.io/" },
      { title: "martinfowler.com · Consumer Driven Contracts", url: "https://martinfowler.com/articles/consumerDrivenContracts.html" },
    ],
  },
  "D1|HTTP 缓存语义": {
    def: "用 Cache-Control / ETag / If-None-Match 等响应头，把「能不能缓存、存多久、怎么协商」写进契约。",
    why: "缓存行为是服务端与浏览器/网关/CDN 的共同约定——这些头字段就是契约的一部分，语义改了它们也要跟着改。",
    points: [
      "Cache-Control 精确表达：max-age / no-store / private，别用已被淘汰的 Expires 兜底。",
      "ETag 协商缓存：内容没变回 304，省的是带宽和时间。",
      "缓存键要含会话/版本维度——带个人ization 的响应禁止 public 共享缓存。",
    ],
    pitfall: "带用户数据的响应没设 private，被共享 CDN 缓存——下个用户直接读到别人的数据。",
    related: ["缓存一致性", "版本化"],
    materials: [
      { title: "MDN · HTTP Caching", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching" },
      { title: "RFC 9111", url: "https://www.rfc-editor.org/rfc/rfc9111" },
    ],
  },

  /* ---------- D2 并发与一致性 ---------- */
  "D2|竞态条件": {
    def: "结果依赖多个操作的交错时序——同样的输入，不同的并发顺序，不同的结果。",
    why: "多个请求共享同一份状态（源 N2），「先检查后写入」之间永远存在时间窗口。",
    points: [
      "先复现再修复：用并发测试（多线程压同一接口）把交错压出来。",
      "修复手段按优先级：数据库约束 > 事务/锁 > 应用层重试。",
      "能推给存储层保证的，就别在应用层手写。",
    ],
    pitfall: "用「先查后改」的 ORM 默认写法，平时正常，压测一上就超卖。",
    related: ["乐观锁 · 悲观锁", "唯一约束", "状态机"],
    materials: [{ title: "《DDIA》第 7 章 · Weak Isolation", url: "https://dataintensive.net/" }],
  },
  "D2|事务与隔离级别": {
    def: "数据库提供的原子性与隔离保证；隔离级别决定并发事务互相能看见什么。",
    why: "正确性的第一道防线在存储层——应用层不该重新发明它。",
    points: [
      "常用级别（RC/RR）各有异常：脏读、不可重复读、幻读、丢失更新。",
      "隔离越强，并发吞吐越低；按业务选级别而不是无脑最高。",
      "事务边界 = 业务边界：事务里别放外部调用。",
    ],
    pitfall: "以为开了事务就并发安全——丢失更新在 RC 下照样发生。",
    related: ["乐观锁 · 悲观锁", "竞态条件"],
    materials: [
      { title: "《DDIA》第 7 章 · 事务", url: "https://dataintensive.net/" },
      { title: "PostgreSQL 隔离级别文档", url: "https://www.postgresql.org/docs/current/transaction-iso.html" },
    ],
  },
  "D2|乐观锁 · 悲观锁": {
    def: "悲观锁先加锁再操作（假设冲突常发）；乐观锁提交时校验版本号（假设冲突少）。",
    why: "这是并发写同一份数据的两种代价模型——等待 vs 重试。",
    points: [
      "选型看冲突率：低用乐观，高用悲观。",
      "乐观锁重试要有次数上限和退避，否则自己造重试风暴。",
      "悲观锁要控制持有时长，跨网络调用持锁是死锁温床。",
      "死锁三原则：全链路加锁顺序一致、事务尽量短、持锁期间不调外部服务——数据库死锁日志是第一证据。",
    ],
    pitfall: "冲突率高还坚持乐观锁，重试风暴比锁等待更伤。",
    related: ["竞态条件", "事务与隔离级别", "审计字段"],
  },
  "D2|唯一约束": {
    def: "用数据库唯一索引兜底业务唯一性（一手机号一账号、一键一订单）。",
    why: "应用层校验挡不住并发窗口；数据库约束是不受部署时机影响的最后防线。",
    points: [
      "唯一索引是幂等写入的地基：冲突即重复。",
      "捕获约束冲突要翻译成业务错误码，而不是 500。",
      "复合唯一约束用来建模业务键（user_id + sku_id）。",
    ],
    pitfall: "只在应用层查重——两个请求同时通过检查，双双插入成功。",
    related: ["幂等 token", "竞态条件"],
  },
  "D2|幂等 token": {
    def: "服务端识别「同一逻辑操作」的凭证；重复提交返回首次结果，而不是再执行一遍。",
    why: "网络会重试，每个写操作都可能执行两次（D2 不变量）——幂等是写接口的默认要求。",
    points: [
      "token 在第一个写事务里落库，天然防并发。",
      "处理中的 token：挂起后续请求或返回「进行中」，别并发执行。",
      "token 要有 TTL 和作用域（按操作类型隔离）。",
    ],
    pitfall: "把幂等实现成「重复请求也返回成功」，实际执行了两次。",
    related: ["唯一约束", "竞态条件"],
    materials: [{ title: "Stripe Idempotency Keys 设计", url: "https://docs.stripe.com/api/idempotent_requests" }],
  },
  "D2|状态机": {
    def: "把实体的状态和合法迁移显式建模；非法迁移直接拒绝，而不是靠散落的 if。",
    why: "并发交错常表现为非法状态跳变（已支付又被取消）；状态机把这类 bug 变成显式检查。",
    points: [
      "迁移规则集中定义，代码里只允许调 transition(from, event)。",
      "持久化状态 + 版本号 = 天然乐观锁。",
      "非法迁移返回明确错误码，便于排查时序问题。",
    ],
    pitfall: "用布尔标志组合表达状态（isActive + isDeleted + isFrozen），组合爆炸且无法校验。",
    related: ["竞态条件", "乐观锁 · 悲观锁"],
  },
  "D2|定时任务与调度": {
    def: "周期性后台作业的治理：幂等执行、多实例互斥、错过与错峰策略。",
    why: "定时任务是生产里最沉默的雷（D2 不变量）：实例扩到两台任务就跑两次；发布窗口错过一次结算就是事故。",
    points: [
      "任务必须幂等、可重跑：失败重试不能产生双份效果。",
      "多实例用分布式锁或调度中心保证同一时刻单实例执行。",
      "错峰（避开整点）与补偿（错过补跑）策略显式定义，写进任务配置。",
      "执行留痕（开始/结束/耗时）并纳入监控——静默失败的任务最危险。",
    ],
    pitfall: "裸 cron + 应用双副本，每次调度双倍发券。",
    related: ["分布式锁", "幂等 token", "消息投递语义", "时间与时区"],
    materials: [
      { title: "xxl-job 官方文档", url: "https://www.xuxueli.com/xxl-job/" },
      { title: "Quartz 调度器官网", url: "https://www.quartz-scheduler.org/" },
      { title: "Airflow 工作流官网", url: "https://airflow.apache.org/" },
    ],
  },
  "D2|分布式锁": {
    def: "跨进程互斥：用 Redis / etcd / 数据库实现「同一时刻只有一个实例执行这段逻辑」。",
    why: "多实例部署后进程内锁全部失效（N2 的集群版）；跨进程的临界区需要外部仲裁。",
    points: [
      "锁必须带 TTL 和持有者标识：TTL 防死锁，标识防误删别人的锁。",
      "Redis 锁在主从切换时可能丢——关键路径用 fencing token 或 etcd/Consul。",
      "先问能不能不用：唯一约束、幂等、队列串行化常是更稳的替代。",
    ],
    pitfall: "SETNX 不设过期时间，持有者一崩溃，全系统永久死锁。",
    related: ["唯一约束", "幂等 token", "乐观锁 · 悲观锁"],
    materials: [{ title: "Martin Kleppmann · How to do distributed locking", url: "https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html" }],
  },
  "D2|分布式事务与 Saga": {
    def: "跨服务没有原子提交：2PC 锁资源牺牲可用，Saga 把长事务拆成本地事务 + 补偿动作。",
    why: "单库事务的原子性出不了进程边界（N2 的分布式版）；跨服务一致性只能用业务语义换。",
    points: [
      "Saga 两种形态：编排（中心协调器）vs 协同（事件驱动），团队规模决定选择。",
      "每个参与方都要写得出「撤销」动作——补偿不是可选件（D2 不变量）。",
      "隔离性破口：中间态对外可见，必要时加语义锁防脏读。",
    ],
    pitfall: "只设计 happy path 的补偿链，失败路径一触发，补偿自己先崩。",
    related: ["事务与隔离级别", "事件发件箱（outbox）", "最终一致性"],
    materials: [
      { title: "microservices.io · Saga", url: "https://microservices.io/patterns/data/saga.html" },
      { title: "《DDIA》第 7、9 章", url: "https://dataintensive.net/" },
    ],
  },

  /* ---------- D3 数据与状态 ---------- */
  "D3|数据建模": {
    def: "先定实体、关系、约束，再谈性能——模型是给业务和技术双方看的共同语言。",
    why: "数据活得比进程久（源 N3）：模型错误的修复成本是所有 bug 里最高的。",
    points: [
      "从范式起步，反范式要有测量依据（不是拍脑袋）。",
      "外键与约束既是文档也是防线，别只留在 ER 图里。",
      "命名即文档：表名、字段名能读出业务含义。",
      "主键选型是权衡：自增顺序写快但暴露业务量，UUID 无规律但索引写放大——按场景选，全库统一。",
    ],
    pitfall: "照着页面字段建表，需求一改全表重构。",
    related: ["金额与精度", "时间与时区", "迁移版本化"],
    materials: [{ title: "《DDIA》第 2 章 · 数据模型", url: "https://dataintensive.net/" }],
  },
  "D3|金额与精度": {
    def: "金额用最小单位的整数（分）或定点类型存储，运算与舍入规则显式定义。",
    why: "浮点算钱必出错（D3 不变量）：0.1 + 0.2 ≠ 0.3 的误差在报表与对账里放大成真金白银的差错。",
    points: [
      "存整数分或 DECIMAL，float/double 禁止出现在金额字段。",
      "舍入规则写进契约：四舍五入还是银行家舍入、分币差谁承担。",
      "跨币种先定记账币种与汇率快照——成交时的汇率要跟着订单落库。",
    ],
    pitfall: "用 float 存价格，促销规则一叠加，对账天天差一分，查到最后是精度问题。",
    related: ["数据建模", "流处理与批处理"],
    materials: [{ title: "《企业应用架构模式》· Money 模式", url: "https://martinfowler.com/eaaCatalog/money.html" }],
  },
  "D3|时间与时区": {
    def: "时间统一 UTC 存储、ISO 8601 带时区传输，本地化只发生在展示层。",
    why: "服务器、数据库、浏览器是三套各带时区的系统（N3 的跨系统版）；时区 bug 只在跨地域用户和夏令时切换时爆发。",
    points: [
      "数据库存 UTC（或带时区的 timestamptz），应用层全 UTC 运算。",
      "API 传输 ISO 8601 含偏移量；「业务日期」与「物理时刻」分开建模（账期 vs 时间戳）。",
      "生日、账期这类「无时刻日期」用 DATE，不参与时区换算。",
    ],
    pitfall: "全链路本地时间，夏令时切换那天只有 23 小时——所有按天结算的任务全错。",
    related: ["审计字段", "定时任务与调度", "数据建模"],
  },
  "D3|迁移版本化": {
    def: "schema 变更走版本化脚本，进代码库、可评审、可回滚、可重放。",
    why: "schema 是生产资产；手工 DDL 等于一次没有版本的发布。",
    points: [
      "迁移脚本与代码同库同评审流程。",
      "破坏性变更必须拆成多步（见 expand-contract）。",
      "每次迁移在所有环境按同样顺序重放。",
    ],
    pitfall: "上线前手改表结构，环境之间 schema 漂移，问题只在生产出现。",
    related: ["expand-contract"],
    materials: [
      { title: "Flyway", url: "https://flywaydb.org/" },
      { title: "Liquibase", url: "https://www.liquibase.org/" },
    ],
  },
  "D3|expand-contract": {
    def: "零停机变更三步走：扩（加新结构）→ 迁（双写回填）→ 缩（删旧结构），每步独立发布。",
    why: "新旧版本代码必须能跑在同一个 schema 上（D3 不变量）。",
    points: [
      "「扩」与「缩」是两次独立发布，中间隔着完整的迁移窗口。",
      "回填数据分批跑，避免长事务锁表。",
      "「缩」的前提：所有读者都已升级到新结构。",
    ],
    pitfall: "一条 ALTER 同时加列删列，旧版本代码当场崩溃。",
    related: ["迁移版本化", "Schema 前向 / 后向兼容"],
    materials: [{ title: "martinfowler.com · Parallel Change（expand/contract）", url: "https://martinfowler.com/bliki/ParallelChange.html" }],
  },
  "D3|缓存一致性": {
    def: "缓存与数据库是两个系统：不一致窗口只能缩短或容忍，不能消灭。",
    why: "双写没有原子性——先更库还是先更缓存，都存在中间态（D3 不变量）。",
    points: [
      "默认顺序：先写库，再删缓存（Cache-Aside）。",
      "TTL 是不一致窗口的硬上限，必须设。",
      "要求「读己之写」的场景，写后短窗口内直读库。",
      "三大经典故障要对答如流：穿透（查不存在的键→空值缓存/布隆过滤器）、击穿（热键过期→互斥单飞/逻辑过期）、雪崩（集体过期→TTL 打散/高可用集群）。",
    ],
    pitfall: "追求强一致缓存，最后做成了分布式事务——成本远超收益。",
    related: ["最终一致性"],
    materials: [
      { title: "Cache-Aside Pattern", url: "https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside" },
      { title: "小林coding · 缓存雪崩/击穿/穿透", url: "https://www.xiaolincoding.com/redis/base/redis_interview.html" },
    ],
  },
  "D3|软删除": {
    def: "用 deleted_at 标记代替物理删除，数据可恢复、可审计。",
    why: "数据是资产也是审计依据（源 N3）；「删除」常常只是「对用户不可见」。",
    points: [
      "查询层统一过滤已删数据，别让每个查询都记得加条件。",
      "唯一约束与软删除冲突：用部分索引（WHERE deleted_at IS NULL）。",
      "合规要求物理删除时，走匿名化替代。",
    ],
    pitfall: "唯一索引没处理软删——同名记录删除后，第二次创建失败。",
    related: ["审计字段"],
  },
  "D3|审计字段": {
    def: "created_at / updated_at / created_by / version 等元数据字段，全表标准化。",
    why: "排障、审计、乐观锁全都依赖它们；这是数据的「出厂信息」。",
    points: [
      "由框架统一注入，禁止手写赋值。",
      "时间戳用数据库时钟，不用应用服务器时钟。",
      "version 字段直接服务乐观锁。",
    ],
    pitfall: "依赖应用服务器时钟填时间戳，机器之间漂移几秒，时序全乱。",
    related: ["乐观锁 · 悲观锁", "软删除", "审计日志"],
  },
  "D3|索引与查询计划": {
    def: "用 B+ 树等结构让查询走对路径：索引设计 + EXPLAIN 读执行计划。",
    why: "数据量上来后，性能问题八成落在「查询没走索引 / 索引失效」——这是数据库的第一性能杠杆。",
    points: [
      "联合索引按查询模式设计，遵守最左前缀规则。",
      "索引有写放大代价：不是越多越好，冗余索引要清理。",
      "慢查询日志 + EXPLAIN 是日常动作：先看计划，再谈优化。",
      "警惕 N+1：ORM 懒加载在循环里逐条查询——打开 SQL 日志，重复语句一眼可见。",
    ],
    pitfall: "对索引列用函数或隐式类型转换，索引当场失效，全表扫描。",
    related: ["数据建模", "复制与分片"],
    materials: [
      { title: "PostgreSQL · EXPLAIN", url: "https://www.postgresql.org/docs/current/sql-explain.html" },
      { title: "MySQL · EXPLAIN 输出", url: "https://dev.mysql.com/doc/refman/8.0/en/explain.html" },
      { title: "《高性能 MySQL》索引章节" },
    ],
  },
  "D3|复制与分片": {
    def: "复制 = 多副本（主从、读写分离）提可用性；分片 = 按键拆数据（分库分表）提容量。",
    why: "单机的容量与吞吐都有上限（N3 的规模维度）；先复制后分片，顺序别反。",
    points: [
      "读写分离先想清楚「读己之写」落在哪里。",
      "分片键按查询模式选：选错就无法重新均衡。",
      "一致性哈希减少扩容时的数据搬迁量。",
    ],
    pitfall: "数据一大就想着分库分表——多数问题先用索引和归档就能解决，分片是最后手段。",
    related: ["索引与查询计划", "最终一致性"],
    materials: [{ title: "《DDIA》第 5、6 章", url: "https://dataintensive.net/" }],
  },
  "D3|事件发件箱（outbox）": {
    def: "业务写库时把「待发事件」写进同一个库的 outbox 表，由独立进程投递——把双写变成单事务。",
    why: "「提交 DB + 发消息」两步没有原子性：消息丢了或发了没提交，状态与事件就不一致。",
    points: [
      "outbox 记录与业务变更写在同一个本地事务里。",
      "投递器轮询或订阅 binlog（CDC）读出并发布。",
      "消费端仍要幂等——投递是 at-least-once 的。",
    ],
    pitfall: "先发消息再写库、失败走「补偿」——补偿分支越写越乱，不如一开始就单事务。",
    related: ["消息投递语义", "缓存一致性"],
    materials: [
      { title: "microservices.io · Transactional Outbox", url: "https://microservices.io/patterns/data/transactional-outbox.html" },
      { title: "Debezium CDC", url: "https://debezium.io/" },
    ],
  },
  "D3|备份与恢复": {
    def: "定期备份 + 可演练的恢复流程，用 RPO / RTO 量化：最多丢多少数据、多快能恢复。",
    why: "所有一致性设计都防不住「机房没了」；备份是数据域的最后兜底（N3 的极端情形）。",
    points: [
      "明确 RPO（备份频率决定）与 RTO（恢复流程决定）的业务目标。",
      "恢复必须定期真演练——没恢复过的备份不算备份（D3 不变量）。",
      "备份本身也要加密和访问控制。",
    ],
    pitfall: "备份一直在跑，恢复从来没试过；出事才发现备份早就损坏了。",
    related: ["密钥管理", "复制与分片"],
    materials: [
      { title: "3-2-1 备份原则", url: "https://www.backblaze.com/blog/the-3-2-1-backup-strategy/" },
      { title: "《Google SRE》· 数据完整性", url: "https://sre.google/sre-book/data-integrity/" },
    ],
  },
  "D3|无状态与状态外置": {
    def: "进程不保存会话、文件等业务状态——状态放 DB、缓存、对象存储，进程随时可杀可换。",
    why: "水平扩展与滚动发布的共同前提：实例无差别，流量才能任意调度（N2/N5 的集群形态）。",
    points: [
      "会话外置（Redis / 自包含令牌），本地内存里不放任何跨请求状态。",
      "文件走对象存储 + 预签名直传，不落本地盘。",
      "优雅停机之所以能「排空」，正是因为状态在进程外。",
    ],
    pitfall: "「临时把会话放内存」——第二台实例一上线，用户登录态随机丢失。",
    related: ["会话与令牌管理", "优雅停机与健康检查", "复制与分片"],
    materials: [{ title: "12-Factor · Processes（中文）", url: "https://12factor.net/zh_cn/processes" }],
  },
  "D3|数据生命周期": {
    def: "数据的保留、归档、清理与合规删除：每类数据留多久、冷了去哪、被要求删时怎么删。",
    why: "数据只进不出，成本与风险都单调增长（D3 不变量）；合规（个保法 / GDPR）把「删得掉」变成法律义务。",
    points: [
      "每类数据定保留策略：热 → 冷归档 → 删除，写进 schema 设计而非口头约定。",
      "清理做成自动化任务（Steady State），不是攒到出事的人肉脚本。",
      "删除权要覆盖副本：日志、缓存、备份里的个人信息都在范围内。",
    ],
    pitfall: "只在主库执行了删除，日志和备份里的数据原样躺着——合规审查时全部算数。",
    related: ["备份与恢复", "软删除", "审计日志"],
    materials: [
      { title: "《Release It!》第二版（Pragmatic Bookshelf）", url: "https://pragprog.com/titles/mnee2/release-it-second-edition/" },
      { title: "GDPR 全文检索（gdpr-info.eu）", url: "https://gdpr-info.eu/" },
      { title: "《个人信息保护法》全文 · 网信办", url: "https://www.cac.gov.cn/2021-08/20/c_1631050028355286.htm" },
    ],
  },
  "D3|流处理与批处理": {
    def: "批处理按周期成批处理（ETL、对账）；流处理在事件到达时处理（CDC、实时特征）。",
    why: "数据不只服务在线请求（N3 的另一面）：报表、对账、搜索索引、风控特征全靠管道供给。",
    points: [
      "管道要幂等、可重放：同一批事件重跑不坏数。",
      "批与流的边界是延迟预算，不是技术时尚。",
      "对账任务是数据一致性的最后兜底——发现并修复所有上游漏网的不一致。",
    ],
    pitfall: "管道不可重放，一次消费故障就要全量回补，回补本身又是一轮事故。",
    related: ["消息投递语义", "事件发件箱（outbox）", "备份与恢复"],
    materials: [{ title: "《DDIA》第 10、11 章", url: "https://dataintensive.net/" }],
  },

  /* ---------- D4 分布式弹性 ---------- */
  "D4|超时预算": {
    def: "给整条调用链定一个端到端总时限，再倒推分配到每一跳。",
    why: "没有超时的调用等于随机挂死（D4 不变量）；超时不是拍脑袋，是预算分配。",
    points: [
      "预算从「用户可容忍延迟」倒推：总预算 3s，网关 0.5s、服务 1.5s、DB 1s。",
      "上游超时 ≥ 下游各跳之和，否则上游先放弃、下游还在空转。",
      "连接超时、读超时、写超时分开设置。",
    ],
    pitfall: "每层都设 30s，端到端一个请求能挂 90 秒。",
    related: ["重试 · 退避 · 抖动"],
    materials: [{ title: "《Google SRE》· 处理过载", url: "https://sre.google/sre-book/handling-overload/" }],
  },
  "D4|重试 · 退避 · 抖动": {
    def: "重试间隔指数退避 + 随机抖动；只重试可重试的错误。",
    why: "每层各自重试会指数放大下游流量（重试风暴，D4 不变量）。",
    points: [
      "只对幂等操作重试；非幂等先有幂等 token 再谈重试。",
      "重试消耗超时预算：总时长封顶。",
      "重试与熔断联动：熔断打开时停止重试。",
    ],
    pitfall: "对下单接口无脑重试，一次超时变成两笔订单。",
    related: ["熔断", "超时预算", "幂等 token"],
    materials: [{ title: "AWS · Exponential Backoff and Jitter", url: "https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/" }],
  },
  "D4|熔断": {
    def: "连续失败到阈值就「跳闸」：一段时间内快速失败，不再打下游。",
    why: "下游已经病了，重试等于补刀；熔断给下游恢复时间，也给上游快速失败。",
    points: [
      "三状态循环：闭合（正常）→ 打开（快速失败）→ 半开（探测恢复）。",
      "按依赖分别熔断，不要全局一个断路器。",
      "熔断期间的错误要区别于普通错误，监控单独可见。",
    ],
    pitfall: "全局一个断路器，一个慢依赖让所有路由一起快速失败。",
    related: ["舱壁隔离", "重试 · 退避 · 抖动", "降级"],
    materials: [
      { title: "martinfowler.com · CircuitBreaker", url: "https://martinfowler.com/bliki/CircuitBreaker.html" },
      { title: "《Release It!》第二版（Pragmatic Bookshelf）", url: "https://pragprog.com/titles/mnee2/release-it-second-edition/" },
    ],
  },
  "D4|舱壁隔离": {
    def: "给每类依赖分配独立的资源池（连接池/线程池/信号量），故障被隔离在舱段内。",
    why: "船的一舱进水不该沉整条船——资源隔离决定故障半径。",
    points: [
      "池子大小 = 该依赖能承受的并发，不是越大越好。",
      "同步、异步路径都要覆盖隔离。",
      "与降级联动：某舱段满时触发该依赖的降级。",
    ],
    pitfall: "所有下游共用一个连接池，最慢的那个占满池子，其他全部排队。",
    related: ["熔断", "背压"],
    materials: [{ title: "《Release It!》· Bulkhead（Pragmatic Bookshelf）", url: "https://pragprog.com/titles/mnee2/release-it-second-edition/" }],
  },
  "D4|降级": {
    def: "依赖不可用时返回有损但可用的结果：兜底值、旧缓存、精简视图。",
    why: "可用性可以按业务分级——推荐栏挂了不能拖垮下单。",
    points: [
      "降级路径平时必须演练，没跑过的兜底逻辑不可信。",
      "降级数据要标注新鲜度，别假装是实时的。",
      "写操作的降级走队列补偿，不是丢弃。",
    ],
    pitfall: "第一次真降级时，兜底逻辑自己抛 NPE。",
    related: ["熔断", "最终一致性"],
  },
  "D4|背压": {
    def: "下游过载时上游能感知并主动减速：有界队列 + 显式拒绝策略。",
    why: "无界队列只是把故障推迟到内存耗尽的那一刻，而且丢得更惨。",
    points: [
      "队列必须有界，界就是背压的触发点。",
      "拒绝策略要有业务语义：快速失败、丢弃最旧、还是降级。",
      "消费速率反压生产速率，而不是硬扛。",
    ],
    pitfall: "用无界线程池「吸收」洪峰，最后 OOM 全量失败。",
    related: ["舱壁隔离", "重试 · 退避 · 抖动"],
  },
  "D4|最终一致性": {
    def: "接受副本短暂不一致，换取分区下的可用性；前提是收敛可定义、可测量。",
    why: "强一致跨网络太贵（CAP 取舍）——多数业务要的是「会在 N 秒内一致」。",
    points: [
      "给每个不一致场景定收敛时间目标（如 5s）。",
      "冲突解决策略显式化：LWW、版本向量或业务合并。",
      "「读己之写」需要会话粘性或读主库。",
    ],
    pitfall: "把「最终一致」当「不管一致」——从不测量收敛延迟，也不知道坏了多久。",
    related: ["缓存一致性"],
    materials: [{ title: "《DDIA》第 5、9 章", url: "https://dataintensive.net/" }],
  },
  "D4|限流与配额": {
    def: "用令牌桶 / 漏桶等算法限制单位时间请求量，按 IP / 用户 / 接口分层设额度。",
    why: "源 N1 的流量不可信也无上限——不主动管理流量，就会被流量管理（OWASP API4 无限制资源消耗）。",
    points: [
      "分层限流：网关粗粒度兜底，业务按用户/接口细粒度。",
      "分布式限流用集中计数（如 Redis），想清楚时钟与精度的取舍。",
      "触发限流返回明确错误码（429）+ Retry-After，让调用方能退避。",
    ],
    pitfall: "只在网关限流，内部互调没有防护——一个失控的定时任务照样打穿全链路。",
    related: ["背压", "熔断", "负载均衡与网关"],
    materials: [
      { title: "令牌桶算法（Wikipedia）", url: "https://en.wikipedia.org/wiki/Token_bucket" },
      { title: "OWASP API4:2023 · Unrestricted Resource Consumption", url: "https://owasp.org/API-Security/editions/2023/en/0xa4-unrestricted-resource-consumption/" },
    ],
  },
  "D4|负载均衡与网关": {
    def: "反向代理 / 负载均衡把流量分发到多实例；网关统一做认证、限流、路由。",
    why: "多实例是可用性的前提；入口层决定流量怎么进来、坏实例怎么摘出去。",
    points: [
      "健康检查失败自动摘除、恢复自动加回。",
      "会话粘性与重试语义互相影响：重试可能落到另一实例，写操作必须幂等。",
      "LB 层的重试要克制——它会和上游重试叠乘成重试风暴。",
    ],
    pitfall: "网关默认对 POST 也重试，把非幂等请求原样打出两份。",
    related: ["优雅停机与健康检查", "限流与配额", "重试 · 退避 · 抖动"],
    materials: [
      { title: "Nginx 官方文档", url: "https://nginx.org/en/docs/" },
      { title: "Envoy 官方文档", url: "https://www.envoyproxy.io/docs" },
    ],
  },
  "D4|优雅停机与健康检查": {
    def: "收到退出信号先摘流量、排空在途请求再退出；用 readiness / liveness 暴露存活与就绪。",
    why: "发布是高频动作（N5）；不做排空，每次发布都是一次小型事故。",
    points: [
      "读流量靠 readiness 摘除；写流量等队列排空或交接。",
      "停机设最长等待时限，超时强退并告警——别无限等。",
      "健康检查要探测真实依赖（DB 连通），不是只回 200。",
    ],
    pitfall: "kill 直接杀进程，在途请求全部 502，每次发布都有分钟级报错尖刺。",
    related: ["负载均衡与网关", "CI/CD"],
  },
  "D4|容量规划与压测": {
    def: "用压测找到系统的真实极限，按增长预期规划资源——限流阈值和 SLO 承诺的依据都来自这里。",
    why: "不知道极限在哪，超时预算、限流配额全是拍脑袋；资源到位需要时间，容量要有提前量。",
    points: [
      "压测打真实链路 + 真实数据量（影子流量 / 流量回放），裸接口压测不算数。",
      "极限用「入参容量」表达：QPS × 数据规模 × 并发，不是单指标。",
      "容量计划跟增长预期挂钩，复核周期写进日历。",
    ],
    pitfall: "压测时库里一万行，上线一亿行——延迟曲线完全是另一条。",
    related: ["限流与配额", "SLO 与错误预算", "索引与查询计划"],
    materials: [{ title: "《Google SRE Workbook》· NALSD 系统容量设计", url: "https://sre.google/workbook/non-abstract-design/" }],
  },
  "D4|故障演练（混沌工程）": {
    def: "主动、受控地注入故障（杀实例 / 加延迟 / 断依赖），验证熔断、降级、排空真的会生效。",
    why: "没被触发过的弹性设计只是「配置里存在」（D4 不变量）——演练把纸面弹性变成被验证过的事实。",
    points: [
      "从小爆炸半径开始：单实例 → 单可用区 → 依赖级联。",
      "演练前定好观测指标与中止条件，演练中全程盯盘。",
      "发现的问题走复盘闭环，否则演练只是仪式。",
    ],
    pitfall: "只在业务低峰做「表演性演练」，从不演练真正的级联故障场景。",
    related: ["熔断", "降级", "容量规划与压测", "故障复盘"],
    materials: [{ title: "Principles of Chaos Engineering", url: "https://principlesofchaos.org/" }],
  },

  /* ---------- D5 可观测性 ---------- */
  "D5|结构化日志": {
    def: "日志是带字段的数据（JSON），不是给人读的拼接字符串。",
    why: "排障要按字段过滤、聚合、统计；正则解析字符串日志不可维护。",
    points: [
      "级别语义严格：ERROR = 需要人看，WARN = 自动恢复但值得追踪。",
      "一条日志一个事件；异常堆栈放独立字段。",
      "敏感字段（手机号/token）在序列化边界统一脱敏。",
    ],
    pitfall: "把异常堆栈拼进 message，无法聚合去重，告警噪音爆炸。",
    related: ["traceId · spanId（OpenTelemetry）", "脱敏"],
    materials: [
      { title: "12-Factor · Logs（中文）", url: "https://12factor.net/zh_cn/logs" },
      { title: "OpenTelemetry · Logs 信号", url: "https://opentelemetry.io/docs/concepts/signals/logs/" },
    ],
  },
  "D5|traceId · spanId（OpenTelemetry）": {
    def: "每个请求一个 traceId，每一跳一个 spanId，按标准（W3C Trace Context）跨服务传播。",
    why: "日志没有 traceId 贯穿，排障就靠运气（D5 不变量）。",
    points: [
      "trace 从前端/网关发起，一路贯穿到数据库（D5 不变量）。",
      "线程池、异步任务里上下文要显式传播，否则断链。",
      "用 OpenTelemetry 的语义约定，别自造字段名。",
    ],
    pitfall: "异步线程池丢上下文，链路断在消息消费那一跳。",
    related: ["结构化日志", "采样", "前端异常上报"],
    materials: [
      { title: "OpenTelemetry 官方文档", url: "https://opentelemetry.io/docs/" },
      { title: "W3C Trace Context 规范", url: "https://www.w3.org/TR/trace-context/" },
    ],
  },
  "D5|RED 指标": {
    def: "每个端点三件套：请求速率（Rate）、错误率（Errors）、耗时分布（Duration）。",
    why: "指标回答「哪里坏」；没有按端点的 RED，故障定位从瞎猜开始。",
    points: [
      "按端点/路由打标签，标签基数受控。",
      "耗时用直方图（p50/p95/p99），不要平均值。",
      "SLO 基于 RED 定义，而不是基于资源利用率。",
    ],
    pitfall: "只看全局平均延迟，长尾用户的存在被平均数抹掉。",
    related: ["告警分级"],
    materials: [
      { title: "《Google SRE》· 监控分布式系统", url: "https://sre.google/sre-book/monitoring-distributed-systems/" },
      { title: "Grafana · The RED Method", url: "https://grafana.com/blog/2018/08/02/the-red-method-how-to-instrument-your-services/" },
    ],
  },
  "D5|采样": {
    def: "只保留一部分 trace/日志，把采集预算花在高价值信号上。",
    why: "全量采集存不起也没必要；采样策略决定你「看得见什么」。",
    points: [
      "错误和慢请求 100% 采样，正常流量尾部采样。",
      "头采样（入口决定）vs 尾采样（看完整轨迹再决定）各有取舍。",
      "采样决策要全链路一致，否则链路拼不起来。",
    ],
    pitfall: "各服务各自随机采样，到了聚合端一条完整链路都拼不出。",
    related: ["traceId · spanId（OpenTelemetry）"],
    materials: [{ title: "OpenTelemetry · Sampling", url: "https://opentelemetry.io/docs/concepts/sampling/" }],
  },
  "D5|告警分级": {
    def: "按「可行动性」分级：需要立即处理的 page、白天处理的工单、只是看看的仪表盘。",
    why: "告警疲劳会让真警报被忽略——分级的本质是保护值班人的注意力。",
    points: [
      "每条告警必须写「收到之后做什么」，写不出来就删掉它。",
      "基于症状（SLO 燃烧率）告警，而不是基于原因（CPU 高）。",
      "告警附带 runbook 链接。",
    ],
    pitfall: "CPU > 80% 就告警，两周后值班的同学对所有告警免疫。",
    related: ["RED 指标"],
    materials: [{ title: "《Google SRE Workbook》· Alerting on SLOs", url: "https://sre.google/workbook/alerting-on-slos/" }],
  },
  "D5|前端异常上报": {
    def: "前端错误、接口失败、性能指标回传后端，带 traceId 关联。",
    why: "用户看到的故障比你以为的多；系统边界要从最外层开始观测。",
    points: [
      "上报走独立通道，别因为主接口挂了连错误都报不上来。",
      "采样 + 去重 + 聚合，防上报洪峰。",
      "带上 traceId 才能和后端链路对上。",
    ],
    pitfall: "前端报错没有 traceId，永远只知道「有错」，不知道「哪一跳错」。",
    related: ["traceId · spanId（OpenTelemetry）"],
    materials: [
      { title: "OpenTelemetry · Browser（JS）", url: "https://opentelemetry.io/docs/languages/js/getting-started/browser/" },
      { title: "Sentry", url: "https://sentry.io/" },
    ],
  },
  "D5|SLO 与错误预算": {
    def: "用 SLI（成功率、延迟分位）定义服务质量目标；目标之外允许出错的额度就是错误预算。",
    why: "指标只回答「是多少」，SLO 回答「够不够」——没有目标，就分不清噪音和事故（D5 的决策层）。",
    points: [
      "SLI 选用户视角的指标（成功率、p95 延迟），不是资源利用率。",
      "预算烧完 → 停止发布、专注可靠性，直到预算恢复。",
      "目标别定 100%：预算为零意味着任何发布都是违规。",
    ],
    pitfall: "SLO 定了没人看——它要挂进发布流程和告警，否则只是墙上的数字。",
    related: ["RED 指标", "告警分级"],
    materials: [{ title: "《Google SRE》· Service Level Objectives", url: "https://sre.google/sre-book/service-level-objectives/" }],
  },
  "D5|故障复盘": {
    def: "事故后的结构化复盘：时间线、根因、行动项——追系统不追人（blameless postmortem）。",
    why: "没有复盘的事故会重演（D5 不变量）；可观测性收集的素材，只有经过复盘才变成组织记忆。",
    points: [
      "Blameless：分析为什么会允许这事故发生，而不是谁改错了。",
      "行动项要有 owner 与期限，并跟踪到关闭——否则下次复盘议题相同。",
      "根因归到「哪条不变量被违反」，比归到「谁的锅」更能防重演。",
    ],
    pitfall: "复盘开成追责会，从此没人敢早报事故，大家学会了先捂住再说。",
    related: ["告警分级", "traceId · spanId（OpenTelemetry）", "故障演练（混沌工程）"],
    materials: [{ title: "《Google SRE》· Postmortem Culture", url: "https://sre.google/sre-book/postmortem-culture/" }],
  },

  /* ---------- D6 安全 ---------- */
  "D6|认证 vs 授权": {
    def: "认证回答「你是谁」（Authentication）；授权回答「你能对什么做什么」（Authorization）。",
    why: "两件事混在一起，「登录了就能改别人数据」这类漏洞会被当成功能。",
    points: [
      "认证输出主体身份（principal），授权以「主体 + 资源 + 动作」为输入。",
      "授权检查落在每一次对象访问上，不是只落在接口上。",
      "两层分开实现、分开测试。",
    ],
    pitfall: "只在网关做认证，业务层默认「进来的请求都有权改」。",
    related: ["RBAC · ABAC", "对象级越权（IDOR）"],
    materials: [{ title: "OWASP A01:2021 · Broken Access Control", url: "https://owasp.org/Top10/A01_2021-Broken_Access_Control/" }],
  },
  "D6|RBAC · ABAC": {
    def: "RBAC 按角色授予权限；ABAC 按属性规则（用户/资源/环境）动态判定。",
    why: "权限模型决定授权的粒度与长期可维护性——模型错了，后面全是补丁。",
    points: [
      "RBAC 起步，规则爆炸时再引入 ABAC 混合。",
      "角色按职责划分，不照抄组织架构图。",
      "功能权限（能干什么）与数据范围权限（能看哪些行：本人 / 本部门）是两个维度，别硬塞进一个角色模型。",
      "权限变更本身要审计。",
    ],
    pitfall: "一个「超级管理员」角色消化所有特权，最小权限形同虚设。",
    related: ["认证 vs 授权", "最小权限"],
    materials: [{ title: "OWASP Authorization Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html" }],
  },
  "D6|注入类漏洞族": {
    def: "用户输入被当作代码或查询的一部分解释：SQL 注入、命令注入、模板注入、LDAP 注入。",
    why: "「所有输入不可信」（源 N1）的最极端后果——输入直接变成了执行逻辑。",
    points: [
      "参数化查询/预编译是一揽子解，不是逐个过滤。",
      "任何字符串拼接进入解释器的地方，都是注入点。",
      "Code review 专门盯原生拼接查询。",
    ],
    pitfall: "以为用了 ORM 就免疫——字符串拼接的原生查询照样注入。",
    related: ["入参声明式校验"],
    materials: [{ title: "OWASP A03:2021 · Injection", url: "https://owasp.org/Top10/A03_2021-Injection/" }],
  },
  "D6|对象级越权（IDOR）": {
    def: "用户通过改 id 访问不属于自己的对象：/orders/1042 里填别人的订单号。",
    why: "授权检查落在了接口上而不是对象上（D6 不变量）——接口鉴权 ≠ 数据归属校验。",
    points: [
      "每次对象访问都校验归属：WHERE id = ? AND user_id = ?。",
      "不可猜测的 ID（UUID）只是缓解手段，不能替代校验。",
      "越权路径要有自动化测试覆盖。",
    ],
    pitfall: "接口需要登录，但订单 id 遍历就能看遍全站数据。",
    related: ["认证 vs 授权", "最小权限"],
    materials: [{ title: "OWASP API1:2023 · BOLA", url: "https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/" }],
  },
  "D6|最小权限": {
    def: "默认拒绝，按需授予；权限宁可临时提升，不要长期沉淀。",
    why: "权限面越大，泄露和误操作的爆炸半径越大——它决定「坏的时候有多坏」。",
    points: [
      "服务账号也一样：应用连 DB 不该用管理员账号。",
      "数据库账号三分离：应用账号（DML）、迁移账号（DDL）、人工账号（按次审批）。",
      "权限有申请、有到期、有回收。",
      "定期审计特权账号的实际使用。",
    ],
    pitfall: "图省事给服务账号 DBA 权限，「反正内网」。",
    related: ["RBAC · ABAC", "密钥管理"],
  },
  "D6|密钥管理": {
    def: "密钥的生成、存储、轮换、审计的全生命周期管理。",
    why: "密钥进过一次 git 就应视为已泄露（D6 不变量）——泄露是不可逆事件。",
    points: [
      "密钥放 KMS/Secret 管理，运行时注入，不进代码和配置文件。",
      "轮换常态化：每次发布能换、季度必换。",
      "仓库装泄漏扫描，历史提交也扫。",
    ],
    pitfall: "密钥写在 config 里提交进库，用「仓库是私有的」当护身符。",
    related: ["审计日志", "最小权限"],
    materials: [
      { title: "OWASP Secrets Management Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html" },
      { title: "12-Factor · Config（中文）", url: "https://12factor.net/zh_cn/config" },
    ],
  },
  "D6|脱敏": {
    def: "日志、展示、导出时对敏感字段遮蔽或移除（手机号 138****5678）。",
    why: "数据最小暴露是安全与合规的双重底线——看得见的人越少越好。",
    points: [
      "在序列化边界统一脱敏，不散落在各处手写。",
      "保留可用性：尾四位、哈希对照表。",
      "先做数据分级分类，再定脱敏规则。",
    ],
    pitfall: "日志打了整包请求体，密码和 token 明文进了日志系统。",
    related: ["结构化日志", "审计日志"],
  },
  "D6|审计日志": {
    def: "「谁、何时、对什么、做了什么」的不可篡改记录，与业务日志分离。",
    why: "事后追责、合规检查、安全取证都依赖它（源 N5 的时间维度）。",
    points: [
      "审计日志独立存储、独立保留策略，不随应用日志轮转丢失。",
      "记录变更前后值，不只是「改了」。",
      "审计写失败的策略要显式：阻断业务还是告警放行，想清楚再选。",
    ],
    pitfall: "审计日志和普通日志混在一起，磁盘一清理，证据没了。",
    related: ["审计字段", "脱敏"],
    materials: [{ title: "OWASP Logging Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html" }],
  },
  "D6|密码与凭证存储": {
    def: "密码用加盐慢哈希（bcrypt / argon2）存储：不可逆、每用户独立盐。",
    why: "要假设数据库终有一天被拖走——那一刻慢哈希是用户密码的最后一道防线（D6 不变量）。",
    points: [
      "bcrypt / argon2 带代价因子：算力升级就调高，重哈希透明迁移。",
      "登录失败信息统一（不区分「用户不存在」和「密码错误」）。",
      "密码重置令牌一次性、短时效、走独立通道。",
    ],
    pitfall: "用 MD5/SHA 加盐存密码——快哈希为碰撞设计，GPU 每秒能试上亿次。",
    related: ["会话与令牌管理", "密钥管理"],
    materials: [{ title: "OWASP Password Storage Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html" }],
  },
  "D6|会话与令牌管理": {
    def: "会话（服务端状态）与令牌（自包含 JWT）的完整生命周期：签发、续期、注销、撤销。",
    why: "凭证的时效与撤销策略决定「泄露之后能干什么」——会话管理是认证的另一半。",
    points: [
      "JWT 无状态 = 不可撤销：敏感场景用短时效 access + refresh 轮换。",
      "注销/改密要能让旧令牌失效（黑名单或用户级版本号）。",
      "登录成功后重置会话标识，防会话固定攻击。",
    ],
    pitfall: "JWT 有效期七天且无法撤销——泄露即裸奔一周。",
    related: ["认证 vs 授权", "密码与凭证存储"],
    materials: [{ title: "OWASP Session Management Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html" }],
  },
  "D6|传输与静态加密": {
    def: "传输层全站 TLS（含内部服务间）；存储层对敏感字段/磁盘做静态加密。",
    why: "内网也不是可信网络（N1 的内网版）——按「流量必然被监听」来设计。",
    points: [
      "TLS 覆盖到服务间通信，不只是入口。",
      "证书自动轮换（ACME）：证书过期 = 全站不可用。",
      "静态加密防「硬盘被拔」，字段级加密/哈希防「库被拖走」。",
    ],
    pitfall: "「内网通信不用加密」——一台被攻破的实例就是整个内网的监听器。",
    related: ["密钥管理", "脱敏"],
    materials: [{ title: "OWASP Transport Layer Protection Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Protection_Cheat_Sheet.html" }],
  },
  "D6|业务逻辑与防滥用": {
    def: "攻击不总走技术漏洞：薅羊毛、刷券、恶意注册，走的是「合法接口的非法用法」。",
    why: "注入和越权有扫描器兜底，业务逻辑漏洞只有设计者能防（OWASP ASVS V11 业务逻辑验证）。",
    points: [
      "关键业务流（注册 / 领券 / 提现）设计防刷阈值与验证码梯度。",
      "内部接口也要鉴权与审计——被攻破的内网服务不该是跳板。",
      "风控动作要可解释、可申诉，误杀用户比漏杀更伤。",
    ],
    pitfall: "营销活动上线没配频控预算，一晚上被脚本薅穿。",
    related: ["限流与配额", "认证 vs 授权", "审计日志"],
    materials: [{ title: "OWASP ASVS（V11 · 业务逻辑）", url: "https://owasp.org/www-project-application-security-verification-standard/" }],
  },

  /* ---------- D7 工程治理 ---------- */
  "D7|模块边界": {
    def: "按业务能力（而非技术分层）划分模块；边界即契约，跨边界只走公开接口。",
    why: "团队并行开发（源 N5）的前提是边界稳定——边界就是分工线。",
    points: [
      "边界用显式 API/接口表达，不是「目录约定」。",
      "边界处定义数据所有权：一张表只有一个主人。",
      "技术分层（web/service/dao）在模块内部，不在模块之间。",
    ],
    pitfall: "按 controller/service/dao 分「模块」，所有业务横向散开，改一个需求跨五个目录。",
    related: ["依赖规则（单向 · 无环）"],
    materials: [{ title: "Kamil Grzybek · Modular Monolith 系列", url: "https://www.kamilgrzybek.com/blog/posts/modular-monolith-domain-centric-design" }],
  },
  "D7|依赖规则（单向 · 无环）": {
    def: "模块依赖只能指向一个方向；出现环，说明边界划错了。",
    why: "依赖图无环是可测试性的前提（D7 不变量）——有环就没办法独立测试任何一块。",
    points: [
      "用工具机器检查（ArchUnit/dependency-constraint），不靠人眼。",
      "公共代码向下沉淀，而不是横向互相拉。",
      "依赖要指向接口，不指向实现。",
    ],
    pitfall: "循环依赖靠「再抽一个 common」缓解，common 变成垃圾场。",
    related: ["模块边界", "规范自动化（lint · 门禁）"],
  },
  "D7|规范自动化（lint · 门禁）": {
    def: "把约定翻译成 CI 里机器可检查的规则，违规即失败。",
    why: "口头约定必然腐化，只有机器可检查的约定能存活（D7 不变量）。",
    points: [
      "规则进 CI，code review 不再人肉守规范。",
      "新规则先「警告模式」跑两周再转「阻断」。",
      "每条规则写清「为什么」，否则半年后被当垃圾清掉。",
    ],
    pitfall: "规则一次上太多，团队全关掉，lint 形同虚设。",
    related: ["CI/CD", "依赖规则（单向 · 无环）"],
  },
  "D7|测试金字塔": {
    def: "单元测试多、集成测试少、端到端更少——按反馈速度分层。",
    why: "层级越高，反馈越慢、越不稳定；金字塔形状是维护成本的自然结果。",
    points: [
      "单元测试测行为不测实现，实现变了测试不该红。",
      "集成测试集中在边界：DB、消息、外部服务。",
      "端到端只留关键路径冒烟，别拿它当功能回归。",
    ],
    pitfall: "全靠集成测试，一次 40 分钟还随机红，慢慢地没人再跑。",
    related: ["CI/CD"],
    materials: [{ title: "martinfowler.com · Test Pyramid", url: "https://martinfowler.com/bliki/TestPyramid.html" }],
  },
  "D7|CI/CD": {
    def: "提交即自动构建、测试、可部署；发布成为低风险的高频动作。",
    why: "发布越痛越不敢发，越不敢发批次越大越痛（源 N5 的恶性循环）。",
    points: [
      "流水线红 = 最高优先级修复，别绕过别重跑碰运气。",
      "部署与发布解耦：先部署，用功能开关放流。",
      "每次发布必须有回滚路径，且回滚演练过。",
    ],
    pitfall: "CD 管道全绿，但没人敢点发布按钮——说明缺的是信心不是工具。",
    related: ["测试金字塔", "规范自动化（lint · 门禁）"],
    materials: [{ title: "DORA · Four Keys 指标", url: "https://dora.dev/guides/dora-metrics-four-keys/" }],
  },
  "D7|ADR 架构决策记录": {
    def: "一页纸记录一个决策：背景、可选方案、决定、理由、后果。",
    why: "团队记忆会流失（源 N5）；没记录的决策，半年后会被重新争论一遍。",
    points: [
      "编号存 repo，随代码一起评审。",
      "被推翻的决策也保留，并记录推翻原因。",
      "新同学 onboarding 的第一份读物。",
    ],
    pitfall: "决策只活在会议纪要里，换个人就找不到了。",
    related: ["模块边界"],
    materials: [{ title: "adr.github.io · 架构决策记录", url: "https://adr.github.io/" }],
  },
  "D7|功能开关与灰度发布": {
    def: "用开关控制功能可见性，配合金丝雀 / 蓝绿，把发布变成可控的小流量实验。",
    why: "部署 ≠ 发布：代码先上去、流量再放进来，出错半径从「全量」缩到「1%」。",
    points: [
      "开关默认关闭，命名带过期时间——发布后要清理。",
      "灰度期间盯 SLO / 错误率，异常自动回滚比人工更快。",
      "开关是发布工具不是架构：留下的每个开关都是新的状态组合。",
    ],
    pitfall: "开关越积越多，组合状态爆炸，最后没人敢删任何一个——开关自己成了技术债。",
    related: ["CI/CD", "SLO 与错误预算"],
    materials: [
      { title: "martinfowler.com · Feature Toggles", url: "https://martinfowler.com/articles/feature-toggles.html" },
      { title: "Trunk Based Development", url: "https://trunkbaseddevelopment.com/" },
    ],
  },
  "D7|环境一致性": {
    def: "开发 / 测试 / 生产同构：同镜像、同配置方式、同依赖版本（dev/prod parity）。",
    why: "「我本地是好的」的根源是环境漂移（N5）：环境差异本身就是缺陷来源。",
    points: [
      "制品一次构建、多环境部署——build once, run anywhere。",
      "配置差异全部显式外置（环境变量 / 配置中心），不在代码里 if 环境。",
      "测试数据从生产脱敏而来，不是手造的玩具数据。",
    ],
    pitfall: "本地新装的依赖没进锁文件，生产构建出的东西和本地跑的不是同一个。",
    related: ["CI/CD", "密钥管理", "脱敏"],
    materials: [{ title: "12-Factor · Dev/Prod Parity（中文）", url: "https://12factor.net/zh_cn/dev-prod-parity" }],
  },
  "D7|代码评审（Code Review）": {
    def: "小批量、高频次的同行评审：让每行代码至少有第二双眼睛看过。",
    why: "评审是治理的执行现场——lint 管机器能查的，评审管机器查不了的：设计合理性、边界、知识流动（D7 不变量）。",
    points: [
      "PR 小到 30 分钟内能评完；评不完的大 PR 等于没评。",
      "评审标准写进贡献指南：什么是必须提的意见、什么只是个人偏好。",
      "首要产出是知识流动，不是把关——没有人独懂任何模块。",
    ],
    pitfall: "评审只纠缠格式和命名——这些已交给 lint，评审该看的是错误路径、边界和测试。",
    related: ["规范自动化（lint · 门禁）", "代码所有权（CODEOWNERS）", "测试金字塔"],
    materials: [{ title: "《Software Engineering at Google》· Ch.19 Code Review（免费全文）", url: "https://abseil.io/resources/swe-book/html/ch19.html" }],
  },
  "D7|代码所有权（CODEOWNERS）": {
    def: "每个模块有显式 owner，其改动的合入由 owner 把关（CODEOWNERS 机制）。",
    why: "模块边界没有责任人就会慢慢退化（N5）；所有权是模块边界的社会执行机制。",
    points: [
      "owner 是边界的守门人，不是唯一作者——别人照样可以贡献。",
      "owner 离职/转岗时所有权显式交接，写进流程而不是靠自觉。",
      "所有权文件由 CI 校验：新增目录必须声明 owner。",
    ],
    pitfall: "全员都是 owner = 没人是 owner；审批最终沦为「随手点同意」。",
    related: ["模块边界", "代码评审（Code Review）", "ADR 架构决策记录"],
  },
  "D7|第三方依赖管理": {
    def: "锁文件锁定版本、升级有节奏、漏洞有响应的依赖全生命周期管理。",
    why: "依赖是借来的复杂度（D7 不变量）：不主动升级，它就会在最坏的时机——安全事件——逼你升级。",
    points: [
      "锁文件进库，构建可复现；直接依赖与传递依赖都要可见。",
      "小版本升级常规化（每周），大版本升级单独排期并过评审。",
      "订阅漏洞通告（dependabot 类），按严重度分级响应。",
    ],
    pitfall: "五年没升级的依赖被安全事件逼着直升大版本——没人知道会炸哪里。",
    related: ["CI/CD", "代码评审（Code Review）", "环境一致性"],
    materials: [{ title: "SLSA · 供应链完整性框架", url: "https://slsa.dev/" }],
  },
  "D7|技术债管理": {
    def: "把权宜之计显式登记：债的数额、利息（影响面）与偿还计划。",
    why: "不登记的债不会消失，只会在最糟的时刻以事故的形式讨债（N5 的时间维度）。",
    points: [
      "登记进 issue/ADR 并标注 tech-debt：写清「为什么当时这么做」。",
      "偿还排进常规迭代占固定比例，而不是「等有空」。",
      "新增债要过评审：说明利息与偿还的触发条件。",
    ],
    pitfall: "「忙完这阵就重构」——那阵永远不会来，利息按月复利。",
    related: ["ADR 架构决策记录", "代码评审（Code Review）", "功能开关与灰度发布"],
  },
  "D7|弃用与下线流程": {
    def: "旧接口、旧字段的退场管理：公告、按调用方监控使用量、迁移文档、到期下线。",
    why: "只加不减的系统会变成博物馆；弃用没有流程，「保持兼容」就变成无限期承诺。",
    points: [
      "弃用公告必须带下线日期——没有日期的公告只是道歉信（D7 不变量）。",
      "按调用方监控使用量，降到阈值以下才执行下线。",
      "给迁移文档与缓冲期，内部调用方先迁完再做外部下线。",
    ],
    pitfall: "「先标个 Deprecated 反正没人看」——三年后它还在，而且没人敢动。",
    related: ["版本化", "契约测试", "数据生命周期"],
    materials: [{ title: "Google AIP-236 · Deprecation", url: "https://google.aip.dev/236" }],
  },
  "D7|康威定律与团队边界": {
    def: "系统结构会镜像组织的沟通结构——服务边界要顺着团队边界划。",
    why: "跨团队的服务边界意味着每次修改都要跨团队协调；治理要承认组织现实（N5）。",
    points: [
      "一个服务有一个清晰归属的团队，反之亦然。",
      "团队间的边界走正式 API 契约，不走共享库或共享库表。",
      "组织不动而单方面拆微服务，摩擦只是换了个地方。",
    ],
    pitfall: "三个团队共管一个服务——优先级打架，最后谁都不敢重构它。",
    related: ["模块边界", "代码所有权（CODEOWNERS）", "ADR 架构决策记录"],
    materials: [{ title: "《Team Topologies》官网", url: "https://teamtopologies.com/" }],
  },
  "D7|值班与升级路径": {
    def: "谁在什么时间响应什么等级的告警、响应不动时升级给谁——写成制度。",
    why: "告警分级回答「多严重」，值班制度回答「谁来看」；没有升级路径，深夜事故只能靠英雄主义。",
    points: [
      "升级链写下来并演练：一线 → 二线 → 主管，含响应时间窗。",
      "值班跟着服务所有权走：谁运维谁值班。",
      "轮换 + 补偿；长期单人值班必然以离职收场。",
    ],
    pitfall: "「出事就打电话给那个懂的人」——他休假那天，事故就会升级成灾难。",
    related: ["告警分级", "故障复盘", "代码所有权（CODEOWNERS）"],
    materials: [{ title: "《Google SRE》· Being On-Call", url: "https://sre.google/sre-book/being-on-call/" }],
  },
  "D7|文档与 Runbook": {
    def: "随代码评审的三类文档：README（是什么）、Runbook（怎么操作）、ADR（为什么这么定）。",
    why: "团队记忆会流失（N5）；告警分级要求每条告警挂 runbook——没有文档的告警不可行动。",
    points: [
      "文档随代码走：同一个 PR 评审、同一个目录版本化。",
      "Runbook 写操作步骤与回滚，写给凌晨三点 panicked 的自己。",
      "每篇文档标注维护人；过期文档比没有文档更糟。",
    ],
    pitfall: "文档写完即过期——没人负责的 wiki 页比空白更误导。",
    related: ["ADR 架构决策记录", "告警分级", "值班与升级路径"],
  },
};

/* ---------- 三层模型（L1–L3 各自一页） ---------- */

export const layerNotes: Record<string, { def: string; pace: string; examples: string[]; note: string }> = {
  l1: {
    def: "原理与不变量层：现象级的规律，回答「为什么必然如此」。",
    pace: "十年不变 · 学一个少一个，复利最高",
    examples: ["CAP 取舍", "隔离级别异常", "幂等的必要条件", "锁与等待的代价模型"],
    note: "面试考的、事故复盘归因到的，几乎都在这一层。",
  },
  l2: {
    def: "范式与模式层：解决某类问题的成型思路，跨语言可迁移。",
    pace: "年级演化 · 换语言时直接带走的资产",
    examples: ["熔断/舱壁", "事件驱动", "CQRS", "Saga 分布式事务"],
    note: "同一个范式在不同语言里换皮出现——认出范式，学习成本降一个量级。",
  },
  l3: {
    def: "实现层：具体语言、框架、API 的映射表。",
    pace: "月级快变 · 文档查得到，不必背",
    examples: ["Spring 事务注解", "Resilience4j", "Sequelize/MyBatis", "各云厂商 SDK"],
    note: "学一门新后端语言的合理成本，应该只剩这一层。",
  },
};

/* ---------- 四步循环（m1–m4 各自一页） ---------- */

export const stepNotes: Record<string, { practice: string }> = {
  m1: {
    practice: "遇到任何新技术，先问两个问题：它属于哪个域？它在守住哪条不变量？答不上来就还没学会。",
  },
  m2: {
    practice: "读到任何一条规则，翻译成「换语言还成立吗」：成立→ L1/L2 记住；不成立→ L3 查文档即可。",
  },
  m3: {
    practice: "学新语言时列一张映射表：熟悉的每个域概念 → 新语言里的对应物。表填完，这门语言就会了一半。",
  },
  m4: {
    practice: "每次故障复盘，给根因标注「域 + 被违反的不变量」。能归因，说明框架已经内化成直觉。",
  },
};
