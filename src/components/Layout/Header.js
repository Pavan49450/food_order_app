import React, {useContext} from 'react';
import './Header.css';
import Button from '../UI/Button/Button';
import CartIcon from '../Cart/CartIcon';
import CartContext from "../../Store/CartContext";

const Header = (props) => {
  const CartCtx = useContext(CartContext);
  const noOFCartItem = CartCtx.items.reduce((curNumber,item)=>{
    return curNumber + item.amount;
  },0);
// const btnClasses = `${}`
  return (
    <React.Fragment>
      <header className="header">
        <h1>
          PavaN<span>Go</span>
        </h1>
        <Button onClick={props.onShow} className="btn">
          <span>
            <CartIcon />
          </span>
          <span>Cart</span>
          <span className="count">{noOFCartItem}</span>
        </Button>
      </header>
      <div className="image">
        <img src="https://th.bing.com/th/id/OIP.qW7EAYaNx6NmWo_xLoUxtAHaEK?w=300&h=180&c=7&r=0&o=5&pid=1.7" alt="table full of delicious food!"/>
      </div>
    </React.Fragment>
  );
};

export default Header;
