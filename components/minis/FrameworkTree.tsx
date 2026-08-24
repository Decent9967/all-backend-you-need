"use client";

import { useState } from "react";
import { domains, layers, learningSteps, natures } from "@/data/framework";

/* 可展开/收起的框架全景树：综合页用。
   结构层（概念词汇 / 不变量）弱化，不变量条目带墨蓝短标。 */

type Row = {
  id: string;
  label: string;
  note?: string;
  code?: string;
  meta?: string;
  accent?: boolean;
  sub?: boolean;
  chips?: string[];
  children?: Row[];
};

const branches: Row[] = [
  {
    id: "b-why",
    label: "五个本性",
    note: "为什么必须",
    meta: "5 条",
    children: natures.map((n) => ({
      id: `n-${n.id}`,
      label: n.name,
      note: n.desc,
      code: n.id,
    })),
  },
  {
    id: "b-dom",
    label: "七个治理域",
    note: "治理什么",
    meta: "7 域",
    children: domains.map((d) => ({
      id: `d-${d.id}`,
      label: d.name,
      code: d.id,
      meta: `${d.concepts.length} 词 · ${d.invariants.length} 律`,
      children: [
        {
          id: `d-${d.id}-c`,
          label: "概念词汇",
          sub: true,
          meta: `${d.concepts.length}`,
          chips: d.concepts,
        },
        {
          id: `d-${d.id}-i`,
          label: "不变量",
          sub: true,
          meta: `${d.invariants.length}`,
          children: d.invariants.map((s, i) => ({
            id: `d-${d.id}-i-${i}`,
            label: s,
            accent: true,
          })),
        },
      ],
    })),
  },
  {
    id: "b-layer",
    label: "三层知识模型",
    note: "什么跨语言",
    meta: "3 层",
    children: layers.map((l) => ({
      id: `l-${l.id}`,
      label: l.name,
      code: l.id,
      note: `${l.pace} · ${l.paceNote}`,
      chips: l.examples,
    })),
  },
  {
    id: "b-how",
    label: "四步循环",
    note: "怎么用",
    meta: "4 步",
    children: learningSteps.map((s) => ({
      id: `m-${s.step}`,
      label: s.title,
      note: s.desc,
      code: s.step,
    })),
  },
];

function collectExpandable(rows: Row[], acc: string[] = []): string[] {
  rows.forEach((r) => {
    if (r.children || r.chips) {
      acc.push(r.id);
      if (r.children) collectExpandable(r.children, acc);
    }
  });
  return acc;
}

const ALL_IDS = collectExpandable(branches);

function TreeRows({
  rows,
  open,
  onToggle,
}: {
  rows: Row[];
  open: Set<string>;
  onToggle: (id: string) => void;
}) {
  return (
    <ul className="ft-group">
      {rows.map((r) => {
        const expandable = !!(r.children || r.chips);
        const isOpen = open.has(r.id);
        return (
          <li key={r.id} className="ft-item">
            {expandable ? (
              <button
                type="button"
                className={`ft-row${r.sub ? " ft-sub" : ""}`}
                aria-expanded={isOpen}
                aria-controls={`ft-g-${r.id}`}
                onClick={() => onToggle(r.id)}
              >
                <span
                  className={`ft-caret${isOpen ? " ft-caret-open" : ""}`}
                  aria-hidden="true"
                />
                {r.code && <span className="ft-code">{r.code}</span>}
                <span className="ft-label">{r.label}</span>
                {r.note && <span className="ft-note">{r.note}</span>}
                {r.meta && <span className="ft-meta">{r.meta}</span>}
              </button>
            ) : (
              <div className={`ft-row ft-leaf${r.accent ? " ft-accent" : ""}`}>
                {r.code && <span className="ft-code">{r.code}</span>}
                <span className="ft-label">{r.label}</span>
                {r.note && <span className="ft-note">{r.note}</span>}
                {r.meta && <span className="ft-meta">{r.meta}</span>}
              </div>
            )}
            {expandable && isOpen && (
              <ul className="ft-group" id={`ft-g-${r.id}`}>
                {r.chips ? (
                  <li className="ft-item">
                    <div className="ft-cloud">
                      {r.chips.map((c) => (
                        <span key={c} className="cal-chip ft-chip">
                          {c}
                        </span>
                      ))}
                    </div>
                  </li>
                ) : (
                  <TreeRows rows={r.children!} open={open} onToggle={onToggle} />
                )}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function FrameworkTree() {
  const [open, setOpen] = useState<Set<string>>(() => new Set(["b-why"]));
  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="figure figure-tight ft-figure">
      <div className="ft-topbar">
        <span className="ft-count">
          已展开 {open.size} / {ALL_IDS.length} 支
        </span>
        <div className="ft-tools">
          <button
            type="button"
            className="ft-tool"
            onClick={() => setOpen(new Set(ALL_IDS))}
          >
            全部展开
          </button>
          <button
            type="button"
            className="ft-tool"
            onClick={() => setOpen(new Set())}
          >
            全部收起
          </button>
        </div>
      </div>
      <div className="ft-scroll">
        <div className="ft-root">
          后端知识框架
          <span className="ft-root-note">本性 → 治理域 → 三层 → 方法</span>
        </div>
        <TreeRows rows={branches} open={open} onToggle={toggle} />
      </div>
    </div>
  );
}
