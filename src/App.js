import { useReducer } from "react"
import DigitButton from "./DigitButton"

import "./App.css"

//global variable "ACTIONS" to access the key-value pairs
export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  CHOOSE_OPERATION: 'choose-operation',
  EVALUATE: 'evaluate'
}

function reducer(state, { type, payload }) {
  console.log("Action dispatched:", type, payload); // Log the dispatched action
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === '0' && state.currentOperand === '0') return state //Handle multiple 0 inputs and avoid 0000 as currentOperand
      if (payload.digit === '.' && state.currentOperand.includes(".")) return state //Handle "." as currentOperand only has 1 "."
      const newOperand = `${state.currentOperand || ""}${payload.digit}`;
      console.log("New current operand:", newOperand); // Log the new current operand
      return {
        ...state,
        currentOperand: newOperand
      };



    default:
      return state;
  }
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})


  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two">AC</button>
      <button>DEL</button>
      <button>÷</button>
      <DigitButton digit="1" sendDispatch={dispatch} />
      <DigitButton digit="2" sendDispatch={dispatch} />
      <DigitButton digit="3" sendDispatch={dispatch} />
      <button>*</button>
      <DigitButton digit="4" sendDispatch={dispatch} />
      <DigitButton digit="5" sendDispatch={dispatch} />
      <DigitButton digit="6" sendDispatch={dispatch} />
      <button>+</button>
      <DigitButton digit="7" sendDispatch={dispatch} />
      <DigitButton digit="8" sendDispatch={dispatch} />
      <DigitButton digit="9" sendDispatch={dispatch} />
      <button>-</button>
      <DigitButton digit="." sendDispatch={dispatch} />
      <DigitButton digit="0" sendDispatch={dispatch} />
      <button className="span-two">=</button>
    </div>
  )
}

export default App