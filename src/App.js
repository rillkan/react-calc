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
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false
        }
      }
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

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null
        }
      }
      if (state.currentOperand == null) return state /// return the original state
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null
        }
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {//This check ensures an operation cannot be chosen if there are no operands available
        return state
      }

      if (state.currentOperand == null) { //Changing operations after an evaluation
        return {
          ...state,
          operation: payload.operation //updates the operation
        }
      }

      if (state.previousOperand == null) {//Moves the currentOperand to previousOperand
        return {
          ...state, //return the state from the above if statement
          operation: payload.operation, //extract the specific operation from payload
          previousOperand: state.currentOperand, //previousOperand becomes the currentOperand

          currentOperand: null //reset the currentOperand value
        }
      }
      return {
        ...state,
        previousOperand: evaluate(state), //perform the evaluate function and becomes the new previousOperand
        operation: payload.operation,//extract the specific operation from payload
        currentOperand: null//reset the currentOperand value
      }

    case ACTIONS.EVALUATE:
      if (state.operation == null || state.currentOperand == null || state.previousOperand == null) {
        return state
      }
      //If there're not null, return...
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        currentOperand: evaluate(state), //display the currentOperand
        operation: null
      }

    default:
      return state;
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand) //converts previousOperand to a float
  const current = parseFloat(currentOperand)//converts currentOperand to a float

  if (isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "÷":
      computation = prev / current
      break
  }

  return computation.toString() //return and convert the float to a string
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0, //no decimal places will be formatted, effectively ensuring that only the integer part of the number will be formatted with commas
})

function formatOperand(operand) {
  if (operand == null) return //handle if currentOperand & previousOperand is null
  const [integer, decimal] = operand.split('.') //split into two parts: integer and decimal, using "."" Etc: 123.45 Integer = 123, Decimal = 45
  if (decimal == null) return INTEGER_FORMATTER.format(integer)//handle if theres no decimal on currentOperand, return just the integer
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`//handle if there IS decimal, return both integer and decimal. Etc: 123.45
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})


  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{formatOperand(previousOperand)} {operation}</div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
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
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
    </div>
  )
}

export default App