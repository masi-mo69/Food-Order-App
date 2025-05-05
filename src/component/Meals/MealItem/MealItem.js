import { useContext } from 'react';
import classes from './MealItem.module.css';
import MealItemForm from '../MealItemForm';
import CartContext from '../../../store/cart-context';

const MealItem = (props) => {
    const cartCtx = useContext(CartContext);
    
    // Convert dollar price to Toman (at a dollar rate of 50,000 Toman)
    const exchangeRate = 50000;
    const priceInTomans = props.price * exchangeRate;
    
    const formattedPrice = priceInTomans.toLocaleString('fa-IR') + ' تومان';

    const addToCartHandler = amount => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price 
        });
    };

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{formattedPrice}</div>
            </div>
            <div>
                <MealItemForm onAddToCart={addToCartHandler}/>
            </div>
        </li>
    );
};

export default MealItem;