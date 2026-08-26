import { calibration } from "@/data/framework";
import { useI18n } from "@/components/I18n";
import { enCalibration } from "@/data/en";
import FrameworkTree from "@/components/minis/FrameworkTree";

export default function SynthesisView() {
  const { lang, t } = useI18n();
  const rows = lang === "en" ? enCalibration : calibration;
  return (
    <div className="reveal">
      <h2 className="view-title">{t.synthTitle}</h2>
      <p className="view-lede">{t.synthLede}</p>
      <div className="synth-cols">
        <div className="calibration">
          <h3 className="mini-label">{t.synthLabel}</h3>
          {rows.map((row) => (
            <div key={row.to} className="cal-row">
              <div className="cal-items">
                {row.items.map((item) => (
                  <span key={item} className="cal-chip">
                    {item}
                  </span>
                ))}
              </div>
              <span className="cal-arrow">→</span>
              <span className="cal-to">{row.to}</span>
            </div>
          ))}
          <p className="cal-conclusion">{t.synthConclusion}</p>
        </div>
        <div className="synthesis-recap">
          <h3 className="mini-label">{t.synthTreeLabel}</h3>
          <FrameworkTree />
          <p className="figure-note">{t.synthTreeNote}</p>
        </div>
      </div>
      <p className="synthesis-line">{t.synthLine}</p>
    </div>
  );
}
