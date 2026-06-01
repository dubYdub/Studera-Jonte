import { data } from '../data'

export default function TabRow({ currentPart, onSelect, status }) {
  return (
    <div className="tab-strip">
      {Object.keys(data).map((part, index) => {
        const total = data[part].length
        const know = data[part].filter((_, i) => status[`${part}|${i}`] === 'know').length
        const pct = total > 0 ? (know / total) * 100 : 0
        const done = pct === 100
        const [, subtitle = part] = part.split(': ')

        return (
          <button
            key={part}
            className={`tab${part === currentPart ? ' active' : ''}`}
            onClick={() => onSelect(part)}
          >
            <span className="tab-title">
              <span className="tab-short">DEL {index + 1}</span>
              <span className="tab-long">: {subtitle}</span>
            </span>
            <span className="tab-pct">{Math.round(pct)}%</span>
            <div className="tab-progress">
              <div
                className="tab-progress-fill"
                style={{
                  width: `${pct}%`,
                  background: done ? '#39ff14' : '#f5d060',
                }}
              />
            </div>
          </button>
        )
      })}
    </div>
  )
}
