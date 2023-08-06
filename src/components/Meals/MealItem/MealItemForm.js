import React,{ useRef, useState} from "react"
import Button from "../../UI/Button/Button"
import "./MealItemForm.css";
import Input from "../../UI/Input/Input"

const MealItemForm =(props)=>{
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submithandler=(e)=>{
    e.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    console.log(enteredAmountNumber);
    if(enteredAmount.trim().length === 0 || 
    enteredAmount.trim().length < 1 || 
    enteredAmount.trim().length > 10){
      setAmountIsValid(false)
      return;
    }
    props.onAddCart(enteredAmountNumber);
  };
  return<React.Fragment>
  <form onSubmit={submithandler}>
    <Input ref={amountInputRef} className="amount_input" label='Amount: ' input={{
      type:"number",
      step:'1',
      // min:'0',
      // max:'100',
      defaultValue:'1',
      id:'amount'
      }}/>
    <Button className="add_btn" type='submit'>+ Add</Button>
    {!amountIsValid && <p>Enter valid amount between 1-10.</p>}
    </form>
  </React.Fragment>;
};

export default MealItemForm;