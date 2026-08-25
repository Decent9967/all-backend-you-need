import { conceptNotes } from "@/data/notes";
import { nodes } from "@/data/roadmap";
import { useI18n } from "@/components/I18n";
import { enNotes } from "@/data/en";

/* 概念笔记页：一节点一页——定义 / 为什么 / 关键点 / 误区 / 相关概念跳转 / 材料 */

export default function ConceptNoteView({
  domainId,
  title,
  rowTitle,
  onOpen,
}: {
  domainId?: string;
  title: string;
  rowTitle?: string;
  onOpen: (id: string) => void;
}) {
  const { lang, t, tr } = useI18n();
  /* 英文正文缺键时整条笔记回退中文 */
  const en = lang === "en" ? enNotes[`${domainId}|${title}`] : undefined;
  const note = domainId ? conceptNotes[`${domainId}|${title}`] : undefined;
  const bid = domainId?.toLowerCase();
  const domainMilestone = bid ? nodes.find((n) => n.id === bid) : undefined;

  if (!note) {
    return (
      <div className="reveal">
        <p className="figure-note">{t.noteMissing}</p>
      </div>
    );
  }

  /* 相关概念允许跨域（如 幂等键(D1) ↔ 幂等 token(D2)）：全局按标题匹配概念节点 */
  const relatedIds = (note.related ?? [])
    .map((name) => nodes.find((n) => n.kind === "concept" && n.title === name)?.id)
    .filter(Boolean) as string[];

  return (
    <div className="reveal">
      <header className="domain-view-head">
        <span className="domain-view-id">{domainId}</span>
        <h2 className="domain-view-name">{tr(title)}</h2>
      </header>
      {rowTitle ? <p className="note-row-crumb">{t.crumbPrefix}{tr(rowTitle)}</p> : null}

      <p className="view-lede note-def">{en?.def ?? note.def}</p>

      <section className="domain-block">
        <h3 className="mini-label">{t.noteWhy}</h3>
        <p className="note-why">{en?.why ?? note.why}</p>
      </section>

      <section className="domain-block">
        <h3 className="mini-label">{t.notePoints}</h3>
        <ul className="note-points">
          {(en?.points ?? note.points).map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      {note.pitfall ? (
        <section className="domain-block note-pitfall">
          <h3 className="mini-label">{t.notePitfall}</h3>
          <p>{en?.pitfall ?? note.pitfall}</p>
        </section>
      ) : null}

      {relatedIds.length ? (
        <section className="domain-block">
          <h3 className="mini-label">{t.noteRelated}</h3>
          <ul className="chips chips-click">
            {relatedIds.map((rid) => {
              const r = nodes.find((n) => n.id === rid)!;
              return (
                <li key={rid}>
                  <button type="button" onClick={() => onOpen(rid)}>
                    {tr(r.title)}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {note.materials?.length ? (
        <section className="domain-block">
          <h3 className="mini-label">{t.noteMaterials}</h3>
          <ul className="read-list">
            {note.materials.map((m) => (
              <li key={m.title}>
                {m.url ? (
                  <a className="note-material" href={m.url} target="_blank" rel="noopener noreferrer">
                    {m.title} ↗
                  </a>
                ) : (
                  <span className="note-material plain">{m.title}</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {domainMilestone ? (
        <footer className="domain-cross-note">
          <span className="mini-label">{t.noteMoreInDomain}</span>
          <button type="button" className="intro-target" onClick={() => onOpen(bid!)}>
            {t.viewDomain.replace("{name}", tr(domainMilestone.title))}
          </button>
        </footer>
      ) : null}
    </div>
  );
}
