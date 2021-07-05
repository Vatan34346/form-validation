import useInput from "../Hook/use-input";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

const BasicForm = (props) => {
  const {
    enteredValue: firstNameValue,
    hasError: firstNameHasError,
    valueIsValid: firstNameIsValid,
    valueChangeHandler: firstNameChangeHandler,
    valueBlureHandler: firstNameBlureHandler,
    resetFunction: resetFirstNameInput,
  } = useInput(isNotEmpty);

  const {
    enteredValue: lastNameValue,
    hasError: lastNameHasError,
    valueIsValid: lastNameIsValid,
    valueChangeHandler: lastNameChangeHandler,
    valueBlureHandler: lastNameBlureHandler,
    resetFunction: resetLastNameInput,
  } = useInput(isNotEmpty);

  const {
    enteredValue: emailValue,
    hasError: emailHasError,
    valueIsValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
    valueBlureHandler: emailBlureHandler,
    resetFunction: resetEmailInput,
  } = useInput(isEmail);

  let formIsValid = false;
  const firstNameClasses = firstNameHasError
    ? "form-control invalid"
    : "form-control";
  const lastNameClasses = lastNameHasError
    ? "form-control invalid"
    : "form-control";
  const emailClasses = emailHasError ? "form-control invalid" : "form-control";

  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

if(!formIsValid){
  return;
}




    resetLastNameInput();
    resetFirstNameInput();
    resetEmailInput();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <div className={firstNameClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="fname"
            value={firstNameValue}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlureHandler}
          />
          {firstNameHasError && <p className="error-text"> Please enter your first name</p>}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="lname"
            value={lastNameValue}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlureHandler}
          />
          {lastNameHasError && <p  className="error-text"> Please enter your last name</p>}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="email"
          id="email"
          value={emailValue}
          onChange={emailChangeHandler}
          onBlur={emailBlureHandler}
        />
        {emailHasError && <p  className="error-text"> Email is not valid</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
