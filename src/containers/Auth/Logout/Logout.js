import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actionTypes from '../../../store/actions/index';

class Logout extends Component{

    componentDidMount(){
this.props.onLogout()
    }


    render()
    {
        return (
<Redirect to= '/'/>
        )
    }
}
const MapDispatchtoProps = dispatch=>{
    return {
        onLogout : ()=> dispatch(actionTypes.logout())
    }
}
export default connect(null, MapDispatchtoProps)(Logout)