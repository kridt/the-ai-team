import { useEffect } from 'react'
import './App.css'
import Display from './components/Display'
import ButtonGrid from './components/ButtonGrid'
import useCalculator from './hooks/useCalculator'

function App() {
  const { currentValue, expression, handleInput } = useCalculator()

  useEffect(() => {
    function handleKeyDown(e) {
      const key = e.key

      if (key >= '0' && key <= '9') {
        handleInput(key)
      } else if (key === '.') {
        handleInput('.')
      } else if (key === '+') {
        handleInput('+')
      } else if (key === '-') {
        handleInput('−')
      } else if (key === '*') {
        handleInput('×')
      } else if (key === '/') {
        e.preventDefault()
        handleInput('÷')
      } else if (key === 'Enter' || key === '=') {
        handleInput('=')
      } else if (key === 'Escape') {
        handleInput('C')
      } else if (key === 'Backspace') {
        handleInput('C')
      } else if (key === '%') {
        handleInput('%')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleInput])

  return (
    <div className="calculator">
      <Display currentValue={currentValue} expression={expression} />
      <ButtonGrid onButtonClick={handleInput} />
    </div>
  )
}

export default App