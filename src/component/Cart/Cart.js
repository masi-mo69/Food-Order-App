import { useContext } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    
    // تبدیل قیمت کل به تومان (با نرخ دلار 50,000 تومان)
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
    }

    const cartItems = 
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem 
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price * exchangeRate} // ارسال قیمت به تومان
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>;

    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>مجموع کل</span>
                <span>{formattedTotal}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>بستن</button>
                {hasItems && <button className={classes.button}>سفارش</button>}
            </div>
        </Modal>
    );
}

export default Cart;