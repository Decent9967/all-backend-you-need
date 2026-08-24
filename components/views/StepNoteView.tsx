import { learningSteps } from "@/data/framework";
import { stepNotes } from "@/data/notes";

/* 四步循环单步页：标题 + 说明 + 实践建议 */

export default function StepNoteView({ stepId }: { stepId: string }) {
  const idx = Number(stepId.replace(/^m/, "")) - 1;
  const step = learningSteps[idx];
  const note = stepNotes[stepId];
  if (!step) return null;

  return (
    <div className="reveal">
      <header className="domain-view-head">
        <span className="domain-view-id">{step.step}</span>
        <h2 className="domain-view-name">{step.title}</h2>
      </header>

      <p className="view-lede">{step.desc}</p>

      {note ? (
        <section className="domain-block note-pitfall">
          <h3 className="mini-label">怎么练</h3>
          <p>{note.practice}</p>
        </section>
      ) : null}
    </div>
  );
}
