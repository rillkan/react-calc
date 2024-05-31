//DigitButton.js

import { ACTIONS } from './App'
//Rendering a button for each digit
export default function DigitButton({ sendDispatch, digit }) {
  const handleClick = () => { //Handling the click event
    console.log("Button clicked:", digit); // Log the clicked digit
    sendDispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
  };

  return (
    <button onClick={handleClick}>
      {digit}
    </button>
  );
}