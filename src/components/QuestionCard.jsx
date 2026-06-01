import { useState } from 'react'

export default function QuestionCard({ question, part, total, status, onMark, isOpen, onToggle, cardIndex }) {
  const { q, a, i } = question
  const key = `${part}|${i}`
  const isKnow = status[key] === 'know'
  const isRev  = status[key] === 'review'
  const [flashClass, setFlashClass] = useState('')

  function handleMark(val) {
    const willSet = status[key] !== val
    onMark(part, i, val)
    if (willSet) {
      const cls = val === 'know' ? 'flash-know' : 'flash-rev'
      setFlashClass(cls)
      setTimeout(() => setFlashClass(''), 650)
    }
  }

  const badge = isKnow
    ? <span className="badge-know"> [OK]</span>
    : isRev
    ? <span className="badge-rev"> [!]</span>
    : null

  const lines = a.split('\n').map(l => l.startsWith('>>') ? '▸' + l.slice(2) : l)

  return (
    <div
      className={`q-card${flashClass ? ' ' + flashClass : ''}`}
      style={{ animationDelay: `${cardIndex * 50}ms` }}
    >
      <div className="q-num">FRAGA {i + 1}/{total}{badge}</div>
      <div className="q-text">{q}</div>

      <button className="reveal-btn" onClick={onToggle}>
        {isOpen ? '[ DOLJ SVAR ]' : '[ VISA SVAR ]'}
      </button>

      <div className={`answer-wrap${isOpen ? ' open' : ''}`}>
        <div className="answer-inner">
          <div className="answer-box">
            {lines.map((line, idx) => (
              <span key={idx}>
                {line}
                {idx < lines.length - 1 && <br />}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mark-row">
        <button
          className={`mbtn mbtn-know${isKnow ? ' active' : ''}`}
          onClick={() => handleMark('know')}
        >
          [OK] KAN DETTA
        </button>
        <button
          className={`mbtn mbtn-rev${isRev ? ' active' : ''}`}
          onClick={() => handleMark('review')}
        >
          [!] OVA MER
        </button>
      </div>
    </div>
  )
}
