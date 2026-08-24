import { useState } from "react";
import type { Check } from "@/data/sitemap";

export default function CheckView({
  check,
  title = "本章自检",
  eyebrow = "检索练习 · 先回想，再看答案",
}: {
  check: Check;
  title?: string | null;
  eyebrow?: string | null;
}) {
  const [chosen, setChosen] = useState<number | null>(null);
  return (
    <div className="reveal check">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      {title ? <h2 className="view-title">{title}</h2> : null}
      <p className="check-question">{check.question}</p>
      <div className="check-options" role="listbox" aria-label="选项">
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
          <span className="mini-label mini-label-accent">解析</span>
          <p>{check.explanation}</p>
        </div>
      ) : (
        <p className="check-hint">选一个答案——对错不重要，努力回想的过程才是记忆的关键。</p>
      )}
    </div>
  );
}
