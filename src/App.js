import { useReducer } from "react"
import DigitButton from "./DigitButton"
import "./App.css"

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
      <DigitButton digit="÷" dispatch={dispatch} />
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>*</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>÷</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>-</button>
      <button>.</button>
      <button>0</button>
      <button className="span-two">=</button>
    </div>
  )
}

export default App