"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { enTitle } from "@/data/en";

/* 轻量 i18n：单页 hash 路由应用，用 Context + 词典即可，无需 next-intl 的路由层。
   UI 文案（顶栏/抽屉/图例/提示）双语；知识内容（笔记/不变量/题目）暂以中文编写，
   词典 key 命名按「组件.用途」。 */

export type Lang = "zh" | "en";

const zh = {
    brandAria: "回到路线图",
    searchPlaceholder: "搜索节点…（Ctrl+K）",
    searchAria: "搜索路线图节点",
    reset: "重置",
    resetTitle: "清空学习进度",
    scope: "范围边界",
    scopeTitle: "不进入/暂缓的知识项登记表",
    searchHint: "没有匹配的节点",
    eyebrow: "KB-01 · 后端工程治理知识框架",
    lede: "沿中间亮黄主线一站站走：起点讲清「为什么是这七件事」，D1–D7 的知识点分列主线两侧，灰色闸是每站的毕业标准，底部紫色是出口。点击任何节点看详情，右上角小圈记录掌握进度。",
    legendMilestone: "主线里程碑",
    legendConcept: "知识点",
    legendGate: "毕业闸",
    legendExit: "进阶出口",
    legendSpine: "学习主线",
    legendBranch: "展开（两侧）",
    legendBadge: "角标＝可勾选",
    legendDone: "变绿＝已掌握",
    toastStale: "链接已失效，已回到画布",
    swipeHint: "← 左右滑动查看全图 →",
    canvasAria: "后端工程治理知识框架路线图",
    markDone: "标记已掌握",
    unmarkDone: "取消已掌握",
    stateDone: "（已掌握）",
    stateLearning: "（学习中）",
    closeAria: "关闭详情",
    prev: "← 上一个",
    next: "下一个 →",
    close: "关闭",
    learning: "学习中",
    learningOn: "学习中 ✓",
    mastered: "已掌握",
    masteredOn: "已掌握 ✓",
    stateGroupAria: "学习状态",
    noteWhy: "为什么需要它",
    notePoints: "关键点",
    notePitfall: "常见误区",
    noteRelated: "相关概念 · 同域跳转",
    noteMaterials: "深入材料",
    noteMoreInDomain: "这一站的其他知识",
    noteMissing: "这条笔记还在编写中——先看所在域的完整面板。",
    crumbPrefix: "子主题 · ",
    viewDomain: "查看整个「{name}」域 →",
    gateTitle: "毕业自检 · {name}",
    gateLede: "合上材料，凭记忆把下面每条不变量讲清楚——讲不清的那条，就是你还没带走的东西。",
    invariants: "不变量 · 换任何语言都成立",
    retrieval: "检索练习",
    gateNote: "毕业标准不是「读完了」，而是「能复述并解释每条不变量」。",
    dvProblem: "根本问题",
    dvConcepts: "核心概念 · 跨语言词汇",
    dvMap: "概念图",
    dvInvariants: "不变量 · 换任何语言都成立",
    dvCross: "既有经验映射",
    dvReading: "本域书单 · 先读这几份建骨架",
    dvPillars: "三支柱 · 三者不可互相替代",
    natureLabel: "本性 · 任何后端系统都逃不掉",
    natureDerived: "由此推导出的治理域 · 点击查看",
    natureCanvas: "画布位置",
    natureCanvasBtn: "起点里程碑「后端是什么」→",
    natureClosing: "这条本性不接受妥协——由它推出的治理动作是必然推论，而不是行业惯例。换任何语言、任何框架，它都在那里。",
    introLede: "后端工程的全部复杂性，来自五个绕不开的本性；七个治理域不是并列的分类，而是这五个本性一路推导出来的结果。这张图按学习顺序组织——沿左列里程碑一站站走。",
    introDerives: "推导出：",
    introNote: "每一站的组框副标题都标着「源 N·」——记住推导关系，忘了任何一个域在解决什么问题时，回到这条链上找。",
    decisionTitle: "「要不要做」的判断流程",
    decisionLede: "学完是为了判断。以后遇到任何实践、规范、依赖——先问一个问题：它是否由五个本性之一推导而来。",
    methodTitle: "学习四步循环",
    methodLede: "框架不是读一遍就完的地图。这四步构成一个可以反复运行的循环，直到每次事故都能归因为止。",
    scopeLede: "本框架只收「换语言不失效」的治理知识。凡被评估后不纳入或暂缓的主题都在此留档——新增概念前先查此表；要恢复某项，需在 PR 中说明其「重新评估条件」已满足，并更新本表而不是绕过它。",
    scopeExcluded: "不进入 · {n} 项",
    scopeDeferred: "暂缓 · {n} 项",
    scopeExcludedNote: "与定位冲突：开发基础、L3 实现层、基础设施操作，或已并入其他概念。",
    scopeDeferredNote: "值得收但条件未到：场景特定、实现细节或与其他概念重叠，满足右列条件时重评。",
    scopeCol1: "概念 / 主题",
    scopeCol2: "分类",
    scopeCol3: "处置原因",
    scopeCol4: "重新评估条件",
    scopeFootNote: "登记表数据在 data/scope.ts；修改它即修改本页，与画布数据同库同评审。",
    checkHint: "选一个答案——对错不重要，努力回想的过程才是记忆的关键。",
    checkExplain: "解析",
    checkOptionsAria: "选项",
    layerPace: "变化节奏",
    layerExamples: "这一层的例子",
    stepPractice: "怎么练",
    layersTitle: "三层知识模型",
    layersLede: "后端知识分三层，越往下越稳定——逐层沉积，最后看清楚哪些知识换语言也不用重学。",
    mappingTitle: "同一概念，四种实现",
    mappingDesc: "以「熔断」为例：概念层学一次，进入每种语言只补一次映射。用映射表代替重学，是三层模型最直接的用法。",
    mappingColLang: "语言",
    mappingColImpl: "{concept} 的实现",
    mappingConcept: "熔断",
    synthTitle: "校准：你的经验在框架里的位置",
    synthLede: "左侧把一份典型的三年经验清单放回框架，看清经验集中在哪里、缺口在哪里；右侧是一棵可逐支展开的框架全景树——先凭记忆猜一支里有什么，再点开对照。",
    synthLabel: "典型三年经验 · 放回框架对照",
    synthConclusion: "经验集中在 D7 工程治理 与 D5 可观测性；框架补齐的是 D1–D4 与 D6——契约、并发一致性、数据、弹性与安全。",
    synthTreeLabel: "全景 · 可展开的框架树",
    synthTreeNote: "每一支都可点击展开或收起；不变量前的墨蓝短标是整套框架最该带走的东西。",
    synthLine: "五个本性推导出七个域；越靠近原理层的知识越稳定；不变量是跨语言的本体——学新语言，只补实现层的那张映射表。",
    treeExpanded: "已展开 {n} / {total} 支",
    treeAll: "全部展开",
    treeNone: "全部收起",
    buildHint: "点击搭建下一幕 →",
};

