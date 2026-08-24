/* 维护脚本：探测 data/notes.ts 里全部「深入材料」链接是否仍可访问。
   用法：node scripts/check-material-urls.mjs（CI 或加链接后自查用） */
import { readFileSync } from "node:fs";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

const src = readFileSync(new URL("../data/notes.ts", import.meta.url), "utf8");
const urls = [...new Set([...src.matchAll(/, url: "(https?:[^"]+)"/g)].map((m) => m[1]))];

async function check(url) {
  const hit = async (ua) => {
    try {
      const r = await fetch(url, {
        ...(ua ? { headers: { "user-agent": ua, accept: "text/html,*/*" } } : {}),
        redirect: "follow",
        signal: AbortSignal.timeout(20000),
      });
      return String(r.status).startsWith("2") ? null : `HTTP ${r.status}`;
    } catch (e) {
      return String(e.cause?.code ?? e.name ?? e).slice(0, 60);
    }
  };
  // 个别站点（如 w3.org）反而拦截浏览器 UA，失败时用默认 UA 重试一次
  const first = await hit(UA);
  if (first === null) return null;
  return await hit();
}

let bad = 0;
const pool = 8;
let i = 0;
async function worker() {
  while (i < urls.length) {
    const u = urls[i++];
    const err = await check(u);
    if (err) { bad++; console.log(`FAIL ${err}  ${u}`); }
  }
}
await Promise.all(Array.from({ length: pool }, worker));
console.log(`${urls.length - bad}/${urls.length} links alive`);
process.exit(bad ? 1 : 0);
