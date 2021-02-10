import React from 'react';
import BugerIngredient from'./BurgerIngredients/BurgerIngredients';
import classes from'./Burger.css';

const burger=(props)=>{
   let transformedIngredients=Object.keys(props.ingredients)   //it creates an array of keys salad meat cheese and bacon the quantity is not part of it 
   .map((igKey)=>{
       return [...Array(props.ingredients[igKey])].map((_,i)=>{   //here you will create an array of lenth 2 like salad:2 [,]an array of two elements
          return  <BugerIngredient key={igKey+i} type={igKey}/>
       });
   })
   .reduce((arr,el)=>{
       return arr.concat(el)
   },[])    
   console.log({transformedIngredients})
   if(transformedIngredients.length===0)
   {
       transformedIngredients=<p>Please start adding ingredients!</p>
   }
   
   return(
<div className={classes.Burger}>
<BugerIngredient type="bread-top"/>
{transformedIngredients}
<BugerIngredient type="bread-bottom"/>

</div>
)
}
export default burger;