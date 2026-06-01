import { useState, useEffect, useMemo, useCallback } from 'react'
import { data } from './data'
import TitleBar from './components/TitleBar'
import StatsGrid from './components/StatsGrid'
import ProgressBar from './components/ProgressBar'
import TabRow from './components/TabRow'
import FilterBar from './components/FilterBar'
import ExpandAllBtn from './components/ExpandAllBtn'
import QuestionCard from './components/QuestionCard'

export default function App() {
  const [currentPart, setCurrentPart] = useState(Object.keys(data)[0])
  const [filter, setFilter] = useState('all')
  const [status, setStatus] = useState(() => {
    try { return JSON.parse(localStorage.getItem('rv_retro') || '{}') } catch { return {} }
  })
  const [openIds, setOpenIds] = useState(new Set())

  useEffect(() => {
    try { localStorage.setItem('rv_retro', JSON.stringify(status)) } catch {}
  }, [status])

  // Close all answers when switching tab or filter
  useEffect(() => { setOpenIds(new Set()) }, [currentPart, filter])

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

  const allExpanded = filteredQuestions.length > 0 &&
    filteredQuestions.every(q => openIds.has(`${currentPart}|${q.i}`))

  function handleExpandToggle() {
    if (allExpanded) {
      setOpenIds(new Set())
    } else {
      setOpenIds(new Set(filteredQuestions.map(q => `${currentPart}|${q.i}`)))
    }
  }

  function handleTabChange(part) {
    setCurrentPart(part)
    setFilter('all')
  }

  return (
    <div className="retro">
      <div className="crt-wrap">
        <div className="scanline" />
        <TitleBar />
        <StatsGrid stats={stats} />
        <ProgressBar stats={stats} />
        <TabRow currentPart={currentPart} onSelect={handleTabChange} />
        <FilterBar filter={filter} onSelect={setFilter} counts={filterCounts} />
        <ExpandAllBtn allExpanded={allExpanded} onToggle={handleExpandToggle} />
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
            />
          ))
        )}
      </div>
    </div>
  )
}
