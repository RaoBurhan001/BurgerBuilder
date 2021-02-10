import React from 'react';
import Button from'../../UI/Modal/Button/Button';



 const orderSummary=(props)=>{

const ingredientSummary=Object.keys(props.ingredients)
.map(igKEy=>{
return( <li key={igKEy}>
    <span style={{textTransform:'capitalize'}}>{igKEy}</span>
    :{props.ingredients[igKEy]}</li>)
})


return (
    <div>
<h3>Your Order</h3>
<p>A delicious burger with following ingredients</p>
<ul>
    {ingredientSummary}
</ul>
<p><strong>TOTAL BILL :  {props.price}</strong></p>
<p>Checkout</p>
<Button btnType="Danger" clicked={props.cancel}>CANCEL</Button>
<Button btnType="Success"clicked={props.continued}>CONTINUE</Button>
</div>

)
 }

export default orderSummary;
 