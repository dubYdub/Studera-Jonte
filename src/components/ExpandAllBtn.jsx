export default function ExpandAllBtn({ allExpanded, onToggle }) {
  return (
    <button className="expand-btn" onClick={onToggle}>
      {allExpanded ? '[ DOLJ ALLA SVAR ]' : '[ VISA ALLA SVAR ]'}
    </button>
  )
}
