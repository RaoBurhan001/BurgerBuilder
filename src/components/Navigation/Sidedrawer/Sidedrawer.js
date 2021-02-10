import React from'react';
import classes from'./Sidedrawer.css';
import Navigation from'../../Navigationitems/Navigationitems';
import Logo from'../../Logo/Logo';
import Backdrop from'../../UI/Modal/Backdrop/Backdrop';
const sidedrawer=(props)=>{

let assginedClass=[classes.SideDrawer,classes.Close];
if(props.open)
{
    assginedClass=[classes.SideDrawer,classes.Open];
}


    return(
        <div>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={assginedClass.join(' ')} onClick= {props.closed}>
            <div className={classes.Logo}>
            <Logo/>
            </div>
            <nav>
                <Navigation isAuthenticated = {props.isAuth}/>
            </nav>
        </div>
        </div>

    )
}
export default sidedrawer