import {useState} from "react";

const useInput=(validateValue)=>{
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const valueIsValid = validateValue(enteredValue);

  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
    setIsTouched(true)
  };

  const validateValueHandler = () => {
    setIsTouched(true);
    setIsFocused(false);
  };

  const focusHandler=()=>{
    setIsFocused(true);
  }

  const reset=()=>{
    setEnteredValue('');
    setIsTouched(false);
  }

  return{
    value : enteredValue,
    isValid : valueIsValid,
    isTouched,
    hasError,
    valueChangeHandler,
    validateValueHandler,
    focusHandler,
    isFocused,
    reset
  };
};

export default useInput;