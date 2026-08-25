"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

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
};

const DICT = { zh, en };

export type Dict = typeof zh;

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({
  lang: "zh",
  setLang: () => {},
  t: DICT.zh,
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

  return <LangCtx.Provider value={{ lang, setLang, t: DICT[lang] }}>{children}</LangCtx.Provider>;
}

export function useI18n() {
  return useContext(LangCtx);
}
