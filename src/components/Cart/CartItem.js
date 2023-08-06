import React from "react";
import "./CartItem.css";
import Button from "../UI/Button/Button"

const CartItem =(props)=>{
  return<li className="CartItem">
    <div className="CartItem_info">
      <h3 className="CartItem-name">{props.name}</h3>
      <div className="CartItem_count_price">
        <div className="CartItem-price">${props.price}</div>
        <div className="CartItem-amount">x {props.amount}
      </div>
      </div>
    </div>
    <div className="CartItem_actions">
      <Button onClick={props.onRemove}>-</Button>
      <Button onClick={props.onAdd}>+</Button>
    </div>
  </li>
}

export default CartItem;