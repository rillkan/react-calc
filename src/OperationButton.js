import { ACTIONS } from "./App"

export default function OperationButton({ sendDispatch, operation }) {
  return (
    <button
      onClick={() =>
        sendDispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </button>
  )
}