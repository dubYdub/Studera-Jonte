import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { data } from './data'
import TitleBar from './components/TitleBar'
import DonutChart from './components/DonutChart'
import TabRow from './components/TabRow'
import FilterBar from './components/FilterBar'
import ExpandAllBtn from './components/ExpandAllBtn'
import QuestionCard from './components/QuestionCard'
import Toast from './components/Toast'

const TOASTS = {
  25:  '✦ 25% KLAR! BRA JOBBAT! ✦',
  50:  '✦ HALVVAGS! FORTSATT! ✦',
  75:  '✦ 75%! SNART KLART! ✦',
  100: '✦ ALLT KLART! PERFEKT! ✦',
}

export default function App() {
  const [currentPart, setCurrentPart] = useState(Object.keys(data)[0])
  const [filter, setFilter] = useState('all')
  const [status, setStatus] = useState(() => {
    try { return JSON.parse(localStorage.getItem('rv_retro') || '{}') } catch { return {} }
  })
  const [openIds, setOpenIds] = useState(new Set())
  const [focusedIdx, setFocusedIdx] = useState(0)
  const [toast, setToast] = useState(null)

  const prevKnowRef = useRef(-1)
  const focusRef = useRef({})

  useEffect(() => {
    try { localStorage.setItem('rv_retro', JSON.stringify(status)) } catch {}
  }, [status])

  useEffect(() => {
    setOpenIds(new Set())
    setFocusedIdx(0)
  }, [currentPart, filter])

  const handleMark = useCallback((part, i, val) => {
    const key = `${part}|${i}`
    setStatus(prev => {
      const next = { ...prev }
      if (next[key] === val) delete next[key]
      else next[key] = val
      return next
    })
  }, [])

  const toggleOpen = useCallback((id) => {
    setOpenIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const stats = useMemo(() => {
    let total = 0, know = 0, review = 0
    Object.keys(data).forEach(p => data[p].forEach((_, i) => {
      total++
      const k = `${p}|${i}`
      if (status[k] === 'know') know++
      if (status[k] === 'review') review++
    }))
    return { total, know, review }
  }, [status])

  // Milestone toast
  useEffect(() => {
    if (stats.total === 0) return
    if (prevKnowRef.current === -1) {
      prevKnowRef.current = stats.know
      return
    }
    const prev = Math.floor((prevKnowRef.current / stats.total) * 100)
    const curr = Math.floor((stats.know / stats.total) * 100)
    prevKnowRef.current = stats.know
    const crossed = [25, 50, 75, 100].find(m => prev < m && curr >= m)
    if (crossed) {
      setToast(TOASTS[crossed])
      const t = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(t)
    }
  }, [stats.know, stats.total])

  const filterCounts = useMemo(() => {
    let all = 0, know = 0, review = 0, unmarked = 0
    data[currentPart].forEach((_, i) => {
      all++
      const k = `${currentPart}|${i}`
      if (status[k] === 'know') know++
      else if (status[k] === 'review') review++
      else unmarked++
    })
    return { all, know, review, unmarked }
  }, [status, currentPart])

  const filteredQuestions = useMemo(() => {
    return data[currentPart].map((q, i) => ({ ...q, i })).filter(({ i }) => {
      const k = `${currentPart}|${i}`
      if (filter === 'know') return status[k] === 'know'
      if (filter === 'review') return status[k] === 'review'
      if (filter === 'unmarked') return !status[k]
      return true
    })
  }, [currentPart, filter, status])

  const allCurrentOpen = filteredQuestions.length > 0 &&
    filteredQuestions.every(q => openIds.has(`${currentPart}|${q.i}`))

  function handleExpandToggle() {
    if (allCurrentOpen) {
      setOpenIds(new Set())
    } else {
      setOpenIds(new Set(filteredQuestions.map(q => `${currentPart}|${q.i}`)))
    }
  }

  function handleTabChange(part) {
    setCurrentPart(part)
    setFilter('all')
  }

  // Keep focusRef in sync for keyboard handler
  useEffect(() => {
    focusRef.current = { focusedIdx, filteredQuestions, currentPart }
  })

  // Keyboard shortcuts
  useEffect(() => {
    function onKey(e) {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return
      const { focusedIdx, filteredQuestions, currentPart } = focusRef.current
      const card = filteredQuestions[focusedIdx]
      if (!card) return
      const id = `${currentPart}|${card.i}`

      switch (e.key) {
        case ' ':
          e.preventDefault()
          toggleOpen(id)
          break
        case 'k': case 'K':
          if (e.target.tagName !== 'BUTTON') handleMark(currentPart, card.i, 'know')
          break
        case 'r': case 'R':
          if (e.target.tagName !== 'BUTTON') handleMark(currentPart, card.i, 'review')
          break
        case 'ArrowDown': {
          e.preventDefault()
          const next = Math.min(focusedIdx + 1, filteredQuestions.length - 1)
          setFocusedIdx(next)
          requestAnimationFrame(() => {
            document.getElementById(`card-${next}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
          })
          break
        }
        case 'ArrowUp': {
          e.preventDefault()
          const prev = Math.max(focusedIdx - 1, 0)
          setFocusedIdx(prev)
          requestAnimationFrame(() => {
            document.getElementById(`card-${prev}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
          })
          break
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggleOpen, handleMark])

  return (
    <div className="retro">
      <div className="crt-wrap">
        <div className="scanline" />
        <TitleBar />
        <DonutChart stats={stats} animated={!!toast} />
        <div className="nav-section">
          <div className="nav-label">▸ AVSNITT</div>
          <TabRow currentPart={currentPart} onSelect={handleTabChange} status={status} />
        </div>
        <div className="nav-section nav-section--filter">
          <div className="nav-label">▸ VISA</div>
          <FilterBar filter={filter} onSelect={setFilter} counts={filterCounts} />
        </div>
        <div className="study-toolbar">
          <ExpandAllBtn allExpanded={allCurrentOpen} onToggle={handleExpandToggle} />
          <div className="kb-hint">SPACE · K · R · ↑↓</div>
        </div>
        {filteredQuestions.length === 0 ? (
          <div className="empty">{'>> INGA FRAGOR MATCHAR <<'}</div>
        ) : (
          filteredQuestions.map((q, cardIndex) => (
            <QuestionCard
              key={`${currentPart}|${q.i}`}
              question={q}
              part={currentPart}
              total={data[currentPart].length}
              status={status}
              onMark={handleMark}
              isOpen={openIds.has(`${currentPart}|${q.i}`)}
              onToggle={() => toggleOpen(`${currentPart}|${q.i}`)}
              cardIndex={cardIndex}
              focused={cardIndex === focusedIdx}
            />
          ))
        )}
      </div>
      <Toast message={toast} />
    </div>
  )
}
