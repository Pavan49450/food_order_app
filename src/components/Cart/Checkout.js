import React, { useEffect, useState } from 'react';
import './Checkout.css';
import useInput from '../../hooks/use-Input';


const Checkout = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [isOrderSubmitted ,setOrderIsSubmitted] = useState(false);
  const textValidation = (value) => value.trim() !== '';
  const pinCodeValidation = (value) => value.trim().length > 5;

  useEffect(()=>{
    setOrderIsSubmitted(false);
  },[])
  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameIsInvalid,
    valueChangeHandler: nameChangeHandler,
    validateValueHandler: validateNameHandler,
    focusHandler: nameFocusHandler,
    isFocused: nameIsFocused,
    reset: nameReset,
  } = useInput(textValidation);

  const {
    value: enteredAddress,
    isValid: addressIsValid,
    hasError: addressIsInvalid,
    valueChangeHandler: addressChangeHandler,
    validateValueHandler: validateAddressHandler,
    focusHandler: addressFocusHandler,
    isFocused: addressIsFocused,
    reset: addressReset,
  } = useInput(textValidation);

  const {
    value: enteredPinCode,
    isValid: pinCodeIsValid,
    hasError: pinCodeIsInvalid,
    valueChangeHandler: pinCodeChangeHandler,
    validateValueHandler: validatePinCodeHandler,
    focusHandler: pinCodeFocusHandler,
    isFocused: pinCodeIsFocused,
    reset: pinCodeReset,
  } = useInput(pinCodeValidation);

  useEffect(() => {
    if (nameIsValid && addressIsValid && pinCodeIsValid) {
      setFormIsValid(true);
    }
  }, [nameIsValid, addressIsValid, pinCodeIsValid]);

  const submitHandler = (event) => {
    event.preventDefault();
    nameReset();
    addressReset();
    pinCodeReset();
    setFormIsValid(false);
    props.onConfirm({
      name: enteredName,
      address: enteredAddress,
      pinCode: enteredPinCode,
    });
    setOrderIsSubmitted(true);
  };

  const inputNameClasses = nameIsInvalid
    ? 'Checkout_form-control invalid'
    : 'Checkout_form-control';
  const inputAddressClasses = addressIsInvalid
    ? 'Checkout_form-control invalid'
    : 'Checkout_form-control';
  const inputPinCodeClasses = pinCodeIsInvalid
    ? 'Checkout_form-control invalid'
    : 'Checkout_form-control';
  const formSumbitBtnClasses = !formIsValid
    ? 'Checkout_form-action invalidBtn'
    : 'Checkout_form-action';
  const nameInvalidClasses = nameIsInvalid ? 'invalid_msg show' : 'invalid_msg';
  const addressInvalidClasses = addressIsInvalid
    ? 'invalid_msg show'
    : 'invalid_msg';
  const pinCodeInvalidClasses = pinCodeIsInvalid
    ? 'invalid_msg show'
    : 'invalid_msg';


  const CheckoutForm =(
    <form className="Checkout_form" onSubmit={submitHandler}>
      <input
        className={inputNameClasses}
        type="text"
        placeholder="Enter your Name"
        value={enteredName}
        onBlur={validateNameHandler}
        onFocus={nameFocusHandler}
        onChange={nameChangeHandler}
        style={{
          borderBottom: !(nameIsFocused || nameIsValid)
            ? '4px solid grey'
            : '4px solid #FC4A1A',
        }}
      />
      <p className={nameInvalidClasses}>Please don't leave it empty</p>
      <input
        className={inputAddressClasses}
        type="text"
        placeholder="Enter your Address"
        value={enteredAddress}
        onBlur={validateAddressHandler}
        onFocus={addressFocusHandler}
        onChange={addressChangeHandler}
        style={{
          borderBottom: !(addressIsFocused || addressIsValid)
            ? '4px solid grey'
            : '4px solid #FC4A1A',
        }}
      />
      <p className={addressInvalidClasses}>Please don't leave it empty</p>
      <input
        className={inputPinCodeClasses}
        type="number"
        placeholder="Enter your Pin Code"
        value={enteredPinCode}
        onBlur={validatePinCodeHandler}
        onFocus={pinCodeFocusHandler}
        onChange={pinCodeChangeHandler}
        style={{
          borderBottom: !(pinCodeIsFocused || pinCodeIsValid)
            ? '4px solid grey'
            : '4px solid #FC4A1A',
        }}
      />
      <p className={pinCodeInvalidClasses}>Please don't leave it empty</p>
      <div className="form-actions">
        <button className="form_cancel_btn" onClick={props.hideCheckOutForm}>
          Cancel
        </button>
        <button disabled={!formIsValid} className={formSumbitBtnClasses}>
          Confirm
        </button>
      </div>
    </form>

  )

  return <div>
    {isOrderSubmitted ?<p className="Submit_msg">!!Order is Submitted</p> : CheckoutForm}
      </div>;
};

export default Checkout;
