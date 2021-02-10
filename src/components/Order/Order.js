import React from'react';
import classes from './Order.css';
import Button from '../UI/Modal/Button/Button';
const order =(props)=>{

let ingredients=[]

for(let ingredientsName in props.ingredients)
{
    ingredients.push({
        name: ingredientsName,
        amount: props.ingredients[ingredientsName]
    })
}
let ingredientsOutput= ingredients.map(ig=>{
return <span
style={
    {
        textTransform:'capitalize',
        display:'inline-block',
        margin:'0,10px',
        border:'1px solid #ccc',
        padding:'10px'
    }
}
>{ig.name} ({ig.amount})</span>
})
// console.log(props.ingredients)
return (

    <div className={classes.Order}>
<p><strong>Ingredients:</strong> {ingredientsOutput} </p>
<p><strong> Price : {props.price} Rs</strong></p>
{/* <Button btnType="Danger"clicked= {props.Delete}>CANCEL</Button> */}
    </div>
)
}

export default order;