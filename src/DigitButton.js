//DigitButton.js

import { ACTIONS } from './App'
//Rendering a button for each digit
export default function DigitButton({ dispatch, digit }) {
  const handleClick = () => {
    console.log("Button clicked:", digit); // Log the clicked digit
    dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
  };

  return (
    <button onClick={handleClick}>
      {digit}
    </button>
  );
}