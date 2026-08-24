import { domains } from "./framework";

export const chapters = [
  { num: "第一章", label: "根基", question: "为什么这些事是「必须」的" },
  { num: "第二章", label: "层次", question: "什么知识跨语言，什么不跨" },
  { num: "第三章", label: "七域", question: "每个域到底治理什么" },
  { num: "第四章", label: "方法", question: "怎么用这个框架学习" },
  { num: "第五章", label: "判断", question: "遇到新实践，要不要做" },
];

export type Organizer = {
  question: string;
  anchor: string; // 先行组织者：连接既有经验
  route: string[]; // 本章路线预览
};

export const organizers: Record<number, Organizer> = {
  1: {
    question: "为什么这些事是「必须」的？",
    anchor:
      "你已经遵守很多「必须」：模块化、统一日志、CI/CD。但它们为什么必须？本章的回答是：不是行业惯例，而是从后端系统的本性推导出来的必然。",
    route: ["五个本性", "推导图", "自检"],
  },
  2: {
    question: "什么知识跨语言，什么不跨？",
    anchor:
      "你换过语言或框架就会发现：重学的大多是工具用法，而不是概念。本章把这件事讲透——学一门新后端语言的合理成本，只剩一层。",
    route: ["三层模型", "自检"],
  },
  3: {
    question: "每个域到底治理什么？",
    anchor:
      "你的三年经验已经覆盖了 D7 工程治理和 D5 可观测性的大半。本章一域一页，补齐剩下的五域——这是整套框架的主体。",
    route: ["D1 契约", "D2 并发", "D3 数据", "D4 弹性", "D5 可观测", "D6 安全", "D7 治理", "自检"],
  },
  4: {
    question: "怎么用这个框架学习？",
    anchor:
      "框架不是读一遍就完的地图，而是可以反复使用的工具。本章给你一个四步循环和一份按域的阅读清单。",
    route: ["四步循环", "阅读清单"],
  },
  5: {
    question: "遇到新实践，要不要做？",
    anchor:
      "学完是为了判断。最后把你的既有经验放回框架里校准，看清强项与缺口，并用一张决策图收束全部内容。",
    route: ["决策流程", "校准与全景"],
  },
};

export type Check = {
  question: string;
  options: { label: string; correct: boolean }[];
  explanation: string;
};

export const checks: Record<string, Check> = {
  check1: {
    question: "「网络会重试，所以每个写操作都可能执行两次」——这条规律最直接属于哪个域的责任？",
    options: [
      { label: "D3 数据与状态：迁移要幂等", correct: false },
      { label: "D2 并发与一致性：写接口默认要求幂等", correct: true },
      { label: "D4 分布式弹性：重试要退避加抖动", correct: false },
    ],
    explanation:
      "重试导致的重复执行落在「写」的语义上——幂等是 D2 的不变量；退避与抖动才是 D4 的对策。",
  },
  check2: {
    question: "「熔断」这个概念，按三层模型属于哪一层？",
    options: [
      { label: "L1 原理层：模式本身几十年不变", correct: true },
      { label: "L3 实现层：Resilience4j 换个语言就要重学", correct: false },
      { label: "只在 L2 范式层，与原理无关", correct: false },
    ],
    explanation:
      "熔断模式属于原理/范式层，学一次；Resilience4j、gobreaker、cockatiel 只是它在 L3 的不同皮肤。",
  },
  check3: {
    question: "「密钥进过一次 git，就应视为已泄露」——这是哪个域的不变量？",
    options: [
      { label: "D7 工程治理：规范要机器可检查", correct: false },
      { label: "D1 契约与 API：错误是契约的一部分", correct: false },
      { label: "D6 安全：密钥管理不可逆假设", correct: true },
    ],
    explanation:
      "密钥管理属于 D6 安全；「机器可检查」属于 D7 的不变量，别混淆两者。",
  },
};

export type Step = {
  id: string;
  chapter: number; // 0 = 封面/终页；1–5 = 章
  kind:
    | "cover"
    | "organizer"
    | "natures"
    | "derivation"
    | "check"
    | "layers"
    | "domain"
    | "method"
    | "reading"
    | "decision"
    | "synthesis"
    | "end";
  title: string;
  domainId?: string;
  checkId?: string;
  stages?: string[]; // 分步搭建：index = 当前幕，长度-1 = 需点击的搭建次数
};

export const steps: Step[] = [
  { id: "cover", chapter: 0, kind: "cover", title: "封面" },
  { id: "c1", chapter: 1, kind: "organizer", title: "章前导览" },
  { id: "natures", chapter: 1, kind: "natures", title: "五个本性" },
  {
    id: "derivation",
    chapter: 1,
    kind: "derivation",
    title: "推导关系",
    stages: [
      "左边是前提：任何后端系统都逃不掉的五个本性。",
      "对外提供服务，且网络不可信 → 契约与 API、安全。",
      "并发处理 → 并发与一致性。",
      "持久状态，数据活得比进程久 → 数据与状态。",
      "依赖的其他系统一定会失败 → 分布式弹性、可观测性。",
      "团队长期演进 → 可观测性、工程治理。七域推导完毕——没有一条是行业惯例。",
    ],
  },
  { id: "check1", chapter: 1, kind: "check", title: "自检", checkId: "check1" },
  { id: "c2", chapter: 2, kind: "organizer", title: "章前导览" },
  {
    id: "layers",
    chapter: 2,
    kind: "layers",
    title: "三层知识模型",
    stages: [
      "L3 实现层：Spring Boot、Gin、Express——按月、年换代。",
      "L2 范式层：分层架构、12-Factor、SRE——按五到十年演化。",
      "L1 原理层：幂等、ACID、CAP——几十年不变。",
      "通用框架 = L1 + L2；学一门新语言 ≈ 只替换最上面那层。",
    ],
  },
  { id: "check2", chapter: 2, kind: "check", title: "自检", checkId: "check2" },
  { id: "c3", chapter: 3, kind: "organizer", title: "章前导览" },
  ...domains.map((d) => ({
    id: d.id.toLowerCase(),
    chapter: 3,
    kind: "domain" as const,
    title: `${d.id} ${d.name}`,
    domainId: d.id,
    ...(d.id === "D2"
      ? {
          stages: [
            "两个请求同时到达，都要「先检查、再写入」。",
            "t1 · 请求 A 读到 x = 1。",
            "t2 · 请求 B 也读到 x = 1——旧值。",
            "t3 · A 基于旧值写入 x = 2。",
            "t4 · B 同样基于旧值写入 x = 3——A 的更新被覆盖（lost update）。",
            "竞态窗口在两次读与两次写之间。对策：唯一约束、幂等 token、状态机。",
          ],
        }
      : {}),
    ...(d.id === "D4"
      ? {
          stages: [
            "关闭（默认）：正常放行请求，同时统计连续失败。",
            "连续失败达到阈值 → 打开：直接失败或降级，不再打下游。",
            "冷却计时结束 → 半开：放行少量探测请求。",
            "探测成功 → 恢复关闭；探测失败 → 回到打开。",
          ],
        }
      : {}),
  })),
  { id: "check3", chapter: 3, kind: "check", title: "自检", checkId: "check3" },
  { id: "method", chapter: 4, kind: "method", title: "四步循环" },
  { id: "reading", chapter: 4, kind: "reading", title: "阅读清单" },
  { id: "decision", chapter: 5, kind: "decision", title: "判断流程" },
  { id: "synthesis", chapter: 5, kind: "synthesis", title: "校准与全景" },
  { id: "end", chapter: 0, kind: "end", title: "终页" },
];
