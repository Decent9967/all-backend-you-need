import { layerNotes } from "@/data/notes";

/* 三层模型单层笔记页（L1/L2/L3 各自一页） */

export default function LayerNoteView({ layerId }: { layerId: string }) {
  const note = layerNotes[layerId];
  if (!note) return null;

  const name = note.def.split("：")[0];
  const lede = note.def.split("：").slice(1).join("：");

  return (
    <div className="reveal">
      <header className="domain-view-head">
        <span className="domain-view-id">{layerId.toUpperCase()}</span>
        <h2 className="domain-view-name">{name}</h2>
      </header>

      <p className="view-lede">{lede}</p>

      <section className="domain-block">
        <h3 className="mini-label">变化节奏</h3>
        <p className="note-why">{note.pace}</p>
      </section>

      <section className="domain-block">
        <h3 className="mini-label">这一层的例子</h3>
        <ul className="note-points">
          {note.examples.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </section>

      <p className="figure-note">{note.note}</p>
    </div>
  );
}
