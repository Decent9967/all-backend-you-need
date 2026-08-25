import type { ComponentType } from "react";
import type { Domain } from "@/data/framework";
import { readingList } from "@/data/framework";
import PillarsDiagram from "@/components/PillarsDiagram";
import BuildBar from "@/components/BuildBar";
import { useI18n } from "@/components/I18n";
import { steps } from "@/data/sitemap";
import D1ContractDiagram from "@/components/minis/D1ContractDiagram";
import D2RaceDiagram from "@/components/minis/D2RaceDiagram";
import D3ExpandContractDiagram from "@/components/minis/D3ExpandContractDiagram";
import D4BreakerDiagram from "@/components/minis/D4BreakerDiagram";
import D6TrustBoundaryDiagram from "@/components/minis/D6TrustBoundaryDiagram";
import D7DependencyDiagram from "@/components/minis/D7DependencyDiagram";

const MINIS: Record<string, ComponentType<{ stage?: number }>> = {
  D1: D1ContractDiagram,
  D2: D2RaceDiagram,
  D3: D3ExpandContractDiagram,
  D4: D4BreakerDiagram,
  D6: D6TrustBoundaryDiagram,
  D7: D7DependencyDiagram,
};

export default function DomainView({
  domain,
  stage,
  onAdvance,
}: {
  domain: Domain;
  stage: number;
  onAdvance: () => void;
}) {
  const { t } = useI18n();
  const Mini = MINIS[domain.id];
  const captions = steps.find((s) => s.id === domain.id.toLowerCase())?.stages;
  const reading = readingList.find((r) => r.domain === domain.id);
  return (
    <div className="reveal domain-view">
      <header className="domain-view-head">
        <span className="domain-view-id">{domain.id}</span>
        <h2 className="domain-view-name">{domain.name}</h2>
        <span className="domain-view-en">{domain.en}</span>
        <span className="domain-view-src">源 {domain.sources.join(" · ")}</span>
      </header>

      <div className="domain-cols">
        <div className="domain-col-left">
          <section className="domain-block">
            <h3 className="mini-label">{t.dvProblem}</h3>
            <p className="domain-thesis">{domain.problem}</p>
          </section>
          <section className="domain-block">
            <h3 className="mini-label">{t.dvConcepts}</h3>
            <ul className="chips">
              {domain.concepts.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>
        </div>
        <div className="domain-col-right">
          {Mini ? (
            <section className="domain-block">
              <h3 className="mini-label">{t.dvMap}</h3>
              <div className="figure figure-tight">
                <Mini stage={stage} />
                {captions ? (
                  <BuildBar captions={captions} stage={stage} onAdvance={onAdvance} />
                ) : null}
              </div>
            </section>
          ) : null}
          {domain.id === "D5" ? (
            <section className="domain-block">
              <h3 className="mini-label">{t.dvPillars}</h3>
              <div className="figure figure-tight">
                <PillarsDiagram />
              </div>
            </section>
          ) : null}
          <section className="domain-block domain-invariant-panel">
            <h3 className="mini-label mini-label-accent">{t.dvInvariants}</h3>
            <ul className="domain-invariant-list">
              {domain.invariants.map((inv) => (
                <li key={inv}>{inv}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {domain.cross ? (
        <footer className="domain-cross-note">
          <span className="mini-label">{t.dvCross}</span>
          <span>{domain.cross}</span>
        </footer>
      ) : null}

      {reading ? (
        <footer className="domain-cross-note">
          <span className="mini-label">{t.dvReading}</span>
          <ul className="read-list">
            {reading.materials.map((m) =>
              m.url ? (
                <li key={m.title}>
                  <a className="note-material" href={m.url} target="_blank" rel="noopener noreferrer">
                    {m.title} ↗
                  </a>
                </li>
              ) : (
                <li key={m.title}>
                  <span className="note-material plain">{m.title}</span>
                </li>
              ),
            )}
          </ul>
        </footer>
      ) : null}
    </div>
  );
}
