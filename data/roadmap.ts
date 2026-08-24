import { domains, layers, learningSteps, natures } from "./framework";

/* 路线图数据层：复刻 roadmap.sh 的三线结构（2026-08 实测归纳）。
   - 中轴主线：里程碑竖排居中，灰色毕业节点卡在主线上（过了闸才能下一站）
   - 两侧子线：子主题组/叶子左右交替分列，蓝点线从里程碑辐射出去
   - 白框只包「同类成组」的选项（五个本性、三层模型、子主题组），不再整域一个大盒子
   - 元内容降级：书单 → 域抽屉；自检题 → 毕业节点；本性推导 → 里程碑副题
   坐标全部程序化生成；节点宽度按文字实测估算，永不溢出 */

export type RMKind =
  | "intro"
  | "nature"
  | "domain-header"
  | "concept"
  | "checkpoint"
  | "check"
  | "layer"
  | "lens-note"
  | "method-step"
  | "decision"
  | "synthesis"
  | "scope";

export type RMVariant = "bright" | "pale" | "purple" | "plain" | "gray";

export type RMNode = {
  id: string;
  kind: RMKind;
  title: string;
  caption?: string; // 里程碑副题（源本性）
  code?: string;
  domainId?: string;
  checkId?: string;
  rowTitle?: string; // 所属子主题行标题（组内叶子才有，抽屉面包屑用）
  checkable: boolean;
  variant: RMVariant;
  x: number;
  y: number;
  w: number;
  h: number;
};

