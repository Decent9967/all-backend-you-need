import MethodCycleDiagram from "@/components/minis/MethodCycleDiagram";
import { useI18n } from "@/components/I18n";

export default function MethodView() {
  const { t } = useI18n();
  return (
    <div className="reveal">
      <h2 className="view-title">{t.methodTitle}</h2>
      <p className="view-lede">{t.methodLede}</p>
      <div className="figure">
        <MethodCycleDiagram />
      </div>
    </div>
  );
}
