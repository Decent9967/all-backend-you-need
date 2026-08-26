import { scopeEntries, type ScopeEntry } from "@/data/scope";
import { useI18n } from "@/components/I18n";
import { enScopeRows } from "@/data/en";

/* 范围边界登记表：画布外独立页面。
   所有被评估过「不进入 / 暂缓」的知识项在此结构化留档，防止重复评估或误加入。 */

const STATUS_LABEL: Record<ScopeEntry["status"], string> = {
  excluded: "不进入",
  deferred: "暂缓",
};

function ScopeRows({ entries }: { entries: ScopeEntry[] }) {
  const { lang, t, tr } = useI18n();
  if (lang === "en") {
    return (
      <table className="scope-table">
        <thead>
          <tr>
            <th>{t.scopeCol1}</th>
            <th>{t.scopeCol2}</th>
            <th>{t.scopeCol3}</th>
            <th>{t.scopeCol4}</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => {
            const en = enScopeRows[e.name];
            return (
              <tr key={e.name}>
                <td className="scope-name">{tr(e.name)}</td>
                <td className="scope-cat">{tr(e.category)}</td>
                <td>{en?.reason ?? e.reason}</td>
                <td className="scope-revisit">{en?.revisit ?? e.revisit ?? "—"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
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
  const { t, tr } = useI18n();
  const excluded = scopeEntries.filter((e) => e.status === "excluded");
  const deferred = scopeEntries.filter((e) => e.status === "deferred");

  return (
    <div className="reveal">
      <header className="domain-view-head">
        <span className="domain-view-id">SCOPE</span>
        <h2 className="domain-view-name">{tr("范围边界登记表")}</h2>
      </header>

      <p className="view-lede">{t.scopeLede}</p>

      <section className="domain-block">
        <h3 className="mini-label mini-label-accent">{t.scopeExcluded.replace("{n}", String(excluded.length))}</h3>
        <p className="scope-group-note">{t.scopeExcludedNote}</p>
        <ScopeRows entries={excluded} />
      </section>

      <section className="domain-block">
        <h3 className="mini-label mini-label-accent">{t.scopeDeferred.replace("{n}", String(deferred.length))}</h3>
        <p className="scope-group-note">{t.scopeDeferredNote}</p>
        <ScopeRows entries={deferred} />
      </section>

      <p className="figure-note">{t.scopeFootNote}</p>
    </div>
  );
}
