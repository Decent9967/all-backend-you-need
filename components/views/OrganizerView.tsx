import { chapters, organizers } from "@/data/sitemap";

export default function OrganizerView({ chapter }: { chapter: number }) {
  const c = chapters[chapter - 1];
  const o = organizers[chapter];
  return (
    <div className="reveal organizer">
      <nav className="chapter-strip" aria-label="全书章节">
        {chapters.map((cc, i) => (
          <span
            key={cc.label}
            className={`cs-cell${i + 1 === chapter ? " cs-now" : ""}`}
          >
            <span className="cs-num">{String(i + 1).padStart(2, "0")}</span>
            {cc.label}
          </span>
        ))}
      </nav>
      <p className="eyebrow">{c.num} · 先行组织者</p>
      <h2 className="view-title">{o.question}</h2>
      <p className="org-anchor">{o.anchor}</p>
      <div className="org-route">
        <h3 className="mini-label">本章路线</h3>
        <ol className="path">
          {o.route.map((r, i) => (
            <li key={r}>
              <span className="path-dot">{String(i + 1).padStart(2, "0")}</span>
              <span className="path-name">{r}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
