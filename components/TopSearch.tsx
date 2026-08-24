"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { nodes, orderIds } from "@/data/roadmap";
import { scopeNode } from "@/data/scope";
import { domains } from "@/data/framework";

/* 顶栏站内搜索：标题/域名/类型包含匹配，↑↓ 选择，Enter 打开，Esc 关闭，Ctrl/Cmd+K 聚焦 */

const KIND_LABEL: Record<string, string> = {
  intro: "起点",
  nature: "本性",
  "domain-header": "里程碑",
  concept: "知识点",
  checkpoint: "毕业闸",
  layer: "层次",
  "method-step": "方法",
  "lens-note": "视角",
  check: "自检",
  decision: "出口",
  synthesis: "出口",
  scope: "登记表",
};

const DOMAIN_NAME: Record<string, string> = Object.fromEntries(domains.map((d) => [d.id, d.name]));

const POOL = [...nodes, scopeNode];
const ORDER = new Map(orderIds.map((id, i) => [id, i]));
const MAX = 12;

export default function TopSearch({ onOpen }: { onOpen: (id: string) => void }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    return POOL.filter((n) => {
      const kind = KIND_LABEL[n.kind] ?? "";
      /* 本性节点 domainId 是 N1–N5，不在七域表内 */
      const domain = (n.domainId && DOMAIN_NAME[n.domainId]) || "";
      return (
        n.title.toLowerCase().includes(query) ||
        domain.toLowerCase().includes(query) ||
        kind.includes(query)
      );
    })
      .sort((a, b) => (ORDER.get(a.id) ?? 999) - (ORDER.get(b.id) ?? 999))
      .slice(0, MAX);
  }, [q]);

  useEffect(() => setActive(0), [q]);

  /* Ctrl/Cmd + K 聚焦搜索 */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const pick = (id: string) => {
    onOpen(id);
    setQ("");
    setOpen(false);
    inputRef.current?.blur();
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      const hit = results[active] ?? results[0];
      if (hit) pick(hit.id);
    } else if (e.key === "Escape") {
      if (q) setQ("");
      else {
        setOpen(false);
        inputRef.current?.blur();
      }
    }
  };

  return (
    <div className="tb-search" role="search">
      <input
        ref={inputRef}
        type="text"
        value={q}
        placeholder="搜索节点…（Ctrl+K）"
        aria-label="搜索路线图节点"
        role="combobox"
        aria-expanded={open && results.length > 0}
        aria-controls="tb-search-list"
        aria-activedescendant={results[active] ? `tb-opt-${results[active].id}` : undefined}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 120)}
        onKeyDown={onInputKey}
      />
      {open && q.trim() ? (
        <ul className="tb-search-list" id="tb-search-list" role="listbox">
          {results.length ? (
            results.map((n, i) => (
              <li
                key={n.id}
                id={`tb-opt-${n.id}`}
                role="option"
                aria-selected={i === active}
                className={i === active ? "tb-opt tb-opt-active" : "tb-opt"}
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setActive(i)}
                onClick={() => pick(n.id)}
              >
                <span className={`tb-opt-kind k-${n.kind}`}>{KIND_LABEL[n.kind] ?? n.kind}</span>
                <span className="tb-opt-title">{n.title}</span>
                {n.domainId ? <span className="tb-opt-domain">{n.domainId}</span> : null}
              </li>
            ))
          ) : (
            <li className="tb-opt tb-opt-empty">没有匹配「{q.trim()}」的节点</li>
          )}
        </ul>
      ) : null}
    </div>
  );
}
