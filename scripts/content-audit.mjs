/* 读者视角内容体检：字段完整性、长度分布、术语一致性 */
import { readFileSync } from "node:fs";

const src = readFileSync("data/notes.ts", "utf8");
const noteRe = /"(D[0-9])[|]([^"]+)": [{]([\s\S]*?)[\n]  [}],/g;
const notes = [];
let m;
while ((m = noteRe.exec(src))) {
  const body = m[3];
  const grab = (key) => {
    const r = new RegExp(`${key}: "([^"]+)"`).exec(body);
    return r ? r[1] : null;
  };
  const points = [...body.matchAll(/^ +"(.+)",?$/gm)].map(x => x[1]);
  const hasPitfall = /pitfall:/.test(body);
  const related = (body.match(/related: \[([^\]]*)\]/) || [, ""])[1].split(",").filter(Boolean).length;
  const matCount = (body.match(/title: "/g) || []).length;
  notes.push({
    key: `${m[1]}|${m[2]}`,
    def: grab("def"), defLen: (grab("def") || "").length,
    points: points.length, pitfall: hasPitfall, related, mats: matCount,
  });
}

const n = notes.length;
const med = (a) => a.sort((x, y) => x - y)[Math.floor(a.length / 2)];
console.log(`笔记总数 ${n}`);
console.log(`points 数量: min ${Math.min(...notes.map(x => x.points))} / 中位 ${med(notes.map(x => x.points))} / max ${Math.max(...notes.map(x => x.points))}`);
console.log(`def 长度: min ${Math.min(...notes.map(x => x.defLen))} / 中位 ${med(notes.map(x => x.defLen))} / max ${Math.max(...notes.map(x => x.defLen))}`);
console.log(`缺 pitfall: ${notes.filter(x => !x.pitfall).length} 条 -> ${notes.filter(x => !x.pitfall).map(x => x.key).join(" ; ")}`);
console.log(`缺 related: ${notes.filter(x => x.related === 0).length} 条`);
console.log(`缺 materials: ${notes.filter(x => x.mats === 0).length} 条`);
console.log(`related=1 条: ${notes.filter(x => x.related === 1).length} 条`);
const longDefs = notes.filter(x => x.defLen > 60);
console.log(`def>60字: ${longDefs.length} 条`);
longDefs.forEach(x => console.log(`  [${x.key}] ${x.defLen}字`));

// 术语一致性（正文全部文本里统计）
const allText = src;
for (const [a, b] of [["调用方", "客户端"], ["数据库", "DB"], ["下游", "依赖方"], ["先检查后写入", "check-then-act"]]) {
  const ca = (allText.split(a).length - 1), cb = (allText.split(b).length - 1);
  console.log(`术语: 「${a}」${ca} 次 vs 「${b}」${cb} 次`);
}
