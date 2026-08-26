import { useState } from "react";
import type { Check } from "@/data/sitemap";
import { useI18n } from "@/components/I18n";

export default function CheckView({
  check,
  title = "本章自检",
  eyebrow = "检索练习 · 先回想，再看答案",
}: {
  check: Check;
  title?: string | null;
  eyebrow?: string | null;
}) {
  const { t } = useI18n();
  const [chosen, setChosen] = useState<number | null>(null);
  return (
    <div className="reveal check">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      {title ? <h2 className="view-title">{title}</h2> : null}
      <p className="check-question">{check.question}</p>
      <div className="check-options" role="listbox" aria-label={t.checkOptionsAria}>
        {check.options.map((opt, i) => {
          const state =
            chosen === null
              ? "idle"
              : opt.correct
                ? "right"
                : chosen === i
                  ? "wrong"
                  : "muted";
          return (
            <button
              key={opt.label}
              className={`check-opt check-${state}`}
              onClick={() => setChosen(i)}
              disabled={chosen !== null}
            >
              <span className="check-mark">
                {state === "right" ? "✓" : state === "wrong" ? "✕" : String.fromCharCode(65 + i)}
              </span>
              {opt.label}
            </button>
          );
        })}
      </div>
      {chosen !== null ? (
        <div className="check-explain">
          <span className="mini-label mini-label-accent">{t.checkExplain}</span>
          <p>{check.explanation}</p>
        </div>
      ) : (
        <p className="check-hint">{t.checkHint}</p>
      )}
    </div>
  );
}
