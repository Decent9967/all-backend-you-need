"use client";

import {
  SPINE,
  anchorById,
  branches,
  canvas,
  groups,
  nodeById,
  nodes,
  spineChain,
  type RMNode,
} from "@/data/roadmap";
import { useI18n } from "@/components/I18n";

/* 薄渲染层：复刻 roadmap.sh 的三线结构。
   中轴主线（实线：里程碑 → 毕业闸 → 下一站）+ 两侧子线
   （蓝点线：里程碑 → 组框/叶子，左右辐射）。
   里程碑带「源本性」副题；灰节点卡在主线上当闸。 */

export default function RoadmapCanvas({
  done,
  learning,
  selected,
  onOpen,
  onToggle,
}: {
  done: Set<string>;
  learning: Set<string>;
  selected: string | null;
  onOpen: (id: string) => void;
  onToggle: (id: string) => void;
}) {
  const { t } = useI18n();
  const spineNodes = spineChain
    .map((id) => nodeById(id))
    .filter((n): n is RMNode => Boolean(n));

  return (
    <>
      <div className="rm-swipe-hint" aria-hidden="true">
        {t.swipeHint}
      </div>
      <div className="figure rm-figure">
      <svg
        className="rm-svg"
        viewBox={`0 0 ${canvas.width} ${canvas.height}`}
        role="img"
        aria-label={t.canvasAria}
      >
        {/* 两侧组框（白底黑边 + 标题） */}
        {groups.map((g) => (
          <g key={g.id}>
            <rect className="rm-gbox" x={g.x} y={g.y} width={g.w} height={g.h} rx={5} />
            <text className="rm-gtitle" x={g.x + 14} y={g.y + 22}>
              {g.title}
            </text>
          </g>
        ))}

        {/* 中轴主线：实线串联（里程碑 → 闸 → 下一站） */}
        {spineNodes.slice(0, -1).map((m, i) => {
          const n = spineNodes[i + 1]!;
          const y1 = m.y + m.h;
          const y2 = n.y;
          return (
            <path
              key={`sp-${m.id}`}
              className="rm-edge"
              d={`M ${SPINE.cx} ${y1} C ${SPINE.cx} ${y1 + 24}, ${SPINE.cx} ${y2 - 24}, ${SPINE.cx} ${y2}`}
            />
          );
        })}

        {/* 两侧子线：蓝点线，从里程碑辐射到组框/叶子 */}
        {branches.map((b) => {
          const ms = nodeById(b.from);
          const to = anchorById(b.to);
          if (!ms || !to) return null;
          const mcy = ms.y + ms.h / 2;
          const cy = to.y + to.h / 2;
          if (b.side === "R") {
            const sx = ms.x + ms.w;
            return (
              <path
                key={`br-${b.to}`}
                className="rm-edge rm-edge-branch"
                d={`M ${sx} ${mcy} C ${sx + 30} ${mcy}, ${to.x - 30} ${cy}, ${to.x} ${cy}`}
              />
            );
          }
          const sx = ms.x;
          return (
            <path
              key={`bl-${b.to}`}
              className="rm-edge rm-edge-branch"
              d={`M ${sx} ${mcy} C ${sx - 30} ${mcy}, ${to.x + to.w + 30} ${cy}, ${to.x + to.w} ${cy}`}
            />
          );
        })}

        {/* 节点：单行居中标签（里程碑两行：标题 + 源本性副题）+ 掌握角标 */}
        {nodes.map((n) => {
          const isDone = done.has(n.id);
          const isLearning = learning.has(n.id);
          const isSel = selected === n.id;
          const stateHint = isDone ? t.stateDone : isLearning ? t.stateLearning : "";
          return (
            <g
              key={n.id}
              className={`rm-node rm-${n.variant}${isSel ? " rm-sel" : ""}${isDone ? " rm-done" : ""}${isLearning ? " rm-learning" : ""}`}
              transform={`translate(${n.x}, ${n.y})`}
              data-rm-id={n.id}
              data-rm-kind={n.kind}
              tabIndex={0}
              role="button"
              aria-label={`${n.title}${stateHint}`}
              onClick={() => onOpen(n.id)}
              onKeyDown={(ev) => {
                if (ev.key === "Enter" || ev.key === " ") onOpen(n.id);
              }}
            >
              <rect className="rm-nbox" width={n.w} height={n.h} rx={5} />
              {n.caption ? (
                <>
                  <text className="rm-nlabel" x={n.w / 2} y={27}>
                    {n.title}
                  </text>
                  <text className="rm-ncaption" x={n.w / 2} y={49}>
                    {n.caption}
                  </text>
                </>
              ) : (
                <text className="rm-nlabel" x={n.w / 2} y={n.h / 2 + 6}>
                  {n.title}
                </text>
              )}
              {n.checkable ? (
                <g
                  className="rm-badge"
                  transform={`translate(${n.w - 8}, 8)`}
                  onClick={(ev) => {
                    ev.stopPropagation();
                    onToggle(n.id);
                  }}
                  onKeyDown={(ev) => {
                    if (ev.key === "Enter" || ev.key === " ") {
                      ev.stopPropagation();
                      onToggle(n.id);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={isDone ? t.unmarkDone : t.markDone}
                >
                  <circle r={6.5} />
                  <path d="M -3 0.4 L -0.9 2.6 L 3 -2.2" />
                </g>
              ) : null}
            </g>
          );
        })}
      </svg>
      </div>
    </>
  );
}
