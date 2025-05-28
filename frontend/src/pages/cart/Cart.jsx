import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Cart.css';
import { increaseQuantity, decreaseQuantity, clearCart, removeFromCart } from '../../redux/slices/cartSlice';

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();

    const handleIncrease = (id, selectedSize, stock) => {
        dispatch(increaseQuantity({ id, selectedSize, stock }));
    };

    const handleDecrease = (id, selectedSize) => {
        dispatch(decreaseQuantity({ id, selectedSize }));
    };
    const handleRemove = (id, selectedSize) => {
        dispatch(removeFromCart({ id, selectedSize }));
    };
    
    const handleClearCart = () => {
        dispatch(clearCart());
    };
    // Flatten items by quantity
    const flattenedItems = cartItems.flatMap(item =>
        Array.from({ length: item.quantity }, () => ({
            ...item,
            quantity: 1 
        }))
    );

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className='cart-page'>
            <div className="cart-page-header">
                <h3 className="cart-title">Shopping Cart</h3>
                <p className="cart-item-amount">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
            </div>

            <div className="cart-page-container">
                <div className="cart-items-list">
                    <div className="cart-items-list-header">
                        <p>Product</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Total</p>
                    </div>

                    {cartItems.length === 0 ? (
                        <p className="empty-cart">Your cart is empty.</p>
                    ) : (
                        cartItems.map((item, index) => (
                            <div className="cart-item" key={item._id + index}>
                                <div className="cart-item-details-wrapper">
                                    <img src={item.images[0]} alt={item.name} className="cart-item-image" />
                                    <div className="cart-item-details">
                                        <p className="cart-item-name">{item.name}</p>
                                        <p>Color: {item.color}</p>
                                        <p>Size: {item.selectedSize}</p>
                                    </div>
                                </div>
                                <p>${item.price.toFixed(2)}</p>
                                <div className="cart-item-quantity">
                                    <button onClick={() => handleDecrease(item._id, item.selectedSize)}>-</button>
                                    <p>{item.quantity}</p>
                                    <button
                                    onClick={() => {
                                        const matchedSize = item.sizes.find(s => s.size === item.selectedSize);
                                        const stock = matchedSize?.stock || 0;
                                        handleIncrease(item._id, item.selectedSize, stock);
                                    }}
                                    disabled={item.quantity >= (item.sizes.find(s => s.size === item.selectedSize)?.stock || 0)}
                                    >
                                    +
                                    </button>

                                </div>
                                <p>${(item.price * item.quantity).toFixed(2)}</p>

                            </div>
                        ))
                    )}
                </div>

                <div className="cart-checkout-container">
                    <div className="cart-checkout-content">
                        <h4>Summary</h4>
                        {flattenedItems.map((item, index) => (
                            <div className='cart-checkout-item' key={item._id + '-summary-' + index}>
                                <p>{item.name}</p>
                                <p>${item.price.toFixed(2)}</p>
                            </div>
                        ))}
                        <hr />
                        <div className="cart-total">
                            <strong>Total:</strong> ${totalPrice.toFixed(2)}
                        </div>
                    </div>
                    <button className="checkout-btn">Proceed to Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
