import NaturesContextDiagram from "@/components/minis/NaturesContextDiagram";

export default function NaturesView() {
  return (
    <div className="reveal">
      <h2 className="view-title">五个本性，一切的出发点</h2>
      <p className="view-lede">
        「必须做」不是行业惯例，而是推导的结论——任何后端系统都被同样的五个现实包围，
        它们是前提，不可选择。
      </p>
      <div className="figure">
        <NaturesContextDiagram />
      </div>
      <p className="view-takeaway">
        语言只决定用什么工具治理，不决定要不要治理。
      </p>
    </div>
  );
}
