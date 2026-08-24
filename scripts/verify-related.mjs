/* 审计：notes.ts 里所有 related 标题必须能解析到 framework.ts 的真实概念 */
import { readFileSync } from "node:fs";

const notes = readFileSync("data/notes.ts", "utf8");
const fw = readFileSync("data/framework.ts", "utf8");

// 收集全部概念名（framework.ts 各域 concepts 数组里的字符串）
const concepts = new Set();
{
  const re = /concepts: \[([\s\S]*?)\]/g;
  let m;
  while ((m = re.exec(fw))) {
    for (const t of m[1].match(/"([^"]+)"/g) ?? []) concepts.add(t.slice(1, -1));
  }
}

const noteRe = /"(D[0-9])[|]([^"]+)": [{]([\s\S]*?)[\n]  [}],/g;
const errs = [];
let m, total = 0;
while ((m = noteRe.exec(notes))) {
  const rel = (m[3].match(/related: [\[]([^\]]*)[\]]/) || [, ""])[1];
  for (const raw of rel.split(",")) {
    const t = raw.trim().replace(/^"|"$/g, "");
    if (!t) continue;
    total++;
    if (!concepts.has(t)) errs.push(`${m[1]}|${m[2]} 的 related 悬空：${t}`);
  }
}
console.log(`概念名池 ${concepts.size} 个，related 引用 ${total} 条`);
console.log(errs.length ? `发现 ${errs.length} 个悬空:\n` + errs.join("\n") : "✅ related 全部可解析");
process.exit(errs.length ? 1 : 0);
