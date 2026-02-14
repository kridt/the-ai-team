import { useState } from 'react'

const INITIAL_STATE = {
  currentValue: '0',
  expression: '',
  operator: null,
  previousValue: null,
  resetNext: false,
}

function calculate(a, operator, b) {
  const numA = parseFloat(a)
  const numB = parseFloat(b)

  switch (operator) {
    case '+':
      return numA + numB
    case '−':
      return numA - numB
    case '×':
      return numA * numB
    case '÷':
      return numB === 0 ? null : numA / numB
    default:
      return numB
  }
}

function formatResult(value) {
  if (value === null) return 'Error'
  if (!isFinite(value)) return 'Error'

  const str = String(value)
  if (str.length <= 12) return str

  // Try toPrecision to fit within 12 chars
  const precise = value.toPrecision(8)
  if (precise.length <= 12) return precise

  return value.toExponential(5)
}

export default function useCalculator() {
  const [state, setState] = useState(INITIAL_STATE)

  function handleInput(label) {
    setState((prev) => {
      // Clear
      if (label === 'C') {
        return { ...INITIAL_STATE }
      }

      // Plus/minus toggle
      if (label === '±') {
        if (prev.currentValue === '0' || prev.currentValue === 'Error') {
          return prev
        }
        const toggled = prev.currentValue.startsWith('-')
          ? prev.currentValue.slice(1)
          : '-' + prev.currentValue
        return { ...prev, currentValue: toggled }
      }

      // Percent
      if (label === '%') {
        if (prev.currentValue === 'Error') return prev
        const val = parseFloat(prev.currentValue) / 100
        return { ...prev, currentValue: formatResult(val) }
      }

      // Digits 0-9
      if (label >= '0' && label <= '9') {
        if (prev.currentValue === 'Error') {
          return { ...prev, currentValue: label, resetNext: false }
        }
        if (prev.resetNext) {
          return { ...prev, currentValue: label, resetNext: false }
        }
        // Handle leading zeros
        if (prev.currentValue === '0') {
          return { ...prev, currentValue: label }
        }
        if (prev.currentValue === '-0') {
          return { ...prev, currentValue: '-' + label }
        }
        // Limit to ~12 digits
        const digits = prev.currentValue.replace(/[^0-9]/g, '')
        if (digits.length >= 12) return prev
        return { ...prev, currentValue: prev.currentValue + label }
      }

      // Decimal point
      if (label === '.') {
        if (prev.currentValue === 'Error') {
          return { ...prev, currentValue: '0.', resetNext: false }
        }
        if (prev.resetNext) {
          return { ...prev, currentValue: '0.', resetNext: false }
        }
        if (prev.currentValue.includes('.')) return prev
        return { ...prev, currentValue: prev.currentValue + '.' }
      }

      // Equals
      if (label === '=') {
        if (prev.operator === null || prev.previousValue === null) {
          return prev
        }

        const operand = prev.resetNext ? prev.previousValue : prev.currentValue
        const result = calculate(prev.previousValue, prev.operator, operand)
        const resultStr = formatResult(result)
        const expression =
          prev.expression + (prev.resetNext ? '' : prev.currentValue) + ' = '

        return {
          currentValue: resultStr,
          expression,
          operator: null,
          previousValue: null,
          resetNext: true,
        }
      }

      // Operators: +, −, ×, ÷
      if (['+', '−', '×', '÷'].includes(label)) {
        if (prev.currentValue === 'Error') return prev

        // If we already have a pending operation and user didn't just press an operator,
        // chain the calculation
        if (
          prev.operator !== null &&
          prev.previousValue !== null &&
          !prev.resetNext
        ) {
          const result = calculate(
            prev.previousValue,
            prev.operator,
            prev.currentValue,
          )
          const resultStr = formatResult(result)
          if (resultStr === 'Error') {
            return { ...INITIAL_STATE, currentValue: 'Error' }
          }
          return {
            currentValue: resultStr,
            expression: resultStr + ' ' + label + ' ',
            operator: label,
            previousValue: resultStr,
            resetNext: true,
          }
        }

        // If pressing operator right after another operator, just update the operator
        if (prev.resetNext && prev.operator !== null) {
          return {
            ...prev,
            operator: label,
            expression:
              (prev.previousValue || prev.currentValue) + ' ' + label + ' ',
          }
        }

        return {
          ...prev,
          operator: label,
          previousValue: prev.currentValue,
          expression: prev.currentValue + ' ' + label + ' ',
          resetNext: true,
        }
      }

      return prev
    })
  }

  return {
    currentValue: state.currentValue,
    expression: state.expression,
    handleInput,
  }
}
