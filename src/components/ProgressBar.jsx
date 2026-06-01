export default function ProgressBar({ stats }) {
  const { total, know } = stats
  const pct = total > 0 ? Math.round((know / total) * 100) : 0
  return (
    <div className="prog-wrap">
      <div className="prog-label">
        FRAMSTEG: <span>{pct}% [{know}/{total}]</span>
      </div>
      <div className="prog-track">
        <div className="prog-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
