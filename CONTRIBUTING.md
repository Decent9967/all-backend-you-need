# Contributing

Thanks for helping improve this knowledge map! Bug fixes (facts, broken
links, typos), new concepts and better primary sources are all welcome.

**中文摘要在文末 / Chinese summary at the bottom.**

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

## Run the audits before opening a PR

```bash
npm run build                        # includes type checking — must pass
node scripts/verify-related.mjs      # related-concept references resolve
node scripts/content-audit.mjs       # note completeness (def/pitfall/materials)
node scripts/check-material-urls.mjs # link liveness (hits the network — run locally)
```

CI re-runs the first three on every push and pull request.

## Content conventions

- **Learn by domain, not by technology.** Every new concept must answer
  "which domain does it belong to, which invariant does it violate?" If it
  can't, propose it in the scope registry (`data/scope.ts`) instead.
- **Adding a concept takes three steps:** add it in `framework.ts` → give it
  a row in `DOMAIN_ROWS` (`data/roadmap.ts`) → write its note in
  `data/notes.ts`. The canvas layout re-flows automatically.
- **Invariants** are assertions that hold in any language — no tool names.
- **External links:** primary sources only (specs, official docs, original
  authors); probe for HTTP 200 before committing. Books without a public
  digital edition stay as plain text. Link to others' material — never copy it.
- **Out-of-scope topics** go to the scope registry with a revisit condition,
  not into the main content.

## Pull requests

- Build passes and audits are green
- Commit messages in Chinese are fine — just say what changed and why
- For content changes, include source links in the PR description

## Releases

Versioning: `vMAJOR.MINOR.PATCH` — MAJOR for structural or interaction
redesigns, MINOR for new concepts or domains, PATCH for fixes.

```bash
# bump package.json version, commit, then:
git tag vX.Y.Z
git push origin main --tags
gh release create vX.Y.Z --title "vX.Y.Z — short summary" --notes-file notes.md
```

Every push to `main` runs CI and redeploys the live site automatically.

## 中文摘要

- PR 前跑：`npm run build` + `verify-related` + `content-audit`；
  外链探测 `check-material-urls` 走外网，本机手动跑
- 内容约定：按域学不按技术学；加概念三步
  （`framework.ts` → `DOMAIN_ROWS` → `notes.ts`）；不变量不写工具名；
  外链只挂一手来源且先探测 200；范围外主题进 `data/scope.ts`
- 版本语义：结构大改 MAJOR / 加概念 MINOR / 修错 PATCH；
  推 main 自动 CI + 重新部署
