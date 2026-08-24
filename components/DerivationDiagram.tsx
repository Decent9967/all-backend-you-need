import { natures, domains, derivationEdges } from "@/data/framework";

type Props = {
  activeNature?: string | null;
  onNatureClick?: (id: string) => void;
  onDomainClick?: (id: string) => void;
  stage?: number; // 分步搭建：0 = 仅本性；1–5 = 逐个揭示 N1–N5 推导的域；Infinity = 全部
};

const NATURE_Y = [56, 150, 244, 338, 432];
const DOMAIN_Y = [56, 124, 192, 260, 328, 396, 464];
const NH = 76;
const DH = 56;
const NX = 40;
const NW = 300;
const DX = 780;
const DW = 300;
const MID = 560;

export default function DerivationDiagram({
  activeNature = null,
  onNatureClick,
  onDomainClick,
  stage = Infinity,
}: Props) {
  const related = new Set(
    derivationEdges.filter((e) => e[0] === activeNature).map((e) => e[1])
  );
  const natureStage = (id: string) => Number(id.slice(1));
  const revealedDomains = new Set(
    derivationEdges
      .filter((e) => stage >= natureStage(e[0]))
      .map((e) => e[1])
  );

  return (
    <svg
      viewBox="0 0 1120 560"
      role="img"
      aria-label="推导图：五个本性分别推导出对应的治理域；可点击本性高亮其推导的域，点击域进入该域的图幅"
      className="diagram"
    >
      <title>从五个本性到七个治理域的推导关系</title>

      <text x={NX} y={28} className="dg-colhead">
        五个本性 · NATURES
      </text>
      <text x={DX} y={28} className="dg-colhead">
        七个治理域 · DOMAINS
      </text>
      <text x={MID} y={292} textAnchor="middle" className="dg-mid">
        由本性推导，而非行业惯例
      </text>

      {derivationEdges.map(([from, to]) => {
        const ni = natures.findIndex((n) => n.id === from);
        const di = domains.findIndex((d) => d.id === to);
        const y1 = NATURE_Y[ni] + NH / 2;
        const y2 = DOMAIN_Y[di] + DH / 2;
        const hot = from === activeNature;
        const built = stage >= natureStage(from);
        const dim = (activeNature !== null && !hot) || !built;
        return (
          <g
            key={`${from}-${to}`}
            className={`dg-edge${hot ? " dg-hot" : ""}${dim ? " dg-dim" : ""}`}
          >
            <path
              d={`M ${NX + NW} ${y1} C ${MID} ${y1}, ${MID} ${y2}, ${DX} ${y2}`}
            />
            <circle cx={DX} cy={y2} r={3} />
          </g>
        );
      })}

      {natures.map((n, i) => {
        const dim = activeNature !== null && n.id !== activeNature;
        return (
          <g
            key={n.id}
            className={`dg-node dg-click${dim ? " dg-dim" : ""}${
              n.id === activeNature ? " dg-hot" : ""
            }`}
            onClick={() => onNatureClick?.(n.id)}
            tabIndex={onNatureClick ? 0 : undefined}
            role={onNatureClick ? "button" : undefined}
            aria-label={onNatureClick ? `${n.id} ${n.name}` : undefined}
            onKeyDown={(e) => {
              if (onNatureClick && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                onNatureClick(n.id);
              }
            }}
          >
            <rect x={NX} y={NATURE_Y[i]} width={NW} height={NH} rx={4} />
            <text x={NX + 16} y={NATURE_Y[i] + 27} className="dg-id">
              {n.id}
            </text>
            <text x={NX + 44} y={NATURE_Y[i] + 27} className="dg-tag">
              NATURE
            </text>
            <text x={NX + 16} y={NATURE_Y[i] + 49} className="dg-name">
              {n.name}
            </text>
            <text x={NX + 16} y={NATURE_Y[i] + 67} className="dg-desc">
              {n.desc}
            </text>
          </g>
        );
      })}

      {domains.map((d, i) => {
        const dim = (activeNature !== null && !related.has(d.id)) || !revealedDomains.has(d.id);
        const hot = related.has(d.id);
        return (
          <g
            key={d.id}
            className={`dg-node dg-click${dim ? " dg-dim" : ""}${hot ? " dg-hot" : ""}`}
            onClick={() => onDomainClick?.(d.id)}
            tabIndex={onDomainClick ? 0 : undefined}
            role={onDomainClick ? "button" : undefined}
            aria-label={onDomainClick ? `${d.id} ${d.name}` : undefined}
            onKeyDown={(e) => {
              if (onDomainClick && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                onDomainClick(d.id);
              }
            }}
          >
            <rect x={DX} y={DOMAIN_Y[i]} width={DW} height={DH} rx={4} />
            <text x={DX + 16} y={DOMAIN_Y[i] + 26} className="dg-id">
              {d.id}
            </text>
            <text x={DX + 46} y={DOMAIN_Y[i] + 26} className="dg-tag">
              {d.en}
            </text>
            <text
              x={DX + DW - 16}
              y={DOMAIN_Y[i] + 26}
              textAnchor="end"
              className="dg-src"
            >
              ← {d.sources.join(" · ")}
            </text>
            <text x={DX + 16} y={DOMAIN_Y[i] + 47} className="dg-name">
              {d.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
