import React from 'react';
import classes from './Backdrop.css';

const backdrop=(props)=>(
    
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}>
<p>{props.children}</p>
    </div>:null

)
export default backdrop;