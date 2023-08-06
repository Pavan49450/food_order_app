import React from 'react';
import Header from "./components/Layout/Header"
import Meals from "./components/Meals/Meals"
import Cart from "./components/Cart/Cart"
import { useState } from "react";
import CartProvider from "./Store/CartProvider"
import Footer from "./components/Footer/Footer"

function App() {

  const [showCart, setShowCart] = useState(false);

  const showCartHandler=()=>{
    setShowCart(true);
  }
  const hideCartHandler=()=>{
    setShowCart(false);

  }

  return<CartProvider>
    {showCart && <Cart onHide={hideCartHandler}/>}
    <Header onShow={showCartHandler}/>
    <main>
      <Meals/>
    </main>
    <Footer/>
  </CartProvider>;
};

export default App;