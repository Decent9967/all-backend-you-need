/* 审计：notes.ts 期望 materials ↔ 浏览器实际渲染 一致性（sweep-materials.json 由 Playwright 产出）。
   用法：先跑 Playwright 扫描存 JSON，再 node scripts/verify-material-links.mjs */
import { readFileSync } from "node:fs";

const src = readFileSync("data/notes.ts", "utf8");

// 提取每条笔记的 materials（正则刻意不含反斜杠，避免工具链转义问题）
const expected = {};
{
  const noteRe = /"(D[0-9])[|]([^"]+)": [{]([\s\S]*?)[\n]  [}],/g;
  let m;
  while ((m = noteRe.exec(src))) {
    const mats = [];
    const matRe = /[{] title: "([^"]+)"(?:, url: "(https?:[^"]+)")? [}]/g;
    let mm;
    while ((mm = matRe.exec(m[3]))) mats.push({ title: mm[1], url: mm[2] ?? null });
    expected[`${m[1]}|${m[2]}`] = mats;
  }
}

const sweep = JSON.parse(readFileSync("../sweep-materials.json", "utf8"));
const errs = [];
let links = 0, plains = 0;
for (const n of sweep.notes) {
  if (n.missing) { errs.push(`抽屉未渲染: ${n.id}`); continue; }
  const exp = expected[`${n.domain}|${n.title}`];
  if (!exp) { errs.push(`笔记缺失: ${n.domain}|${n.title}`); continue; }
  if ((n.items?.length ?? 0) !== exp.length) {
    errs.push(`条数不符 ${n.domain}|${n.title}: 期望 ${exp.length} 实际 ${n.items?.length ?? 0}`);
    continue;
  }
  for (const e of exp) {
    const got = n.items.find(i => i.text === e.title);
    if (!got) { errs.push(`标题未渲染: ${n.domain}|${n.title} · ${e.title}`); continue; }
    if (e.url) {
      if (got.plain || got.href !== e.url) errs.push(`链接不符: ${e.title} 期望 ${e.url} 实际 ${got.href}`);
      else links++;
    } else {
      if (!got.plain) errs.push(`应为纯文本: ${e.title}`);
      else plains++;
    }
  }
}
const expWith = Object.values(expected).filter(a => a.length).length;
console.log(`概念节点: ${sweep.concepts}，带材料的抽屉: ${sweep.withMaterials}（期望 ${expWith}）`);
console.log(`渲染链接 ${links} 条 / 纯文本 ${plains} 条`);
console.log(errs.length ? `发现 ${errs.length} 个问题:\n` + errs.join("\n") : "✅ 全部一致");
process.exit(errs.length ? 1 : 0);
