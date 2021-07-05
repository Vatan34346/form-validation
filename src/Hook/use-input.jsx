import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};



const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return {
      value: action.value,
      isTouched: state.isTouched,
    };
  }
  if (action.type === "BLUR") {
    return {
      isTouched: true,
      value: state.value,
    };
  }
  if (action.type === "RESET") {
    return {
      value: "",
      isTouched: false,
    };
  }
  return initialInputState;
};

const useInput = (validateValue) => {

    
  const [inputSate, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputSate.value);
  const hasError = !valueIsValid && inputSate.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({
      type: "INPUT",
      value: event.target.value,
    });
  };

  const valueBlureHandler = (event) => {
    dispatch({
      type: "BLUR",
    });
  };
  const resetFunction = (event) => {
    dispatch({ type: "RESET" });
  };
  return {
    enteredValue: inputSate.value,
    hasError,
    valueIsValid,
    valueChangeHandler,
    valueBlureHandler,
    resetFunction,
  };
};

export default useInput;
