import Button from './Button'

const buttons = [
  { label: 'C', type: 'action' },
  { label: '±', type: 'action' },
  { label: '%', type: 'action' },
  { label: '÷', type: 'operator' },
  { label: '7', type: 'number' },
  { label: '8', type: 'number' },
  { label: '9', type: 'number' },
  { label: '×', type: 'operator' },
  { label: '4', type: 'number' },
  { label: '5', type: 'number' },
  { label: '6', type: 'number' },
  { label: '−', type: 'operator' },
  { label: '1', type: 'number' },
  { label: '2', type: 'number' },
  { label: '3', type: 'number' },
  { label: '+', type: 'operator' },
  { label: '0', type: 'number' },
  { label: '.', type: 'number' },
  { label: '=', type: 'operator' },
]

function ButtonGrid({ onButtonClick }) {
  return (
    <div className="button-grid">
      {buttons.map((btn) => (
        <Button
          key={btn.label}
          label={btn.label}
          onClick={onButtonClick}
          type={btn.type}
        />
      ))}
    </div>
  )
}

export default ButtonGrid
