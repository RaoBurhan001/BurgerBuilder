import React from 'react';
import classes from'./Toolbar.css';
import Logo from'../../Logo/Logo';
import Navigation from'../../Navigationitems/Navigationitems';
import DrawerToggle from'../Sidedrawer/Toggle/Toggle';


const toolbar=(props)=>(
<header className={classes.Toolbar}>
<DrawerToggle change={props.clicked}></DrawerToggle>
<Logo/>
<nav className={classes.DesktopOnly}>
    <Navigation  isAuthenticated = {props.isAuth}/>
</nav>
</header>

);
export default toolbar