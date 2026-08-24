import LayersDiagram from "@/components/LayersDiagram";
import BuildBar from "@/components/BuildBar";
import { steps } from "@/data/sitemap";
import { conceptMappingExample } from "@/data/framework";

export default function LayersView({
  stage,
  onAdvance,
}: {
  stage: number;
  onAdvance: () => void;
}) {
  const captions = steps.find((s) => s.id === "layers")!.stages!;
  return (
    <div className="reveal">
      <h2 className="view-title">三层知识模型</h2>
      <p className="view-lede">
        后端知识分三层，越往下越稳定——逐层沉积，最后看清楚哪些知识换语言也不用重学。
      </p>
      <div className="layers-cols">
        <div className="figure">
          <LayersDiagram stage={stage} />
          <BuildBar captions={captions} stage={stage} onAdvance={onAdvance} />
        </div>
        {stage >= 3 ? (
          <div className="mapping bld-pop">
            <div>
              <h3 className="mapping-title">同一概念，四种实现</h3>
              <p className="mapping-desc">
                以「熔断」为例：概念层学一次，进入每种语言只补一次映射。
                用映射表代替重学，是三层模型最直接的用法。
              </p>
            </div>
            <table className="mapping-table">
              <thead>
                <tr>
                  <th>语言</th>
                  <th>{conceptMappingExample.concept} 的实现</th>
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
