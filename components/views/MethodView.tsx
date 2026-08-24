import MethodCycleDiagram from "@/components/minis/MethodCycleDiagram";

export default function MethodView() {
  return (
    <div className="reveal">
      <h2 className="view-title">学习四步循环</h2>
      <p className="view-lede">
        框架不是读一遍就完的地图。这四步构成一个可以反复运行的循环，
        直到每次事故都能归因为止。
      </p>
      <div className="figure">
        <MethodCycleDiagram />
      </div>
    </div>
  );
}
