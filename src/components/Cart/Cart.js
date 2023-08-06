import React, { useContext, useState, useEffect } from 'react';
import './Cart.css';
import CartContext from '../../Store/CartContext';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
  const CartCtx = useContext(CartContext);
  const [isOrder, setIsOrder] = useState(false);
  const [orderIsSubmitting , setOrderIsSubmitting] =useState(false);
  const [orderIsSubmitted , setOrderIsSubmitted] =useState(false);
  const cartItemRemoveHandler = (id) => {
    CartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    console.log(item.amount);
    CartCtx.addItem(item);
  };
  const showCheckoutFormHandler = () => {
    setIsOrder(true);
  };
  const hideCheckOutFormHandler = () => {
    setIsOrder(false);
  };
  const totalAmount = CartCtx.totalAmount.toFixed(2);
  const noOfItems = CartCtx.items.length > 0;
  const CartItems = CartCtx.items.map((item) => (
    <CartItem
      name={item.name}
      id={item.id}
      key={item.id}
      description={item.description}
      price={item.price}
      amount={item.amount}
      onAdd={cartItemAddHandler.bind(null, item)}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
    />
  ));

  const submitOrderHandler = async (userData) => {
    setOrderIsSubmitting(true)
    await fetch('https://food-order-71a8c-default-rtdb.firebaseio.com/orders.json',
      { 
        method: 'POST', 
        body: JSON.stringify({ user: userData, orderItems: CartCtx.items }),
      });
      setOrderIsSubmitting(false);
      setOrderIsSubmitted(true);
      CartCtx.clearCart();
  };
  const cartModal =(
    <>
      <ul className="Cart_items">
        <h2>Cart</h2>
        {CartItems}
        <div className="total">
          <span>Total Amount: </span>
          <span>${totalAmount}</span>
        </div>
        {isOrder && (
          <Checkout
            hideCheckOutForm={hideCheckOutFormHandler}
            onConfirm={submitOrderHandler}
          />
        )}
        <div className="Cart_items_btns">
          <button className="close_btn" onClick={props.onHide}>
            Close
          </button>
          {noOfItems && !isOrder && (
            <button onClick={showCheckoutFormHandler} className="order_btn">
              Order
            </button>
          )}
        </div>
      </ul>
    </>
  );

  const isSubmittingModalCart = <p className="Cart_items">Sending order data...</p>

  const orderSubmittedModal = <div className="Cart_items">
  <p className="Submit_msgs">Your order is Submitted</p><button className="close_btn" onClick={props.onHide}>
            Close
          </button></div>

  return (
    <div className="overlay">
      {(orderIsSubmitting) ?(isSubmittingModalCart) :(orderIsSubmitted ?orderSubmittedModal :cartModal)}
    </div>
  );
};

export default Cart;
