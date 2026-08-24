import type { RMNode } from "@/data/roadmap";

/* 范围边界登记表：被评估过「不进入」或「暂缓」的知识项。
   统一结构化管理，防止后续维护者重复评估或未经评审加入。
   新增概念前先查此表；要恢复某项，需在 PR 中说明其 revisit 条件已满足。 */

export type ScopeStatus = "excluded" | "deferred";

export type ScopeEntry = {
  name: string; // 概念/主题名
  category: string; // 所属分类
  status: ScopeStatus; // 不进入 | 暂缓
  reason: string; // 处置原因
  revisit?: string; // 重新评估的条件（仅暂缓项）
  reference?: string; // 参照出处
};

export const scopeEntries: ScopeEntry[] = [
  /* ---------- 不进入：与「换语言不失效的治理知识」定位冲突 ---------- */
  {
    name: "Git 与版本控制基础",
    category: "开发基础",
    status: "excluded",
    reason: "目标读者已具备；工具操作不属治理知识，框架仅在 D7 引用其产出（分支、评审）。",
    reference: "roadmap.sh 起点区",
  },
  {
    name: "HTTP / DNS / 网络基础",
    category: "开发基础",
    status: "excluded",
    reason: "入门知识；本框架直接消费其结论（如 HTTP 缓存语义、TLS）。",
    reference: "roadmap.sh",
  },
  {
    name: "数据结构与算法",
    category: "计算机基础",
    status: "excluded",
    reason: "与后端治理正交的通用基础，单列会稀释定位。",
  },
  {
    name: "前端基础（HTML / CSS / JS）",
    category: "相邻领域",
    status: "excluded",
    reason: "后端所需的交集已由 D1 通信契约覆盖。",
    reference: "roadmap.sh · Frontend Basics",
  },
  {
    name: "具体中间件用法（Redis / Kafka / Elasticsearch…）",
    category: "L3 实现层",
    status: "excluded",
    reason: "换语言/换组件即失效；仅允许作为概念笔记中的材料出现，不做节点。",
    reference: "三层知识模型",
  },
  {
    name: "语言与框架（Spring / Django / Gin…）",
    category: "L3 实现层",
    status: "excluded",
    reason: "同上：L3 是映射表，不是知识框架本身。",
    reference: "三层知识模型",
  },
  {
    name: "容器与编排操作（Docker / Kubernetes）",
    category: "基础设施",
    status: "excluded",
    reason: "治理概念已收（舱壁、优雅停机、环境一致性），平台操作属运维技能。",
    reference: "roadmap.sh · DevOps",
  },
  {
    name: "系统设计面试题解（秒杀 / 抢红包 / 短链…）",
    category: "应用题",
    status: "excluded",
    reason: "是框架知识的应用练习，不是新知识；解法都能归到七个域。",
  },
  {
    name: "对账系统（单列）",
    category: "已并入",
    status: "excluded",
    reason: "对账兜底已作为「流处理与批处理」的关键点收录。",
  },
  {
    name: "分支与合流策略（单列）",
    category: "已并入",
    status: "excluded",
    reason: "trunk-based 与短分支已并入「功能开关与灰度发布」笔记。",
  },
  {
    name: "通知与推送渠道管理",
    category: "已并入",
    status: "excluded",
    reason: "渠道重试 / 模板 / 退避的共性已由「消息投递语义」覆盖。",
  },

  /* ---------- 暂缓：值得收但条件未到 ---------- */
  {
    name: "多租户数据隔离",
    category: "场景特定",
    status: "deferred",
    reason: "B2B / SaaS 特有；共性部分（越权、最小权限）已在 D6 覆盖。",
    revisit: "读者群体主要做 SaaS 时",
    reference: "OWASP · 租户隔离",
  },
  {
    name: "Webhook 收发与验签",
    category: "场景特定",
    status: "deferred",
    reason: "投递语义、签名防伪的共性已在「消息投递语义」覆盖。",
    revisit: "异步契约章节扩充时",
  },
  {
    name: "雪花 ID / 唯一 ID 生成",
    category: "实现细节",
    status: "deferred",
    reason: "不变量层面已由「唯一约束」覆盖，生成方案属 L3。",
    revisit: "作为唯一约束笔记的扩充",
  },
  {
    name: "服务发现与配置中心",
    category: "基础设施层",
    status: "deferred",
    reason: "治理面已由「环境一致性」「密钥管理」覆盖。",
    revisit: "出现自建平台章节时",
  },
  {
    name: "共识算法（Raft / Paxos）与线性一致性",
    category: "基础设施理论",
    status: "deferred",
    reason: "应用后端几乎不直接实现；fencing token 已在分布式锁笔记点到。",
    revisit: "增设基础设施章节时",
    reference: "《DDIA》第 9 章",
  },
  {
    name: "CQRS / 事件溯源",
    category: "架构模式（特定）",
    status: "deferred",
    reason: "思想内核已由事件发件箱、读写分离、状态机覆盖。",
    revisit: "具备可引用的真实案例时",
  },
  {
    name: "CDN 与边缘缓存",
    category: "基础设施",
    status: "deferred",
    reason: "契约面已由「HTTP 缓存语义」覆盖，其余是平台配置。",
    revisit: "——",
  },
  {
    name: "FinOps / 成本治理",
    category: "组织实践",
    status: "deferred",
    reason: "工程治理暂限于交付与质量维度；成本属组织预算实践。",
    revisit: "用户反馈需要时",
  },
  {
    name: "GC 与内存模型",
    category: "运行时 / L3",
    status: "deferred",
    reason: "语言运行时知识；对长尾延迟的影响在相关笔记提及即可。",
    revisit: "——",
  },
  {
    name: "生产数据变更纪律",
    category: "待评估",
    status: "deferred",
    reason: "与「审计日志」「最小权限」存在重叠，需先做差异分析。",
    revisit: "下一轮范围评审",
  },
  {
    name: "文件上传与对象存储（分片 / 断点 / 预签名）",
    category: "场景特定",
    status: "deferred",
    reason: "大文件传输是独立工程问题；其安全面（类型校验 / 路径穿越）属 ASVS V12。",
    revisit: "出现内容管理类需求时",
    reference: "OWASP ASVS V12",
  },
  {
    name: "异地多活与单元化",
    category: "基础设施级容灾",
    status: "deferred",
    reason: "超出应用后端治理范围；同城容灾的概念面已由复制 / 备份覆盖。",
    revisit: "多机房部署成为现实时",
  },
  {
    name: "国际化（i18n 文案管理）",
    category: "产品化需求",
    status: "deferred",
    reason: "时间与时区已单列；多语言文案管理属产品范畴而非工程治理。",
    revisit: "面向海外用户时",
  },
];

/* 供 #/scope 深链使用的合成节点 */
export const scopeNode: RMNode = {
  id: "scope",
  kind: "scope",
  title: "范围边界登记表",
  checkable: false,
  variant: "plain",
  x: 0,
  y: 0,
  w: 0,
  h: 0,
};
