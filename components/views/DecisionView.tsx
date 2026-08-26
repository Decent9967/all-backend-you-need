import DecisionFlowDiagram from "@/components/DecisionFlowDiagram";
import { useI18n } from "@/components/I18n";

export default function DecisionView() {
  const { t } = useI18n();
  return (
    <div className="reveal">
      <h2 className="view-title">{t.decisionTitle}</h2>
      <p className="view-lede">{t.decisionLede}</p>
      <div className="figure">
        <DecisionFlowDiagram />
      </div>
    </div>
  );
}
