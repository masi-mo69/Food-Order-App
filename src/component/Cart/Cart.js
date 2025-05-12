import { useContext, useState } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
    const [isCheckout , setIsCheckOut] = useState(false);
    const cartCtx = useContext(CartContext);
    
    // Convert the total price to Tomans (at a dollar rate of 50,000 Tomans)
    const exchangeRate = 50000;
    const totalInTomans = cartCtx.totalAmount * exchangeRate;
    const formattedTotal = totalInTomans.toLocaleString('fa-IR') + ' تومان';
    
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        cartCtx.addItem({
            ...item,
            amount: 1
        });
    };

    const orderHandler = () => {
        setIsCheckOut(true);
    };

    const submitOrderHandler = (userData) => {
        fetch('https://react-http-ef6d7-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        })
    };

    const cartItems = 
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem 
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price * exchangeRate} // Send Price to Tomans
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>;

        const modalActions = (
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>
                    بستن
                </button>
                {hasItems && (
                    <button className={classes.button} onClick={orderHandler}>
                        سفارش
                    </button>
                )}
            </div>
        );

    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>مجموع کل</span>
                <span>{formattedTotal}</span>
            </div>
            { isCheckout && 
            <Checkout 
                onConfirm={submitOrderHandler} 
                onCancel={props.onClose}
            />
            }
            { !isCheckout && modalActions }
        </Modal>
    );
}

export default Cart;