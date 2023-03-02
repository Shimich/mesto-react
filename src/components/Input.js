import React from "react";

function Input(props) {
    return(
<input 
type={props.type}
className='popup__input'
name={props.name}
id={props.id}
minLength={props.minlength}
maxLength={props.maxlength}
required
onChange={gh}
/>
    );
}

export default Input