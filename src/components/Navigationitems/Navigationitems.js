import React from 'react';
import classes from'./Navigationitems.css';
import Navigationitem from'./Navigationitem/Navigationitem';


const navigations=(props)=>(
<ul className={classes.NavigationItems}>
    <Navigationitem link="/" >Burger </Navigationitem>
   {props.isAuthenticated? <Navigationitem link="/orders" >Orders </Navigationitem> : null}
   { !props.isAuthenticated ?
    <Navigationitem link="/auth" >Authenticate </Navigationitem>:
    <Navigationitem link="/logout" >Logout</Navigationitem>
    }
</ul>

)
export default navigations;