/* en 按 zh 的键约束，缺键多键都会在编译期报错 */
const en: typeof zh = {
    brandAria: "Back to the roadmap",
    searchPlaceholder: "Search nodes… (Ctrl+K)",
    searchAria: "Search roadmap nodes",
    reset: "Reset",
    resetTitle: "Clear learning progress",
    scope: "Scope",
    scopeTitle: "Registry of out-of-scope / deferred items",
    searchHint: "No matching nodes",
    eyebrow: "KB-01 · A Backend Governance Knowledge Framework",
    lede: "Follow the bright-yellow spine station by station: the start explains why these seven things, D1–D7 concepts line both sides, gray gates are each station's graduation bar, and purple nodes at the bottom are the exits. Click any node for details; the small circle at its corner tracks mastery.",
    legendMilestone: "Milestone",
    legendConcept: "Concept",
    legendGate: "Graduation gate",
    legendExit: "Exit",
    legendSpine: "Learning spine",
    legendBranch: "Branches (sides)",
    legendBadge: "Circle = toggleable",
    legendDone: "Green = mastered",
    toastStale: "Invalid link — returned to the canvas",
    swipeHint: "← Swipe sideways to see the full map →",
    canvasAria: "Backend governance knowledge roadmap",
    markDone: "Mark as mastered",
    unmarkDone: "Unmark as mastered",
    stateDone: " (mastered)",
    stateLearning: " (learning)",
    closeAria: "Close details",
    prev: "← Prev",
    next: "Next →",
    close: "Close",
    learning: "Learning",
    learningOn: "Learning ✓",
    mastered: "Mastered",
    masteredOn: "Mastered ✓",
    stateGroupAria: "Learning state",
    noteWhy: "Why it matters",
    notePoints: "Key points",
    notePitfall: "Common pitfalls",
    noteRelated: "Related concepts",
    noteMaterials: "Primary sources",
    noteMoreInDomain: "More in this domain",
    noteMissing: "This note is still being written — see the full domain panel for now.",
    crumbPrefix: "Sub-topic · ",
    viewDomain: "View the whole {name} domain →",
    gateTitle: "Graduation check · {name}",
    gateLede: "Close the materials and explain each invariant from memory — the one you can't articulate is the one you haven't taken with you.",
    invariants: "Invariants · true in any language",
    retrieval: "Retrieval practice",
    gateNote: "Graduating isn't \"finished reading\" — it's being able to restate and explain every invariant.",
    dvProblem: "Core problem",
    dvConcepts: "Core concepts · vocabulary that transfers",
    dvMap: "Concept map",
    dvInvariants: "Invariants · true in any language",
    dvCross: "Prior experience mapping",
    dvReading: "Reading list · build the skeleton first",
    dvPillars: "Three pillars · not interchangeable",
    natureLabel: "Nature · no backend system escapes it",
    natureDerived: "Domains derived from it · click to view",
    natureCanvas: "On the canvas",
    natureCanvasBtn: "Start milestone “What is backend” →",
    natureClosing: "This nature admits no compromise — the governance actions derived from it are necessary conclusions, not industry fashion. In any language, any framework, it is there.",
    introLede: "All the complexity of backend engineering flows from five unavoidable natures; the seven governance domains are not a parallel taxonomy but the result of deriving them step by step. This map is ordered for learning — walk the milestones down the left column.",
    introDerives: "derives →",
    introNote: "Every station's group caption carries a “from N·” tag — remember the derivation chain, and when you forget what a domain is solving, come back to it.",
    decisionTitle: "The “should we adopt it” decision flow",
    decisionLede: "You learn in order to judge. For any practice, standard or dependency ahead, ask one question first: is it derived from one of the five natures?",
    methodTitle: "The four-step learning cycle",
    methodLede: "The framework isn't a map you read once. These four steps form a cycle you can run repeatedly — until every incident can be attributed.",
    scopeLede: "This framework only collects governance knowledge that survives a language switch. Everything evaluated and kept out or deferred is registered here — check this table before adding a concept; to restore an item, its revisit condition must be shown to be met in a PR, updating this table rather than bypassing it.",
    scopeExcluded: "Excluded · {n}",
    scopeDeferred: "Deferred · {n}",
    scopeExcludedNote: "Conflicts with the focus: dev fundamentals, L3 implementation, infrastructure operations, or merged into other concepts.",
    scopeDeferredNote: "Worth including but conditions unmet: scenario-specific, implementation detail, or overlapping — re-evaluate when the right column's condition holds.",
    scopeCol1: "Concept / topic",
    scopeCol2: "Category",
    scopeCol3: "Reason",
    scopeCol4: "Revisit condition",
    scopeFootNote: "The registry lives in data/scope.ts; editing it edits this page — same repo, same review as the canvas.",
    checkHint: "Pick an answer — right or wrong doesn't matter; the effort of recalling is what builds memory.",
    checkExplain: "Why",
    checkOptionsAria: "Options",
    layerPace: "Rate of change",
    layerExamples: "Examples on this layer",
    stepPractice: "How to practice",
    layersTitle: "The three-layer knowledge model",
    layersLede: "Backend knowledge sits in three layers, more stable the deeper you go — sediment layer by layer and see clearly which knowledge never needs relearning.",
    mappingTitle: "One concept, four implementations",
    mappingDesc: "Take circuit breaking: learn the concept once, then add only a mapping per language. Replacing relearning with a mapping table is the model's most direct use.",
    mappingColLang: "Language",
    mappingColImpl: "Implementation of {concept}",
    mappingConcept: "circuit breaking",
    synthTitle: "Calibrate: your experience within the framework",
    synthLede: "The left side places a typical three-year experience list back into the framework — see where experience concentrates and where the gaps are; the right side is an expandable tree of the whole framework — guess a branch from memory first, then expand to check.",
    synthLabel: "A typical three years · mapped back",
    synthConclusion: "Experience concentrates in D7 Engineering Governance and D5 Observability; the framework fills in D1–D4 and D6 — contracts, concurrency, data, resilience and security.",
    synthTreeLabel: "The full picture · an expandable tree",
    synthTreeNote: "Every branch expands or collapses on click; the dark-blue markers before invariants are what the whole framework most wants you to take away.",
    synthLine: "Five natures derive seven domains; the closer to principles, the more stable the knowledge; invariants are the language-transcending essence — a new language costs only its implementation mapping table.",
    treeExpanded: "{n} / {total} expanded",
    treeAll: "Expand all",
    treeNone: "Collapse all",
    buildHint: "Click to build the next stage →",
};

const DICT = { zh, en };

export type Dict = typeof zh;

type I18nCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
  /* 中文串 → 英文标题（enTitle 缺键回退原串）——节点/组框/副题共用 */
  tr: (zh: string) => string;
};

const LangCtx = createContext<I18nCtx>({
  lang: "zh",
  setLang: () => {},
  t: DICT.zh,
  tr: (zh) => zh,
});

const LANG_KEY = "kbr-lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("zh");

  useEffect(() => {
    const saved = window.localStorage.getItem(LANG_KEY);
    if (saved === "en" || saved === "zh") setLang(saved);
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(LANG_KEY, lang);
    } catch {
      /* 隐私模式静默失败 */
    }
    document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
  }, [lang]);

  const tr = (zh: string) => (lang === "en" ? enTitle[zh] ?? zh : zh);
  return <LangCtx.Provider value={{ lang, setLang, t: DICT[lang], tr }}>{children}</LangCtx.Provider>;
}

export function useI18n() {
  return useContext(LangCtx);
}
