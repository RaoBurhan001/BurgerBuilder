import React from 'react';
import classes from'./Navigationitem.css';
import { NavLink } from 'react-router-dom';

const navigation=(props)=>(
<li className={classes.NavigationItem}>
<NavLink  exact
activeClassName={classes.active}
to={props.link}>
{props.children}</NavLink>
</li>

)
export default navigation;