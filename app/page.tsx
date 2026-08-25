"use client";

import { useEffect, useState } from "react";
import { TopBar } from "@/components/Chrome";
import RoadmapCanvas from "@/components/RoadmapCanvas";
import NodeDrawer from "@/components/NodeDrawer";
import { I18nProvider, useI18n } from "@/components/I18n";
import { nodeById, orderIds } from "@/data/roadmap";
import { scopeNode } from "@/data/scope";

/* 路线图外壳：#/ = 画布；#/<nodeId> = 画布 + 详情抽屉。
   进度存 localStorage；Esc 关抽屉，←/→ 在抽屉间切换。 */

const DONE_KEY = "kbr-done-v1";
const LEARN_KEY = "kbr-learning-v1";

const ALIASES: Record<string, string> = {
  natures: "n1",
  derivation: "d1",
  layers: "l3",
  check2: "c2",
};

function parseHash(): string | null {
  const h = window.location.hash.replace(/^#\/?/, "").toLowerCase();
  if (h === "scope") return "scope"; // 画布外独立页：范围边界登记表
  const id = ALIASES[h] ?? h;
  return nodeById(id) ? id : null;
}

function loadDone(): Set<string> {
  try {
    const raw = window.localStorage.getItem(DONE_KEY);
    const ids = raw ? (JSON.parse(raw) as string[]) : [];
    /* 只保留仍然可勾选的节点（布局演进后旧 id 可能失效） */
    return new Set(ids.filter((id) => nodeById(id)?.checkable));
  } catch {
    return new Set();
  }
}

function loadLearning(): Set<string> {
  try {
    const raw = window.localStorage.getItem(LEARN_KEY);
    const ids = raw ? (JSON.parse(raw) as string[]) : [];
    return new Set(ids.filter((id) => nodeById(id)?.checkable));
  } catch {
    return new Set();
  }
}

export default function Page() {
  return (
    <I18nProvider>
      <App />
    </I18nProvider>
  );
}

function App() {
  const { t } = useI18n();
  const [sel, setSel] = useState<string | null>(null);
  const [done, setDone] = useState<Set<string>>(() => new Set());
  const [learning, setLearning] = useState<Set<string>>(() => new Set());
  const [ready, setReady] = useState(false);
  const [staleHint, setStaleHint] = useState(false);

  useEffect(() => {
    setDone(loadDone());
    setLearning(loadLearning());
    setReady(true);
    const update = () => {
      const id = parseHash();
      if (id) {
        setSel(id);
        return;
      }
      /* 无效 hash（节点被重排/拼错）：归位画布并短暂提示，不再静默 */
      if (window.location.hash !== "" && window.location.hash !== "#/") {
        window.history.replaceState(null, "", "#/");
        setStaleHint(true);
        window.setTimeout(() => setStaleHint(false), 2600);
      }
      setSel(null);
    };
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(DONE_KEY, JSON.stringify([...done]));
    } catch {
      /* 隐私模式等场景下静默失败 */
    }
  }, [done, ready]);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(LEARN_KEY, JSON.stringify([...learning]));
    } catch {
      /* 隐私模式等场景下静默失败 */
    }
  }, [learning, ready]);

  const open = (id: string) => {
    window.location.hash = `#/${id}`;
  };
  const close = () => {
    window.location.hash = "#/";
  };
  const toggle = (id: string) => {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    /* 掌握与学习中互斥：标记掌握时自动退出学习中 */
    setLearning((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };
  const toggleLearning = (id: string) => {
    setLearning((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    /* 开始学某个节点时自动撤销「已掌握」 */
    setDone((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      /* 搜索框聚焦时快捷键归它管（↑↓ 选择、Esc 关词表） */
      if ((e.target as HTMLElement | null)?.tagName === "INPUT") return;
      if (e.key === "Escape" && sel) {
        close();
        return;
      }
      if (!sel) return;
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const i = orderIds.indexOf(sel);
      const ni = e.key === "ArrowRight" ? i + 1 : i - 1;
      if (ni >= 0 && ni < orderIds.length) open(orderIds[ni]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sel]);

  /* 深链/跳转定位：节点不在视口时平滑滚到画布中央，并短暂高亮 */
  useEffect(() => {
    if (!ready || !sel) return;
    const g = document.querySelector<SVGGElement>(`g[data-rm-id="${sel}"]`);
    if (!g) return;
    const r = g.getBoundingClientRect();
    const visible =
      r.top >= 0 && r.bottom <= window.innerHeight && r.left >= 0 && r.right <= window.innerWidth;
    if (!visible) g.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    g.classList.add("rm-flash");
    const t = window.setTimeout(() => g.classList.remove("rm-flash"), 1500);
    return () => window.clearTimeout(t);
  }, [sel, ready]);

  const selected = sel ? (sel === "scope" ? scopeNode : nodeById(sel)) : undefined;

  return (
    <div className="app-shell">
      <TopBar
        done={done.size}
        onReset={() => {
          setDone(new Set());
          setLearning(new Set());
        }}
        onOpen={open}
      />
      <div className="sheet-wrap map-wrap">
        <main className="map-head" aria-live="polite">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 className="map-title">ALL BACKEND YOU NEED</h1>
          <p className="map-lede">{t.lede}</p>
          <div className="map-legend" aria-hidden="true">
            <span className="lg-item">
              <span className="lg-sw lg-sw-bright" /> {t.legendMilestone}
            </span>
            <span className="lg-item">
              <span className="lg-sw lg-sw-pale" /> {t.legendConcept}
            </span>
            <span className="lg-item">
              <span className="lg-sw lg-sw-gray" /> {t.legendGate}
            </span>
            <span className="lg-item">
              <span className="lg-sw lg-sw-purple" /> {t.legendExit}
            </span>
            <span className="lg-item">
              <span className="lg-solid" /> {t.legendSpine}
            </span>
            <span className="lg-item">
              <span className="lg-dots" /> {t.legendBranch}
            </span>
            <span className="lg-item">
              <span className="lg-badge" /> {t.legendBadge}
            </span>
            <span className="lg-item">
              <span className="lg-done" /> {t.legendDone}
            </span>
          </div>
        </main>
        <RoadmapCanvas done={done} learning={learning} selected={sel} onOpen={open} onToggle={toggle} />
      </div>
      {selected ? (
        <NodeDrawer
          node={selected}
          done={done.has(selected.id)}
          learning={learning.has(selected.id)}
          onToggle={toggle}
          onToggleLearning={toggleLearning}
          onClose={close}
          onOpen={open}
        />
      ) : null}
      {staleHint ? (
        <div className="hash-toast" role="status">
          {t.toastStale}
        </div>
      ) : null}
    </div>
  );
}
