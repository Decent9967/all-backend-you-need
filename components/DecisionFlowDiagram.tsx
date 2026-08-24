export default function DecisionFlowDiagram() {
  return (
    <svg
      viewBox="0 0 1120 350"
      role="img"
      aria-label="判断流程：一项实践若由五个本性之一推导而来，则跨语言必做；否则是实现层偏好，按生态选型"
      className="diagram"
    >
      <title>「要不要做」的判断流程</title>
      <defs>
        <marker
          id="dec-arrow"
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L8,4 L0,8 z" className="marker-ink" />
        </marker>
      </defs>

      {/* 起点 */}
      <g className="df-box">
        <rect x={40} y={72} width={168} height={76} rx={4} />
        <text x={124} y={104} textAnchor="middle" className="df-text">
          遇到一项实践
        </text>
        <text x={124} y={126} textAnchor="middle" className="df-text">
          或一条规范
        </text>
      </g>

      <line
        x1={208}
        y1={110}
        x2={306}
        y2={110}
        className="df-arrow"
        markerEnd="url(#dec-arrow)"
      />

      {/* 判断菱形 */}
      <polygon
        points="318,110 430,42 542,110 430,178"
        className="df-diamond"
      />
      <text x={430} y={104} textAnchor="middle" className="df-q">
        是否由五个本性
      </text>
      <text x={430} y={126} textAnchor="middle" className="df-q">
        之一推导而来？
      </text>

      {/* 是 → 右侧 */}
      <line
        x1={542}
        y1={110}
        x2={634}
        y2={110}
        className="df-arrow"
        markerEnd="url(#dec-arrow)"
      />
      <text x={588} y={100} textAnchor="middle" className="df-branch-yes">
        是
      </text>
      <g className="df-box df-box-yes">
        <rect x={636} y={64} width={232} height={92} rx={4} />
        <text x={752} y={94} textAnchor="middle" className="df-yes-title">
          是 —— 原理层 / 范式层
        </text>
        <text x={752} y={118} textAnchor="middle" className="df-text">
          跨语言必做
        </text>
        <text x={752} y={140} textAnchor="middle" className="df-text">
          进入脚手架的默认集
        </text>
      </g>

      {/* 否 → 下方 */}
      <line
        x1={430}
        y1={178}
        x2={430}
        y2={232}
        className="df-arrow"
        markerEnd="url(#dec-arrow)"
      />
      <text x={448} y={212} className="df-branch-no">
        否
      </text>
      <g className="df-box">
        <rect x={310} y={234} width={240} height={80} rx={4} />
        <text x={430} y={264} textAnchor="middle" className="df-no-title">
          否 —— 实现层偏好
        </text>
        <text x={430} y={288} textAnchor="middle" className="df-text-soft">
          按生态选型，用到再学
        </text>
      </g>

      {/* 右侧注记 */}
      <text x={912} y={96} className="df-aside">
        判断标准回答「要不要做」，
      </text>
      <text x={912} y={120} className="df-aside">
        不回答「怎么做」——
      </text>
      <text x={912} y={144} className="df-aside">
        怎么做交给各语言的生态。
      </text>
    </svg>
  );
}
