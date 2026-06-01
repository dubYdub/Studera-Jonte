import { data } from '../data'

export default function TabRow({ currentPart, onSelect }) {
  return (
    <div className="tabs">
      {Object.keys(data).map(part => (
        <button
          key={part}
          className={`tab${part === currentPart ? ' active' : ''}`}
          onClick={() => onSelect(part)}
        >
          {part}
        </button>
      ))}
    </div>
  )
}
