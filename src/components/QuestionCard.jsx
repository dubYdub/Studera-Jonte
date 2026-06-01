import { useState } from 'react'

export default function QuestionCard({ question, part, total, status, onMark, isOpen, onToggle, cardIndex, focused }) {
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

  const lines = a.split('\n').map(l => l.startsWith('>>') ? '▸' + l.slice(2) : l)

  return (
    <div
      id={`card-${cardIndex}`}
      className={`q-card${flashClass ? ' ' + flashClass : ''}${focused ? ' focused' : ''}`}
      style={{
        borderLeftColor: isKnow ? '#39ff14' : isRev ? '#ff6b35' : '#4a3810',
        animationDelay: `${cardIndex * 50}ms`,
      }}
    >
      <div className="q-head">
        <div className="q-num">FRÅGA {i + 1}/{total}</div>
        <div className="mark-row">
          <button
            className={`mbtn mbtn-know${isKnow ? ' active' : ''}`}
            onClick={() => handleMark('know')}
          >
            ✓ KAN
          </button>
          <button
            className={`mbtn mbtn-rev${isRev ? ' active' : ''}`}
            onClick={() => handleMark('review')}
          >
            ↻ ÖVA
          </button>
        </div>
      </div>
      <div className="q-text">{q}</div>

      <button className="reveal-btn" onClick={onToggle}>
        <span>{isOpen ? 'DÖLJ FACIT' : 'VISA FACIT'}</span>
        <span className="reveal-icon" aria-hidden="true">{isOpen ? '⌃' : '⌄'}</span>
      </button>

      <div className={`answer-wrap${isOpen ? ' open' : ''}`}>
        <div className="answer-inner">
          <div className="answer-box">
            {lines.map((line, idx) => {
              const isBullet = line.startsWith('▸')
              return isBullet ? (
                <div key={idx} className="answer-bullet">
                  <span className="bullet-sym">▸</span>
                  <span>{line.slice(1)}</span>
                </div>
              ) : (
                <div key={idx} className="answer-line">{line}</div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
