import { checkableCount } from "@/data/roadmap";

/* ---------- 顶栏：品牌 + 标题 + 学习进度 ---------- */

export function TopBar({
  done,
  onReset,
}: {
  done: number;
  onReset: () => void;
}) {
  const total = checkableCount;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <a className="topbar-brand" href="#/" aria-label="回到路线图">
          KB-01
        </a>
        <span className="topbar-title">ALL BACKEND YOU NEED · 后端工程治理知识框架</span>
        <div className="tb-progress">
          <span className="tb-count">
            {done} / {total}
          </span>
          <span className="tb-bar" aria-hidden="true">
            <span className="tb-fill" style={{ width: `${pct}%` }} />
          </span>
          <button type="button" className="tb-reset" onClick={onReset} title="清空学习进度">
            重置
          </button>
          <a className="topbar-scope" href="#/scope" title="不进入/暂缓的知识项登记表">
            范围边界
          </a>
        </div>
      </div>
    </header>
  );
}
