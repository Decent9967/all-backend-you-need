import { scopeEntries, type ScopeEntry } from "@/data/scope";

/* 范围边界登记表：画布外独立页面。
   所有被评估过「不进入 / 暂缓」的知识项在此结构化留档，防止重复评估或误加入。 */

const STATUS_LABEL: Record<ScopeEntry["status"], string> = {
  excluded: "不进入",
  deferred: "暂缓",
};

function ScopeRows({ entries }: { entries: ScopeEntry[] }) {
  return (
    <table className="scope-table">
      <thead>
        <tr>
          <th>概念 / 主题</th>
          <th>分类</th>
          <th>处置原因</th>
          <th>重新评估条件</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((e) => (
          <tr key={e.name}>
            <td className="scope-name">{e.name}</td>
            <td className="scope-cat">{e.category}</td>
            <td>{e.reason}</td>
            <td className="scope-revisit">{e.revisit ?? "—"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function ScopePanel() {
  const excluded = scopeEntries.filter((e) => e.status === "excluded");
  const deferred = scopeEntries.filter((e) => e.status === "deferred");

  return (
    <div className="reveal">
      <header className="domain-view-head">
        <span className="domain-view-id">SCOPE</span>
        <h2 className="domain-view-name">范围边界登记表</h2>
      </header>

      <p className="view-lede">
        本框架只收「换语言不失效」的治理知识。凡被评估后不纳入或暂缓的主题都在此留档——
        <strong>新增概念前先查此表</strong>；要恢复某项，需在 PR 中说明其「重新评估条件」已满足，
        并更新本表而不是绕过它。
      </p>

      <section className="domain-block">
        <h3 className="mini-label mini-label-accent">不进入 · {excluded.length} 项</h3>
        <p className="scope-group-note">与定位冲突：开发基础、L3 实现层、基础设施操作，或已并入其他概念。</p>
        <ScopeRows entries={excluded} />
      </section>

      <section className="domain-block">
        <h3 className="mini-label mini-label-accent">暂缓 · {deferred.length} 项</h3>
        <p className="scope-group-note">值得收但条件未到：场景特定、实现细节或与其他概念重叠，满足右列条件时重评。</p>
        <ScopeRows entries={deferred} />
      </section>

      <p className="figure-note">
        登记表数据在 <code>data/scope.ts</code>；修改它即修改本页，与画布数据同库同评审。
      </p>
    </div>
  );
}
