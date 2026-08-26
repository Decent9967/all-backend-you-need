import { learningSteps } from "@/data/framework";
import { stepNotes } from "@/data/notes";
import { useI18n } from "@/components/I18n";
import { enLearningSteps, enStepNotes } from "@/data/en";

/* 四步循环单步页：标题 + 说明 + 实践建议 */

export default function StepNoteView({ stepId }: { stepId: string }) {
  const { lang, t, tr } = useI18n();
  const idx = Number(stepId.replace(/^m/, "")) - 1;
  const step = learningSteps[idx];
  const note = stepNotes[stepId];
  const enNote = lang === "en" ? enStepNotes[stepId] : undefined;
  if (!step) return null;

  return (
    <div className="reveal">
      <header className="domain-view-head">
        <span className="domain-view-id">{step.step}</span>
        <h2 className="domain-view-name">{tr(step.title)}</h2>
      </header>

      <p className="view-lede">{lang === "en" ? enLearningSteps[stepId] ?? step.desc : step.desc}</p>

      {note ? (
        <section className="domain-block note-pitfall">
          <h3 className="mini-label">{t.stepPractice}</h3>
          <p>{(enNote ?? note)?.practice}</p>
        </section>
      ) : null}
    </div>
  );
}
