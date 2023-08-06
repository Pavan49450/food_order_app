import React from "react"

const Input = React.forwardRef((props,ref)=>{
  return<div className={props.className}>
    <label>{props.label}
    <input ref={ref} htmlFor={props.input.id} {...props.input}/>
    </label>
  </div>;
});

export default Input;