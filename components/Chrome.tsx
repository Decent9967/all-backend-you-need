"use client";

import { useEffect, useRef } from "react";
import { checkableCount } from "@/data/roadmap";
import TopSearch from "@/components/TopSearch";
import { useI18n } from "@/components/I18n";

/* ---------- 顶栏：品牌 + 标题 + 搜索 + 学习进度 ---------- */

export function TopBar({
  done,
  onReset,
  onOpen,
}: {
  done: number;
  onReset: () => void;
  onOpen: (id: string) => void;
}) {
  const barRef = useRef<HTMLElement | null>(null);
  const { lang, setLang, t } = useI18n();
  const total = checkableCount;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  /* 顶栏实际高度写入 --tb-h：抽屉等 fixed 元素靠它避开折行后的顶栏 */
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const apply = () =>
      document.documentElement.style.setProperty("--tb-h", `${el.offsetHeight}px`);
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <header className="topbar" ref={barRef}>
      <div className="topbar-inner">
        <a className="topbar-brand" href="#/" aria-label={t.brandAria}>
          KB-01
        </a>
        <span className="topbar-title">ALL BACKEND YOU NEED · 后端工程治理知识框架</span>
        <TopSearch onOpen={onOpen} />
        <div className="tb-progress">
          <span className="tb-count">
            {done} / {total}
          </span>
          <span className="tb-bar" aria-hidden="true">
            <span className="tb-fill" style={{ width: `${pct}%` }} />
          </span>
          <button
            type="button"
            className="tb-lang"
            onClick={() => setLang(lang === "zh" ? "en" : "zh")}
            title={lang === "zh" ? "Switch to English" : "切换到中文"}
          >
            {lang === "zh" ? "EN" : "中"}
          </button>
          <button type="button" className="tb-reset" onClick={onReset} title={t.resetTitle}>
            {t.reset}
          </button>
          <a className="topbar-scope" href="#/scope" title={t.scopeTitle}>
            {t.scope}
          </a>
        </div>
      </div>
    </header>
  );
}
