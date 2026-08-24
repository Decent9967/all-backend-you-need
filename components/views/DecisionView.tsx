import DecisionFlowDiagram from "@/components/DecisionFlowDiagram";

export default function DecisionView() {
  return (
    <div className="reveal">
      <h2 className="view-title">「要不要做」的判断流程</h2>
      <p className="view-lede">
        学完是为了判断。以后遇到任何实践、规范、依赖——先问一个问题：
        它是否由五个本性之一推导而来。
      </p>
      <div className="figure">
        <DecisionFlowDiagram />
      </div>
    </div>
  );
}
