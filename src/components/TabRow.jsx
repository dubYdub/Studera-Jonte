import { data } from '../data'

export default function TabRow({ currentPart, onSelect, status }) {
  function handleTouchSelect(event, part) {
    if (event.pointerType !== 'touch') return
    event.preventDefault()
    onSelect(part)
  }

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
            type="button"
            className={`tab${part === currentPart ? ' active' : ''}`}
            onPointerDown={(event) => handleTouchSelect(event, part)}
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
                  background: done ? '#67f35f' : '#67f35f',
                }}
              />
            </div>
          </button>
        )
      })}
    </div>
  )
}
