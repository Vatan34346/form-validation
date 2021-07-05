import { useRef} from "react";
import useInput from "../Hook/use-input";

const SimpleInput = (props) => {
  const {
    enteredValue,
    hasError,
    valueIsValid,
    valueChangeHandler,
    valueBlureHandler,
    resetFunction,
  } = useInput((value) => value.trim() !== "");

  const {
    enteredValue: enteredEmail,
    hasError: emailInputHasError,
    valueIsValid: enteredEmailIsValid,
    valueChangeHandler: emailChangeHandler,
    valueBlureHandler: emailBlureHandler,
    resetFunction: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  const nameInputRef = useRef();

  let formISvalid = false;

  if (valueIsValid && enteredEmailIsValid) {
    formISvalid = true;
  }

  const formSubmition = (event) => {
    event.preventDefault();

    valueBlureHandler(true);
    if (valueIsValid) {
      return;
    }

    resetFunction();
    const value = nameInputRef.current.value;
    console.log("with ref " + value);
    resetEmailInput();
  };

  const nameInputClasses = hasError ? "form-control invalid" : "form-control ";

  const emailInputClass = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmition}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
          value={enteredValue}
          type="text"
          id="name"
          onChange={valueChangeHandler}
          onBlur={valueBlureHandler}
        />
        {hasError && <p className={"error-text"}>Name is Not valid</p>}
      </div>

      <div className={emailInputClass}>
        <label htmlFor="name">Your Email</label>
        <input
          value={enteredEmail}
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlureHandler}
        />

        {emailInputHasError && (
          <p className={"error-text"}>Email is Not valid</p>
        )}
      </div>

      <div className="form-actions">
        <button disabled={!formISvalid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
