"use client";

import { useEffect, useState } from "react";
import { TopBar } from "@/components/Chrome";
import RoadmapCanvas from "@/components/RoadmapCanvas";
import NodeDrawer from "@/components/NodeDrawer";
import { nodeById, orderIds } from "@/data/roadmap";
import { scopeNode } from "@/data/scope";

/* 路线图外壳：#/ = 画布；#/<nodeId> = 画布 + 详情抽屉。
   进度存 localStorage；Esc 关抽屉，←/→ 在抽屉间切换。 */

const DONE_KEY = "kbr-done-v1";

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

export default function Page() {
  const [sel, setSel] = useState<string | null>(null);
  const [done, setDone] = useState<Set<string>>(() => new Set());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setDone(loadDone());
    setReady(true);
    const update = () => setSel(parseHash());
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

  const open = (id: string) => {
    window.location.hash = `#/${id}`;
  };
  const close = () => {
    window.location.hash = "#/";
  };
  const toggle = (id: string) =>
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
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

  const selected = sel ? (sel === "scope" ? scopeNode : nodeById(sel)) : undefined;

  return (
    <div className="app-shell">
      <TopBar done={done.size} onReset={() => setDone(new Set())} />
      <div className="sheet-wrap map-wrap">
        <main className="map-head" aria-live="polite">
          <p className="eyebrow">KB-01 · ROADMAP</p>
          <h1 className="map-title">后端工程治理知识框架</h1>
          <p className="map-lede">
            沿中间亮黄主线一站站走：起点讲清「为什么是这七件事」，D1–D7 的知识点
            分列主线两侧，灰色闸是每站的毕业标准，底部紫色是出口。
            点击任何节点看详情，右上角小圈记录掌握进度。
          </p>
          <div className="map-legend" aria-hidden="true">
            <span className="lg-item">
              <span className="lg-sw lg-sw-bright" /> 主线里程碑
            </span>
            <span className="lg-item">
              <span className="lg-sw lg-sw-pale" /> 知识点
            </span>
            <span className="lg-item">
              <span className="lg-sw lg-sw-gray" /> 毕业闸
            </span>
            <span className="lg-item">
              <span className="lg-sw lg-sw-purple" /> 进阶出口
            </span>
            <span className="lg-item">
              <span className="lg-solid" /> 学习主线
            </span>
            <span className="lg-item">
              <span className="lg-dots" /> 展开（两侧）
            </span>
            <span className="lg-item">
              <span className="lg-badge" /> 角标＝已掌握
            </span>
          </div>
        </main>
        <RoadmapCanvas done={done} selected={sel} onOpen={open} onToggle={toggle} />
      </div>
      {selected ? (
        <NodeDrawer
          node={selected}
          done={done.has(selected.id)}
          onToggle={toggle}
          onClose={close}
          onOpen={open}
        />
      ) : null}
    </div>
  );
}
