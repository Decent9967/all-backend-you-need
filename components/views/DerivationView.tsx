import { useState } from "react";
import DerivationDiagram from "@/components/DerivationDiagram";
import BuildBar from "@/components/BuildBar";
import { steps } from "@/data/sitemap";

export default function DerivationView({
  stage,
  onAdvance,
}: {
  stage: number;
  onAdvance: () => void;
}) {
  const [active, setActive] = useState<string | null>(null);
  const captions = steps.find((s) => s.id === "derivation")!.stages!;
  return (
    <div className="reveal">
      <h2 className="view-title">从本性到治理域</h2>
      <p className="view-lede">
        左列是前提，右列是责任——逐步展开，看每个域是从哪条本性推导出来的。
      </p>
      <div className="figure">
        <DerivationDiagram
          activeNature={active}
          stage={stage}
          onNatureClick={(id) => setActive((a) => (a === id ? null : id))}
        />
        <BuildBar captions={captions} stage={stage} onAdvance={onAdvance} />
      </div>
    </div>
  );
}
