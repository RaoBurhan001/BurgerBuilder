import React from'react';
import classes from './input.css'

const input=(props)=>{
let inputElement=null;
let validationError=null;
const inputClasses=[classes.InputElement]

if(props.invalid && props.touch)
{
validationError=<p className={classes.ValidationError}>Please enter a valid value</p>
}



if(props.invalid && props.shouldValidate && props.touch)
{
    inputClasses.push(classes.Invalid)

}

switch(props.elementtype)
{
    case ('input'):
        inputElement=<input  
        className={inputClasses.join(' ')}{...props} 
        {...props.elementconfig}  
        value={props.value} 
        onChange={props.changed}
        />
        break;

    case('select'):
    inputElement=
    (<select
    className={inputClasses.join(' ')} {...props} 
      value={props.value}>
          {props.elementconfig.options.map(option=>(
              <option 
              key={option.Value}
              value={option.Value}>
            {option.DisplayValue}
              </option>
          ))}
          
          
          </select>)
    break;

    default:
        inputElement=<input 
        className={inputClasses.join(' ')} {...props} 
        {...props.elementconfig} 
         value={props.value}
         onChange={props.changed}
         />

}
    return (
<div className={classes.Input}>
    <label className={classes.Label}>{props.label}</label>
    {inputElement}
    {validationError}
</div>
    )
}

export default input;