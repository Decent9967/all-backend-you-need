import LayersDiagram from "@/components/LayersDiagram";
import BuildBar from "@/components/BuildBar";
import { steps } from "@/data/sitemap";
import { conceptMappingExample } from "@/data/framework";
import { useI18n } from "@/components/I18n";
import { enStages } from "@/data/en";

export default function LayersView({
  stage,
  onAdvance,
}: {
  stage: number;
  onAdvance: () => void;
}) {
  const { lang, t } = useI18n();
  const captions = lang === "en" ? enStages.layers : steps.find((s) => s.id === "layers")!.stages!;
  return (
    <div className="reveal">
      <h2 className="view-title">{t.layersTitle}</h2>
      <p className="view-lede">{t.layersLede}</p>
      <div className="layers-cols">
        <div className="figure">
          <LayersDiagram stage={stage} />
          <BuildBar captions={captions} stage={stage} onAdvance={onAdvance} />
        </div>
        {stage >= 3 ? (
          <div className="mapping bld-pop">
            <div>
              <h3 className="mapping-title">{t.mappingTitle}</h3>
              <p className="mapping-desc">{t.mappingDesc}</p>
            </div>
            <table className="mapping-table">
              <thead>
                <tr>
                  <th>{t.mappingColLang}</th>
                  <th>{t.mappingColImpl.replace("{concept}", t.mappingConcept)}</th>
                </tr>
              </thead>
              <tbody>
                {conceptMappingExample.rows.map((r) => (
                  <tr key={r.lang}>
                    <td>{r.lang}</td>
                    <td>{r.tool}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
}
