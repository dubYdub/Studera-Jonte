const FILTERS = [
  { id: 'all',      label: 'ALLA' },
  { id: 'unmarked', label: 'EJ KLARA' },
  { id: 'review',   label: 'OVA MER' },
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
