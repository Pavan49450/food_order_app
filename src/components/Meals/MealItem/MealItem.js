import React,{useContext} from "react"
import "./MealItem.css"
import MealItemForm from "./MealItemForm"
import CartContext from "../../../Store/CartContext"

const MealsItem =(props)=>{
  const CartCtx = useContext(CartContext);
  
  const AddCartHandler=(amount)=>{
    CartCtx.addItem({
      id:props.id,
      name:props.name,
      amount:amount,
      price:props.price
    })
  }

  return<li className="mealItem">
    <div className="mealItem_info">
      <h3 className="meal-name">{props.name}</h3>
      <div className="meal-description">{props.description}</div>
      <div className="meal-price">${props.price}</div>
    </div>
    <div className="form"><MealItemForm onAddCart={AddCartHandler}/></div>
  </li>;
};

export default MealsItem;