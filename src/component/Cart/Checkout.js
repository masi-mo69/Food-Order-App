import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {
    const [formInputsValidity , setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = !isFiveChars(enteredPostalCode);

    setFormInputsValidity({
        name: enteredCityIsValid,
        street: enteredStreetIsValid,
        city: enteredCityIsValid,
        postalCode: enteredPostalCodeIsValid
    });

    const formIsValid = 
        enteredNameIsValid &&
        enteredStreetIsValid &&
        enteredCityIsValid &&
        enteredPostalCodeIsValid;

        if(!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostalCode
        });
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? '' : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? '' : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? '' : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? '' : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>نام</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValidity.name && <p>لطفا یک نام معتبر وارد کنید!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>آدرس</label>
        <input type='text' id='street' ref={streetInputRef}/>
        {!formInputsValidity.street && <p>لطفا یک آدرس معتبر وارد کنید!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>کد پستی</label>
        <input type='text' id='postal' ref={postalCodeInputRef}/>
        {!formInputsValidity.postalCode && <p>لطفا یک کدپستی معتبر وارد کنید!</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>شهر</label>
        <input type='text' id='city' ref={cityInputRef}/>
        {!formInputsValidity.city && <p>لطفا یک شهر معتبر وارد کنید!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          لغو
        </button>
        <button className={classes.submit}>تایید</button>
      </div>
    </form>
  );
};

export default Checkout;