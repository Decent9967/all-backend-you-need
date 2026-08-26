import { useState } from "react";
import type { Check } from "@/data/sitemap";
import { useI18n } from "@/components/I18n";
import { enChecks } from "@/data/en";

export default function CheckView({
  check,
  checkId,
  title,
  eyebrow,
}: {
  check: Check;
  checkId?: string;
  title?: string | null;
  eyebrow?: string | null;
}) {
  const { lang, t } = useI18n();
  const [chosen, setChosen] = useState<number | null>(null);
  /* EN 模式优先用英文题面；未收录时回落中文原题 */
  const data = (lang === "en" && checkId ? enChecks[checkId] : undefined) ?? check;
  return (
    <div className="reveal check">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      {title ? <h2 className="view-title">{title}</h2> : null}
      <p className="check-question">{data.question}</p>
      <div className="check-options" role="listbox" aria-label={t.checkOptionsAria}>
        {data.options.map((opt, i) => {
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
          <p>{data.explanation}</p>
        </div>
      ) : (
        <p className="check-hint">{t.checkHint}</p>
      )}
    </div>
  );
}
