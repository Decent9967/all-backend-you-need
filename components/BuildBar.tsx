import { useI18n } from "@/components/I18n";
export default function BuildBar({
  captions,
  stage,
  onAdvance,
}: {
  captions: string[];
  stage: number;
  onAdvance?: () => void;
}) {
  const { t } = useI18n();
  const total = captions.length - 1;
  return (
    <div
      className={onAdvance ? "build-bar build-bar-click" : "build-bar"}
      onClick={onAdvance}
      role={onAdvance ? "button" : undefined}
      tabIndex={onAdvance ? 0 : undefined}
      aria-label="讲解进度，点击展开下一幕"
      onKeyDown={(e) => {
        if (onAdvance && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onAdvance();
        }
      }}
    >
      <span className="build-caption">{captions[stage]}</span>
      <span className="build-dots" aria-hidden="true">
        {Array.from({ length: captions.length }, (_, i) => (
          <span key={i} className={`bdot${i === stage ? " bdot-now" : ""}${i < stage ? " bdot-done" : ""}`} />
        ))}
      </span>
      {onAdvance && stage < total ? (
        <span className="build-hint" aria-hidden="true">
          {t.buildHint}
        </span>
      ) : null}
    </div>
  );
}
