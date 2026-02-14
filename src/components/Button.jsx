import '../styles/ButtonGrid.css'

function Button({ label, onClick, type }) {
  return (
    <button
      className={`btn btn-${type}${label === '0' ? ' btn-wide' : ''}`}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  )
}

export default Button
