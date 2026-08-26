import { layerNotes } from "@/data/notes";
import { useI18n } from "@/components/I18n";
import { enLayerNotes } from "@/data/en";

/* 三层模型单层笔记页（L1/L2/L3 各自一页） */

export default function LayerNoteView({ layerId }: { layerId: string }) {
  const { lang, t } = useI18n();
  const note = layerNotes[layerId];
  const en = lang === "en" ? enLayerNotes[layerId] : undefined;
  if (!note) return null;

  const name = en?.name ?? note.def.split("：")[0];
  const lede = en?.lede ?? note.def.split("：").slice(1).join("：");

  return (
    <div className="reveal">
      <header className="domain-view-head">
        <span className="domain-view-id">{layerId.toUpperCase()}</span>
        <h2 className="domain-view-name">{name}</h2>
      </header>

      <p className="view-lede">{lede}</p>

      <section className="domain-block">
        <h3 className="mini-label">{t.layerPace}</h3>
        <p className="note-why">{en?.pace ?? note.pace}</p>
      </section>

      <section className="domain-block">
        <h3 className="mini-label">{t.layerExamples}</h3>
        <ul className="note-points">
          {(en?.examples ?? note.examples).map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </section>

      <p className="figure-note">{en?.note ?? note.note}</p>
    </div>
  );
}
