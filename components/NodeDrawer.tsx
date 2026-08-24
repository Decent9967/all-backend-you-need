"use client";

import { useState } from "react";
import type { RMNode } from "@/data/roadmap";
import { orderIds } from "@/data/roadmap";
import { domains } from "@/data/framework";
import { checks } from "@/data/sitemap";
import DomainView from "@/components/views/DomainView";
import LayersView from "@/components/views/LayersView";
import MethodView from "@/components/views/MethodView";
import DecisionView from "@/components/views/DecisionView";
import SynthesisView from "@/components/views/SynthesisView";
import NaturePanel from "@/components/views/NaturePanel";
import CheckpointPanel from "@/components/views/CheckpointPanel";
import IntroPanel from "@/components/views/IntroPanel";
import ConceptNoteView from "@/components/views/ConceptNoteView";
import LayerNoteView from "@/components/views/LayerNoteView";
import StepNoteView from "@/components/views/StepNoteView";
import CheckView from "@/components/views/CheckView";
import ScopePanel from "@/components/views/ScopePanel";

/* 节点详情抽屉：一节点一页。
   概念 → 专属笔记页；里程碑 → 域全景；毕业闸 → 不变量 + 检索题。 */

function DrawerBody({ node, onOpen }: { node: RMNode; onOpen: (id: string) => void }) {
  const [stage, setStage] = useState(0);
  const bump = () => setStage((s) => s + 1);
  const domain = node.domainId ? domains.find((d) => d.id === node.domainId) : undefined;

  switch (node.kind) {
    case "intro":
      return <IntroPanel onOpen={onOpen} />;
    case "nature":
      return <NaturePanel natureId={node.domainId!} onOpen={onOpen} />;
    case "domain-header":
      return domain ? <DomainView domain={domain} stage={stage} onAdvance={bump} /> : null;
    case "concept":
      return <ConceptNoteView domainId={node.domainId} title={node.title} onOpen={onOpen} />;
    case "checkpoint":
      return <CheckpointPanel domainId={node.domainId} checkId={node.checkId} />;
    case "check":
      return node.checkId ? (
        <CheckView check={checks[node.checkId]} title={null} eyebrow={null} />
      ) : null;
    case "layer":
      return node.id === "lens" ? (
        <LayersView stage={stage} onAdvance={bump} />
      ) : (
        <LayerNoteView layerId={node.id} />
      );
    case "lens-note":
      return <LayersView stage={stage} onAdvance={bump} />;
    case "method-step":
      return node.id === "method" ? <MethodView /> : <StepNoteView stepId={node.id} />;
    case "decision":
      return <DecisionView />;
    case "synthesis":
      return <SynthesisView />;
    case "scope":
      return <ScopePanel />;
    default:
      return null;
  }
}

export default function NodeDrawer({
  node,
  done,
  onToggle,
  onClose,
  onOpen,
}: {
  node: RMNode;
  done: boolean;
  onToggle: (id: string) => void;
  onClose: () => void;
  onOpen: (id: string) => void;
}) {
  const idx = orderIds.indexOf(node.id);
  const prev = orderIds[idx - 1];
  const next = orderIds[idx + 1];
  const headCode = node.code ?? node.domainId;

  return (
    <>
      <div className="drawer-veil" onClick={onClose} aria-hidden="true" />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label={node.title}>
        <header className="drawer-head">
          {headCode ? <span className="drawer-code">{headCode}</span> : null}
          <span className="drawer-title">{node.title}</span>
          <button type="button" className="drawer-close" onClick={onClose} aria-label="关闭详情">
            ✕
          </button>
        </header>
        <div className="drawer-body" key={node.id}>
          <DrawerBody node={node} onOpen={onOpen} />
        </div>
        <footer className="drawer-foot">
          <button
            type="button"
            className="drawer-nav"
            disabled={!prev}
            onClick={() => prev && onOpen(prev)}
          >
            ← 上一个
          </button>
          {node.checkable ? (
            <button
              type="button"
              className={`drawer-done${done ? " is-done" : ""}`}
              onClick={() => onToggle(node.id)}
            >
              {done ? "已掌握 ✓" : "标记已掌握"}
            </button>
          ) : (
            <button type="button" className="drawer-nav" onClick={onClose}>
              关闭
            </button>
          )}
          <button
            type="button"
            className="drawer-nav"
            disabled={!next}
            onClick={() => next && onOpen(next)}
          >
            下一个 →
          </button>
        </footer>
      </aside>
    </>
  );
}
