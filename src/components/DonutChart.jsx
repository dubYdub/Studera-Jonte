export default function DonutChart({ stats }) {
  const { total, know, review } = stats
  const unkn = Math.max(0, total - know - review)
  const knowPct  = total > 0 ? (know   / total) * 100 : 0
  const reviewPct = total > 0 ? (review / total) * 100 : 0
  const displayPct = Math.round(knowPct)

  return (
    <div className="donut-wrap">
      <div
        className="donut-ring"
        style={{
          background: `conic-gradient(
            #39ff14 0% ${knowPct}%,
            #ff6b35 ${knowPct}% ${knowPct + reviewPct}%,
            #2e2400 ${knowPct + reviewPct}% 100%
          )`
        }}
      >
        <div className="donut-hole">
          <span className="donut-pct">{displayPct}%</span>
          <span className="donut-sub">{know}/{total}</span>
        </div>
      </div>
      <div className="donut-legend">
        <div className="legend-row">
          <span className="leg-dot" style={{ color: '#39ff14' }}>■</span>
          <span>KAN</span>
          <span className="leg-n">{know}</span>
        </div>
        <div className="legend-row">
          <span className="leg-dot" style={{ color: '#ff6b35' }}>■</span>
          <span>OVA MER</span>
          <span className="leg-n">{review}</span>
        </div>
        <div className="legend-row">
          <span className="leg-dot" style={{ color: '#3a3000' }}>■</span>
          <span>EJ KLAR</span>
          <span className="leg-n">{unkn}</span>
        </div>
      </div>
    </div>
  )
}