export type RMGroup = {
  id: string;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export type RMBranch = { from: string; to: string; side: "L" | "R" };

/* ---------- 画布几何（单位同 roadmap.sh viewBox） ---------- */

export const CANVAS_W = 1200;
const CX = 600; // 中轴
const MS_W = 250; // 里程碑宽
const MS_H = 62; // 里程碑高（标题 + 源本性副题）
const GATE_W = 240;
const LEFT_X1 = 440; // 左列右缘
const RIGHT_X0 = 760; // 右列左缘
const SIDE_W = 440; // 两侧可用宽
const ITEM_GAP = 12; // 列内间距
const STAGE_GAP = 56; // 站间距
const NODE_H = 46;
const VGAP = 12;

/* ---------- 文字测宽（Balsamiq→YaHei 回退）：CJK 全宽、拉丁半宽 ---------- */

function textW(s: string, px = 17): number {
  let w = 0;
  for (const ch of s) {
    if (/[\u2e80-\u9fff\uf900-\ufaff\uff00-\uffef·—…×]/.test(ch)) w += px;
    else if (ch === " ") w += px * 0.3;
    else if (/[A-Z]/.test(ch)) w += px * 0.72;
    else if (/[a-z0-9]/.test(ch)) w += px * 0.58;
    else w += px * 0.45;
  }
  return w;
}

const labelW = (s: string) => textW(s) + 44;

/* 组内网格：优先 2 列，放不下退 1 列；列宽按列内最长标签 */
function planGrid(labels: string[], innerW: number) {
  for (let cols = Math.min(2, Math.max(1, labels.length)); ; cols--) {
    const colW: number[] = Array.from({ length: cols }, () => 0);
    labels.forEach((t, i) => {
      const c = i % cols;
      colW[c] = Math.max(colW[c], labelW(t));
    });
    const total = colW.reduce((a, b) => a + b, 0) + (cols - 1) * VGAP;
    if (total <= innerW || cols === 1) return { cols, colW, total };
  }
}

/* ---------- 生成 ---------- */

const nodes: RMNode[] = [];
const groups: RMGroup[] = [];
const branches: RMBranch[] = [];
const spineChain: string[] = [];
const orderIds: string[] = [];

const nodeMap = new Map<string, RMNode>();
const groupMap = new Map<string, RMGroup>();
const id2anchor = new Map<string, { x: number; y: number; w: number; h: number }>();

/* 进度语义：只有「学过的知识」计入进度——概念、毕业闸、两个出口。
   本性/三层/方法步骤是框架的脚手架，勾「已掌握」没有意义。 */
const MASTERABLE = new Set<RMKind>(["concept", "checkpoint", "decision", "synthesis"]);

function pushNode(n: RMNode) {
  nodes.push(n);
  nodeMap.set(n.id, n);
  id2anchor.set(n.id, { x: n.x, y: n.y, w: n.w, h: n.h });
}

type Leaf = {
  id: string;
  kind: RMKind;
  title: string;
  code?: string;
  domainId?: string;
  checkId?: string;
  variant?: RMVariant;
  full?: boolean; // 组内整行宽
};

type Item =
  | { kind: "group"; id: string; title: string; leaves: Leaf[] }
  | { kind: "leaf"; leaf: Leaf };

type Placed = { item: Item; w: number; h: number };

/* 预计算一个条目的占位尺寸 */
function sizeOf(item: Item): Placed {
  if (item.kind === "leaf") {
    return { item, w: Math.min(SIDE_W, labelW(item.leaf.title)), h: NODE_H };
  }
  const gridLeaves = item.leaves.filter((l) => !l.full);
  const fullLeaves = item.leaves.filter((l) => l.full);
  const inner = SIDE_W - 28;
  let gridH = 0;
  let w = 0;
  if (gridLeaves.length) {
    const plan = planGrid(gridLeaves.map((l) => l.title), inner);
    const rows = Math.ceil(gridLeaves.length / plan.cols);
    gridH = rows * NODE_H + (rows - 1) * VGAP;
    w = plan.total + 28;
  }
  const fullH = fullLeaves.length * (NODE_H + VGAP);
  if (fullLeaves.length) w = inner + 28; // 整行叶子撑满组宽
  return { item, w: Math.max(w, 190), h: 26 + 8 + gridH + (gridH && fullH ? VGAP : 0) + fullH + 14 };
}

let cursorY = 20;

/* 一站 = 中轴里程碑 + 两侧子线 + 主线上的毕业闸（可选） */
function stage(opts: {
  id: string;
  milestone: { kind: RMKind; title: string; domainId?: string };
  caption?: string;
  items: Item[];
  gate?: { domainId: string; checkId?: string; invCount: number };
}) {
  const top = cursorY;
  const orderStart = orderIds.length;

  /* 左右交替分列（偶数序 → 右，奇数序 → 左） */
  const cols: { L: Placed[]; R: Placed[] } = { L: [], R: [] };
  opts.items.forEach((it, i) => cols[i % 2 === 0 ? "R" : "L"].push(sizeOf(it)));

  const colH = (arr: Placed[]) => arr.reduce((a, b) => a + b.h, 0) + ITEM_GAP * Math.max(0, arr.length - 1);
  const colMax = Math.max(colH(cols.L), colH(cols.R), 120);
  const mcy = top + colMax / 2;

  const placeCol = (arr: Placed[], side: "L" | "R") => {
    let yy = mcy - colH(arr) / 2;
    arr.forEach((p) => {
      if (p.item.kind === "leaf") {
        const lf = p.item.leaf;
        pushNode({
          ...lf,
          variant: lf.variant ?? "pale",
          checkable: MASTERABLE.has(lf.kind),
          x: side === "L" ? LEFT_X1 - p.w : RIGHT_X0,
          y: Math.round(yy),
          w: p.w,
          h: NODE_H,
        });
      } else {
        const g = p.item;
        const gx = side === "L" ? LEFT_X1 - p.w : RIGHT_X0;
        const gy = Math.round(yy);
        groups.push({ id: g.id, title: g.title, x: gx, y: gy, w: p.w, h: p.h });
        groupMap.set(g.id, groups[groups.length - 1]);
        id2anchor.set(g.id, { x: gx, y: gy, w: p.w, h: p.h });
        let iy = gy + 34;
        const gridLeaves = g.leaves.filter((l) => !l.full);
        const fullLeaves = g.leaves.filter((l) => l.full);
        if (gridLeaves.length) {
          /* 与 sizeOf 用同一常量内宽规划，避免浮点往返导致列数不一致 */
          const plan = planGrid(gridLeaves.map((l) => l.title), SIDE_W - 28);
          const x0 = gx + 14 + Math.max(0, (p.w - 28 - plan.total) / 2);
          gridLeaves.forEach((lf, i) => {
            const c = i % plan.cols;
            const r = Math.floor(i / plan.cols);
            const shift = plan.colW.slice(0, c).reduce((a, b) => a + b, 0) + c * VGAP;
            pushNode({
              ...lf,
              variant: lf.variant ?? "pale",
              checkable: MASTERABLE.has(lf.kind),
              rowTitle: g.title,
              x: Math.round(x0 + shift),
              y: Math.round(iy + r * (NODE_H + VGAP)),
              w: plan.colW[c],
              h: NODE_H,
            });
          });
          iy += Math.ceil(gridLeaves.length / plan.cols) * NODE_H + (Math.ceil(gridLeaves.length / plan.cols) - 1) * VGAP + VGAP;
        }
        fullLeaves.forEach((lf) => {
          pushNode({ ...lf, variant: lf.variant ?? "plain", checkable: MASTERABLE.has(lf.kind), rowTitle: g.title, x: gx + 14, y: Math.round(iy), w: p.w - 28, h: NODE_H });
          iy += NODE_H + VGAP;
        });
      }
      /* 分支线：里程碑 → 条目锚点 */
      branches.push({ from: opts.id, to: p.item.kind === "leaf" ? p.item.leaf.id : p.item.id, side });
      yy += p.h + ITEM_GAP;
    });
  };
  placeCol(cols.R, "R");
  placeCol(cols.L, "L");

  /* 中轴里程碑 */
  nodes.push({
    id: opts.id,
    kind: opts.milestone.kind,
    title: opts.milestone.title,
    caption: opts.caption,
    domainId: opts.milestone.domainId,
    checkable: false,
    variant: "bright",
    x: CX - MS_W / 2,
    y: Math.round(mcy - MS_H / 2),
    w: MS_W,
    h: MS_H,
  });
  nodeMap.set(opts.id, nodes[nodes.length - 1]);
  id2anchor.set(opts.id, { x: CX - MS_W / 2, y: Math.round(mcy - MS_H / 2), w: MS_W, h: MS_H });

  /* 阅读顺序 = 教学顺序：里程碑 → 各子主题行按 DOMAIN_ROWS 声明序展开（组→叶子原序）→ 毕业闸。
     与几何放置解耦：左右交替分列只影响位置，不影响「下一个」的走向。 */
  const itemIds = opts.items.flatMap((it) =>
    it.kind === "leaf" ? [it.leaf.id] : it.leaves.map((l) => l.id),
  );
  orderIds.splice(orderStart, 0, opts.id, ...itemIds, ...(opts.gate ? [`${opts.id}-gate`] : []));
  spineChain.push(opts.id);

  /* 毕业闸：卡在主线上 */
  if (opts.gate) {
    const gy = Math.round(top + colMax + 40);
    pushNode({
      id: `${opts.id}-gate`,
      kind: "checkpoint",
      title: `毕业自检 · 不变量 ×${opts.gate.invCount}`,
      domainId: opts.gate.domainId,
      checkId: opts.gate.checkId,
      checkable: true,
      variant: "gray",
      x: CX - GATE_W / 2,
      y: gy,
      w: GATE_W,
      h: NODE_H,
    });
    spineChain.push(`${opts.id}-gate`);
    cursorY = gy + NODE_H + STAGE_GAP;
  } else {
    cursorY = top + colMax + STAGE_GAP;
  }
}

/* ---------- 域内学习顺序：子主题分组（概念名须与 framework.ts 一致） ---------- */

const DOMAIN_ROWS: Record<string, { title: string; concepts: string[] }[]> = {
  D1: [
    { title: "契约思维：接口是承诺", concepts: ["统一响应模型", "错误码体系"] },
    { title: "安全地演进：只加不改", concepts: ["版本化", "Schema 前向 / 后向兼容"] },
    { title: "健壮的输入", concepts: ["入参声明式校验", "幂等键", "分页"] },
    { title: "缓存也是契约", concepts: ["HTTP 缓存语义"] },
    { title: "怎么通信 · 同步选一种", concepts: ["通信范式选择"] },
    { title: "怎么通信 · 异步的消息语义", concepts: ["消息投递语义"] },
    { title: "机器可读与机器验证", concepts: ["OpenAPI", "契约测试"] },
  ],
  D2: [
    { title: "先看见问题", concepts: ["竞态条件"] },
    { title: "数据库给的答案", concepts: ["事务与隔离级别", "乐观锁 · 悲观锁", "唯一约束"] },
    { title: "应用层的答案", concepts: ["幂等 token", "状态机"] },
    { title: "跨进程互斥", concepts: ["分布式锁"] },
    { title: "跨服务的一致性", concepts: ["分布式事务与 Saga"] },
    { title: "后台的活：定时任务", concepts: ["定时任务与调度"] },
  ],
  D3: [
    { title: "先建模：实体与两类特殊值", concepts: ["数据建模", "金额与精度", "时间与时区"] },
    { title: "安全地变更", concepts: ["迁移版本化", "expand-contract"] },
    { title: "日常状态", concepts: ["软删除", "审计字段"] },
    { title: "状态放哪：进程外", concepts: ["无状态与状态外置"] },
    { title: "读得快：索引", concepts: ["索引与查询计划"] },
    { title: "装得下：复制与分片", concepts: ["复制与分片"] },
    { title: "两个系统的一致性", concepts: ["缓存一致性", "事件发件箱（outbox）"] },
    { title: "流与批：数据管道", concepts: ["流处理与批处理"] },
    { title: "数据的生老病死", concepts: ["数据生命周期"] },
    { title: "最后的兜底", concepts: ["备份与恢复"] },
  ],
  D4: [
    { title: "先给一切上闹钟", concepts: ["超时预算"] },
    { title: "失败后的反应", concepts: ["重试 · 退避 · 抖动", "熔断"] },
    { title: "隔离与自救", concepts: ["舱壁隔离", "降级", "背压"] },
    { title: "挡住洪流", concepts: ["限流与配额"] },
    { title: "知道极限在哪", concepts: ["容量规划与压测"] },
    { title: "演练：让弹性是真的", concepts: ["故障演练（混沌工程）"] },
    { title: "入口与排空", concepts: ["负载均衡与网关", "优雅停机与健康检查"] },
    { title: "放宽正确性换可用", concepts: ["最终一致性"] },
  ],
  D5: [
    { title: "三支柱，不可互替", concepts: ["结构化日志", "traceId · spanId（OpenTelemetry）", "RED 指标"] },
    { title: "工程化", concepts: ["采样", "告警分级"] },
    { title: "从指标到目标", concepts: ["SLO 与错误预算"] },
    { title: "闭环：从故障学习", concepts: ["故障复盘"] },
    { title: "看到系统边界", concepts: ["前端异常上报"] },
  ],
  D6: [
    { title: "先分清两件事", concepts: ["认证 vs 授权"] },
    { title: "授权怎么做", concepts: ["RBAC · ABAC", "最小权限"] },
    { title: "凭证与会话", concepts: ["密码与凭证存储", "会话与令牌管理"] },
    { title: "技术攻击面", concepts: ["注入类漏洞族", "对象级越权（IDOR）"] },
    { title: "业务逻辑的攻击面", concepts: ["业务逻辑与防滥用"] },
    { title: "加密边界", concepts: ["传输与静态加密"] },
    { title: "资产与痕迹", concepts: ["密钥管理", "脱敏", "审计日志"] },
  ],
  D7: [
    { title: "把系统切开", concepts: ["模块边界", "依赖规则（单向 · 无环）"] },
    { title: "谁对代码负责", concepts: ["代码所有权（CODEOWNERS）"] },
    { title: "让知识流动：评审", concepts: ["代码评审（Code Review）"] },
    { title: "让约定自动存活", concepts: ["规范自动化（lint · 门禁）", "测试金字塔", "CI/CD"] },
    { title: "安全地放出", concepts: ["功能开关与灰度发布"] },
    { title: "环境一致性", concepts: ["环境一致性"] },
    { title: "借来的复杂度", concepts: ["第三方依赖管理"] },
    { title: "欠下的债", concepts: ["技术债管理"] },
    { title: "旧接口怎么退场", concepts: ["弃用与下线流程"] },
    { title: "组织与系统", concepts: ["康威定律与团队边界"] },
    { title: "值班与升级", concepts: ["值班与升级路径"] },
    { title: "写下来", concepts: ["文档与 Runbook", "ADR 架构决策记录"] },
  ],
};

function conceptLeaves(domainId: string, names: string[]): Leaf[] {
  return names.map((name) => {
    const i = domains.find((d) => d.id === domainId)!.concepts.indexOf(name);
    return { id: `${domainId.toLowerCase()}-c${i}`, kind: "concept" as const, title: name, domainId };
  });
}

/* 自检题归属（正确项所在域）：七域全覆盖 */
const GATE_CHECK: Record<string, string> = {
  D1: "check4",
  D2: "check1",
  D3: "check5",
  D4: "check6",
  D5: "check7",
  D6: "check3",
  D7: "check8",
};

const NAT_NAME: Record<string, string> = Object.fromEntries(natures.map((n) => [n.id, n.name]));

/* ---------- 站 0：起点 ---------- */

stage({
  id: "intro",
  milestone: { kind: "intro", title: "后端是什么" },
  caption: "五个本性 → 七个治理域",
  items: [
    {
      kind: "group",
      id: "g-natures",
      title: "五个本性",
      leaves: natures.map((n) => ({ id: n.id.toLowerCase(), kind: "nature" as const, title: n.name, domainId: n.id })),
    },
    {
      kind: "group",
      id: "g-layers",
      title: "三层知识模型",
      leaves: [
        ...layers.map((l) => ({ id: l.id.toLowerCase(), kind: "layer" as const, title: `${l.id} ${l.name}` })),
        {
          id: "lens-note",
          kind: "lens-note" as const,
          title: "通用框架 = L1 + L2 · 学新语言 ≈ 只替换 L3 映射表",
          variant: "plain" as const,
          full: true,
        },
      ],
    },
    {
      kind: "group",
      id: "g-method",
      title: "怎么用这张图学",
      leaves: learningSteps.map((s, i) => ({ id: `m${i + 1}`, kind: "method-step" as const, title: s.title, code: s.step })),
    },
    { kind: "leaf", leaf: { id: "c2", kind: "check", title: "自检 · 「熔断」属于哪一层", checkId: "check2", variant: "gray" } },
  ],
});

/* ---------- 站 1–7：七个治理域（按学习顺序） ---------- */

domains.forEach((d) => {
  const bid = d.id.toLowerCase();
  const rows = DOMAIN_ROWS[d.id] ?? [];
  const covered = new Set(rows.flatMap((r) => r.concepts));
  const missing = d.concepts.filter((c) => !covered.has(c));
  if (missing.length) rows.push({ title: "其他", concepts: missing });

  const items: Item[] = rows.map((r, i) =>
    r.concepts.length >= 2
      ? { kind: "group", id: `g-${bid}-${i}`, title: r.title, leaves: conceptLeaves(d.id, r.concepts) }
      : { kind: "leaf", leaf: conceptLeaves(d.id, r.concepts)[0] },
  );

  stage({
    id: bid,
    milestone: { kind: "domain-header", title: d.name, domainId: d.id },
    caption: `源 ${d.sources.join(" / ")} · ${d.sources.map((s) => NAT_NAME[s]).join(" / ")}`,
    items,
    gate: { domainId: d.id, checkId: GATE_CHECK[d.id], invCount: d.invariants.length },
  });
});

/* ---------- 站 8：出口 ---------- */

stage({
  id: "exit",
  milestone: { kind: "decision", title: "学完之后" },
  caption: "下一步",
  items: [
    { kind: "leaf", leaf: { id: "decision", kind: "decision", title: "判断新实践", variant: "purple" } },
    { kind: "leaf", leaf: { id: "synthesis", kind: "synthesis", title: "校准全景", variant: "purple" } },
  ],
});

/* ---------- 导出 ---------- */

const canvasH = cursorY - STAGE_GAP + 30;

export { nodes, groups, branches, spineChain, orderIds };

export const checkableCount = nodes.filter((n) => n.checkable).length;

export const canvas = { width: CANVAS_W, height: canvasH };

/* 渲染层几何 */
export const SPINE = { cx: CX, msW: MS_W, msH: MS_H };

export function nodeById(id: string): RMNode | undefined {
  return nodeMap.get(id);
}

export function anchorById(id: string): { x: number; y: number; w: number; h: number } | undefined {
  return id2anchor.get(id);
}
