# ALL BACKEND YOU NEED · A Backend Governance Knowledge Framework

[![License](https://img.shields.io/github/license/Decent9967/all-backend-you-need)](./LICENSE)
[![CI](https://github.com/Decent9967/all-backend-you-need/actions/workflows/ci.yml/badge.svg)](https://github.com/Decent9967/all-backend-you-need/actions/workflows/ci.yml)
[![Deploy](https://github.com/Decent9967/all-backend-you-need/actions/workflows/deploy-pages.yml/badge.svg)](https://decent9967.github.io/all-backend-you-need/)

**[Open online →](https://decent9967.github.io/all-backend-you-need/)** | [简体中文（完整版）](./README.md)

An interactive learning roadmap (single-page Next.js app) that replicates the
visual language and knowledge organization of [roadmap.sh](https://roadmap.sh):
a hand-drawn canvas with a central milestone spine, sub-topic groups on both
sides, and a graduation gate at the end of every domain.

![Canvas overview](docs/images/preview-canvas.png)

## The idea: learn by domain, not by technology

Most backend roadmaps are tool checklists that expire with your stack. This
one derives **seven governance domains** from the five inescapable "natures"
of backend systems — serving an untrusted network, handling concurrency,
persisting state, depending on other systems, and evolving for years — and
states each domain's **invariants**: assertions that hold in any language,
any framework.

| Domain | Focus |
|---|---|
| D1 Contracts & APIs | Interfaces are promises; errors and versions are part of the contract |
| D2 Concurrency & Consistency | Races, state machines, isolation, locks, distributed transactions |
| D3 Data & State | Modeling, money/time, indexes, replication, safe migration |
| D4 Distributed Resilience | Timeouts, retries, circuit breakers, backpressure, graceful shutdown |
| D5 Observability | Structured logs, tracing, RED metrics, SLOs, alerting, postmortems |
| D6 Security | AuthN/AuthZ, secrets, injection, IDOR, least privilege |
| D7 Engineering Governance | Boundaries, code review, CI/CD, tech debt, on-call, ADRs |

## What each node gives you

- **84 concept nodes**, each a one-page note: one-line definition / why it
  exists / key points / common pitfalls / related concepts / curated primary
  sources — **106 verified external links** (RFCs, Google SRE, OWASP,
  martinfowler.com, PoEAA, 12-Factor, NIST …)
- **7 graduation gates**: recite the invariants from memory + one
  retrieval-practice quiz question per domain
- **Progress tracking**: three-state (learning / mastered) with localStorage
  persistence; keyboard navigation (← →, Esc, Ctrl+K search); shareable
  deep links (`#/d2-c0`) that scroll & flash the node on the canvas
- A **scope registry** of explicitly out-of-scope topics with revisit
  conditions — decisions are documented, not lost

## Quick start

```bash
npm install
npm run dev     # http://localhost:3000
```

## License

[MIT](./LICENSE)
