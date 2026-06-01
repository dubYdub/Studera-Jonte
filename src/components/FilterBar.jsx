const FILTERS = [
  { id: 'all',      label: 'ALLA' },
  { id: 'unmarked', label: 'EJ MARKERADE' },
  { id: 'review',   label: 'OVA MER' },
  { id: 'know',     label: 'KAN REDAN' },
]

export default function FilterBar({ filter, onSelect, counts }) {
  return (
    <div className="filter-row">
      {FILTERS.map(({ id, label }) => (
        <button
          key={id}
          className={`fbtn${filter === id ? ' active' : ''}`}
          onClick={() => onSelect(id)}
        >
          [ {label} <span className="cnt">({counts[id]})</span> ]
        </button>
      ))}
    </div>
  )
}
