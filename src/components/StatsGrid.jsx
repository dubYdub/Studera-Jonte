export default function StatsGrid({ stats }) {
  const { total, know, review } = stats
  return (
    <div className="stats-grid">
      <div className="stat-box">
        <div className="stat-num">{total}</div>
        <div className="stat-label">TOTALT</div>
      </div>
      <div className="stat-box">
        <div className="stat-num stat-know">{know}</div>
        <div className="stat-label">[OK] KAN</div>
      </div>
      <div className="stat-box">
        <div className="stat-num stat-review">{review}</div>
        <div className="stat-label">[!] OVA</div>
      </div>
    </div>
  )
}
