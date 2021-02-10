import React from'react'
import classes from './BuildControl.css';

const burgerControl=(props)=>(

    <div className={classes.BuildControl}>
        <button onClick={props.removed} className={classes.Less} disabled={props.disabled}>Less</button>
        <div className={classes.Label}>{props.label}</div>
        <button onClick={props.added} className={classes.More}>More</button>



    </div>
)
export default burgerControl;