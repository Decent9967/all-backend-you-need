# 贡献指南

欢迎纠错（事实/链接失效/错别字）、补概念、补一手材料。

## 本地开发

```bash
npm install
npm run dev          # http://localhost:3000
```

## 提 PR 前请跑审计

```bash
npm run build                        # 含类型检查，必须通过
node scripts/verify-related.mjs      # 相关概念引用零悬空
node scripts/content-audit.mjs       # 笔记完整度（def/坑点/材料齐全）
node scripts/check-material-urls.mjs # 外链存活探测（走外网，本机手动跑）
```

CI（`.github/workflows/ci.yml`）会重跑前三项。

## 内容约定

- **按域学，不按技术学**：新概念先回答「属于哪个域、违反哪条不变量」，
  答不上来的主题去 `data/scope.ts` 范围登记表走流程，不散落在正文
- **加概念三步**：`framework.ts` 加概念 → `roadmap.ts` 的 `DOMAIN_ROWS`
  给它一行归属 → `notes.ts` 补笔记（画布布局自动重排）
- **不变量句式**：换任何语言都成立的断言，不出现具体工具名
- **外链**：只挂一手来源（规范原文/官方文档/原作者文章），写入前先探测 200；
  无公开电子版的书留纯文本
- **引用他人材料只给链接不复制正文**

## PR 期望

- build 通过、审计全绿
- commit 信息用中文，说清改了什么、为什么改
- 内容改动请在 PR 描述里给出出处链接
