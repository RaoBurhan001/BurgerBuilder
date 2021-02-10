import React from 'react';
import Image from'../../Assets/Image/28.1 burger-logo.png';
import classes from'./Logo.css';

const logo=(props)=>(
<div className={classes.Logo}>
    <img src={Image} alt='MyBurger'></img>
</div>

)
export default logo;