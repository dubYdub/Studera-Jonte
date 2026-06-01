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

  const lines = a.split('\n').filter(line => line.trim())

  function parseAnswerLine(line) {
    const isBullet = line.startsWith('>>')
    const raw = (isBullet ? line.slice(2) : line).trim()
    const [first = '', ...rest] = raw.split(' ')
    const hasIcon = first && /[^\wÅÄÖåäö:]/.test(first)
    const text = hasIcon ? rest.join(' ') : raw
    const icon = hasIcon ? first : '›'
    const colonIndex = text.indexOf(':')

    return {
      icon,
      isBullet,
      lead: colonIndex > 0 ? text.slice(0, colonIndex + 1) : '',
      body: colonIndex > 0 ? text.slice(colonIndex + 1).trim() : text,
    }
  }

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

      <div className={`answer-panel${isOpen ? ' open' : ''}`}>
        <button className="reveal-btn" onClick={onToggle}>
          <span>{isOpen ? 'DÖLJ FACIT' : 'VISA FACIT'}</span>
          <span className="reveal-icon" aria-hidden="true">{isOpen ? '⌃' : '⌄'}</span>
        </button>

        <div className={`answer-wrap${isOpen ? ' open' : ''}`}>
          <div className="answer-inner">
            <div className="answer-box">
              {lines.map((line, idx) => {
                const parsed = parseAnswerLine(line)
                return (
                  <div key={idx} className={`answer-row${parsed.isBullet ? ' bullet' : ''}`}>
                    <span className="answer-icon" aria-hidden="true">{parsed.icon}</span>
                    <span className="answer-copy">
                      {parsed.lead ? <strong>{parsed.lead}</strong> : null}
                      {parsed.body ? <span>{parsed.lead ? ' ' : ''}{parsed.body}</span> : null}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
