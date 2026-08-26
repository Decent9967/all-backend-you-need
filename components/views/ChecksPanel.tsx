import { checks } from "@/data/sitemap";
import CheckView from "./CheckView";
import { useI18n } from "@/components/I18n";

/* 三道自检连排：覆盖推导、层次、安全三个最容易混的判断 */

const LIST = ["check1", "check2", "check3"] as const;

export default function ChecksPanel() {
  const { t } = useI18n();
  return (
    <div className="reveal checks-panel">
      <p className="eyebrow">{t.checkEyebrow}</p>
      <h2 className="view-title">{t.checksTitle}</h2>
      {LIST.map((id, i) => (
        <section key={id} className="checks-item">
          <span className="mini-label">{t.checkQnum.replace("{n}", String(i + 1))}</span>
          <CheckView check={checks[id]} checkId={id} title={null} eyebrow={null} />
        </section>
      ))}
    </div>
  );
}
