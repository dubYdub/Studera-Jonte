export default function DonutChart({ stats, animated = false }) {
  const { total, know, review } = stats
  const unkn = Math.max(0, total - know - review)
  const knowPct = total > 0 ? (know / total) * 100 : 0
  const displayPct = Math.round(knowPct)
  const segmentCount = 20
  const filledSegments = Math.round((displayPct / 100) * segmentCount)

  return (
    <section className={`progress-panel${animated ? ' pulse' : ''}`} aria-label="Din progress">
      <div className="progress-main">
        <div className="progress-label">DIN PROGRESS</div>
        <div className="progress-meter-row">
          <div className="progress-segments" aria-hidden="true">
            {Array.from({ length: segmentCount }, (_, index) => (
              <span
                key={index}
                className={index < filledSegments ? 'filled' : ''}
              />
            ))}
          </div>
          <div className="progress-percent">{displayPct}%</div>
        </div>
      </div>
      <div className="progress-stats">
        <div className="progress-stat">
          <span className="stat-dot stat-know" />
          <span>KAN</span>
          <strong>{know}</strong>
        </div>
        <div className="progress-stat">
          <span className="stat-dot stat-rev" />
          <span>ÖVA MER</span>
          <strong>{review}</strong>
        </div>
        <div className="progress-stat">
          <span className="stat-dot stat-unk" />
          <span>EJ KLARA</span>
          <strong>{unkn}</strong>
        </div>
      </div>
    </section>
  )
}
