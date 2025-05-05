import { useRef, useState } from 'react';
import classes from './MealItemForm.module.css';
import Input from '../UI/Input';

const MealItemForm = (props) => {
    const [ amountIsValid , setAmountIsValid ] = useState(true); 

    const amountInputRef = useRef();

    const onSubmitHandler = event => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if(enteredAmount.trim().length === 0 ||
            enteredAmountNumber < 1 ||
            enteredAmountNumber > 5
        ) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmountNumber);
    }
    return (
        <form className={classes.form} onSubmit={onSubmitHandler}> 
            <Input 
            ref = {amountInputRef}
            label = 'تعداد سفارش'
            input = {{
                id: 'amount_' + props.id ,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1',
            }} 
            />
            <button>+ افزودن</button>
            {!amountIsValid && <p>لطفا یک مقدار معتبر وارد کنید (1-5) </p>}
        </form>
    );
}
export default MealItemForm;