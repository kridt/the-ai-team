import '../styles/Display.css'

function Display({ currentValue, expression }) {
  return (
    <div className="display">
      <div className="display-expression">{expression || '\u00A0'}</div>
      <div className="display-value">{currentValue || '0'}</div>
    </div>
  )
}

export default Display