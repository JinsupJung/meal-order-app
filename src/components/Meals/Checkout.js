import React from "react";
import useInput from "../hooks/use-input";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: streetInputHasError,
    valueChangeHandler: streetChangedHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreetInput,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredPostal,
    isValid: enteredPostalIsValid,
    hasError: postalInputHasError,
    valueChangeHandler: postalChangedHandler,
    inputBlurHandler: postalBlurHandler,
    reset: resetPostalInput,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityChangedHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCityInput,
  } = useInput((value) => value.trim() !== "");

  const formIsValid =
    enteredNameIsValid &&
    enteredStreetIsValid &&
    enteredPostalIsValid &&
    enteredCityIsValid;

  // if (
  //   enteredNameIsValid &&
  //   enteredStreetIsValid &&
  //   enteredPostalIsValid &&
  //   enteredCityIsValid
  // ) {
  //   formIsValid = true;
  // }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    console.log("orderConfirmHandler ");

    const orderMealData = {
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    };
    props.onConfirmCheckout(orderMealData);

    // console.log("Order submission");
    resetNameInput();
    resetStreetInput();
    resetPostalInput();
    resetCityInput();
  };

  // const nameInputClasses = "form-control invalid";
  // <div className={`${classes['form-control']} ${classes.invalid}`}>

  const nameInputClasses = nameInputHasError
    ? `${classes["form-control"]} ${classes.invalid}`
    : classes["form-control"];

  const streetInputClasses = streetInputHasError
    ? `${classes["form-control"]} ${classes.invalid}`
    : classes["form-control"];

  const postalInputClasses = postalInputHasError
    ? `${classes["form-control"]} ${classes.invalid}`
    : classes["form-control"];
  const cityInputClasses = cityInputHasError
    ? `${classes["form-control"]} ${classes.invalid}`
    : classes["form-control"];

  const orderCancelHandler = () => {
    props.onCancelCheckout();
  };

  const orderConfirmHandler = () => {
    // console.log("orderConfirmHandler ");

    const orderMealData = {
      enteredName,
      enteredStreet,
      enteredPostal,
      enteredCity,
    };
    props.onConfirmCheckout(orderMealData);
  };

  return (
    <form className={classes.form} onSubmit={formSubmissionHandler}>
      <div className={classes["control-group"]}>
        {/* <div className="control-group"> */}
        <div className={nameInputClasses}>
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            id="name"
            value={enteredName}
            onChange={nameChangedHandler}
            onBlur={nameBlurHandler}
          />
          {nameInputHasError && (
            <p className={classes["error-text"]}>Name empty!</p>
          )}
          {/* {nameInputHasError && <p className="error-text">Name empty!</p>} */}
        </div>
        <div className={streetInputClasses}>
          <label htmlFor="Street">Street</label>
          <input
            type="text"
            id="street"
            value={enteredStreet}
            onChange={streetChangedHandler}
            onBlur={streetBlurHandler}
          />
          {streetInputHasError && (
            // <p className="error-text">Street empty!</p>
            <p className={classes["error-text"]}>Street empty!</p>
          )}
        </div>
        <div className={postalInputClasses}>
          <label htmlFor="postal">Postal</label>
          <input
            type="postal"
            id="postal"
            value={enteredPostal}
            onChange={postalChangedHandler}
            onBlur={postalBlurHandler}
          />
          {/* {postalInputHasError && <p className="error-text">Postal Invalid</p>} */}
          {postalInputHasError && (
            <p className={classes["error-text"]}>Postal Invalid</p>
          )}
        </div>
        <div className={cityInputClasses}>
          <label htmlFor="city">city</label>
          <input
            type="city"
            id="city"
            value={enteredCity}
            onChange={cityChangedHandler}
            onBlur={cityBlurHandler}
          />
          {cityInputHasError && (
            <p className={classes["error-text"]}>City Invalid</p>
          )}
          {/* {cityInputHasError && <p className="error-text">City Invalid</p>} */}
        </div>
      </div>
      <div className={classes.actions}>
        <div className={classes["button--alt"]}>
          <button onClick={orderCancelHandler}>Cancel</button>
        </div>
        <div className={classes["button--alt"]}>
          <button disabled={!formIsValid}>Confirm</button>
        </div>
      </div>
    </form>
  );
};

export default Checkout;
