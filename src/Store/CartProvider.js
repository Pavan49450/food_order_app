import React, { useReducer } from 'react';
import CartContext from './CartContext';

const DefaultCartState = {
  items: [],
  totalAmount: 0,
};

const CartReducer = (state, action) => {
  if (action.type === 'ADD') {
    // const updateTotalAmount = state.items.amount + action.item.amount;
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updateCartItems;

    if (existingCartItem) {
      const updateCartItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updateCartItems = [...state.items];
      updateCartItems[existingCartItemIndex] = updateCartItem;
    } else {
      updateCartItems = state.items.concat(action.item);
    }

    const updateTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    return {
      items: updateCartItems,
      totalAmount: updateTotalAmount,
    };
  }
  if (action.type === 'REMOVE') {
    console.log(action.id);
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updateTotalAmount = state.totalAmount - existingCartItem.price;
    let updateCartItems;
    if (existingCartItem.amount === 1) {
      updateCartItems = state.items.filter((item) => item.id !== action.id);
      console.log(updateCartItems);
    } else {
      const updateCartItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      console.log(updateCartItem);
      updateCartItems = [...state.items];
      updateCartItems[existingCartItemIndex] = updateCartItem;
    }
    return {
      items: updateCartItems,
      totalAmount: updateTotalAmount,
    };
  }
  if(action.type === 'CLEAR'){
    return DefaultCartState;
  }
  return DefaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    CartReducer,
    DefaultCartState
  );

  const addItemToTheCartHandler = (item) => {
    console.log('added Item');
    dispatchCartAction({ type: 'ADD', item: item });
  };

  const removeItemInTheCartHandler = (id) => {
    console.log('removed Item');
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  const clearCartItemsHandler=()=>{
    dispatchCartAction({type : 'CLEAR'});
  }

  return (
    <CartContext.Provider
      value={{
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToTheCartHandler,
        removeItem: removeItemInTheCartHandler,
        clearCart : clearCartItemsHandler,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
