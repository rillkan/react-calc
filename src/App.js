import { useReducer } from "react"
import DigitButton from "./DigitButton"
import OperationButton from "./OperationButton"

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

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }
      if (state.previousOperand == null) {
        return {
          ...state, //return the state from the above if statement
          operation: payload.operation, //extract the specific operation from payload
          previousOperand: state.currentOperand, //previousOperand becomes the currentOperand
          currentOperand: null //reset the currentOperand value
        }
      }
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
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button>DEL</button>
      <OperationButton operation="÷" sendDispatch={dispatch} />
      <DigitButton digit="1" sendDispatch={dispatch} />
      <DigitButton digit="2" sendDispatch={dispatch} />
      <DigitButton digit="3" sendDispatch={dispatch} />
      <OperationButton operation="*" sendDispatch={dispatch} />
      <DigitButton digit="4" sendDispatch={dispatch} />
      <DigitButton digit="5" sendDispatch={dispatch} />
      <DigitButton digit="6" sendDispatch={dispatch} />
      <OperationButton operation="+" sendDispatch={dispatch} />
      <DigitButton digit="7" sendDispatch={dispatch} />
      <DigitButton digit="8" sendDispatch={dispatch} />
      <DigitButton digit="9" sendDispatch={dispatch} />
      <OperationButton operation="-" sendDispatch={dispatch} />
      <DigitButton digit="." sendDispatch={dispatch} />
      <DigitButton digit="0" sendDispatch={dispatch} />
      <button className="span-two">=</button>
    </div>
  )
}

export default App