import React from 'react';
import classes from './Toggle.css';
const toggle=(props)=>(
    <div className={classes.DrawerToggle}
    onClick={props.change}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)
export default toggle;

