import React,{Component} from 'react';
import Auxiliary from'../../hoc/Auxiliary/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from'../Navigation/Sidedrawer/Sidedrawer';
import './Layout.css';
import { connect } from 'react-redux';


class Layout extends Component{

state={
    Showsidedrawer:true
}

SidedrawerHandler=()=>{
    this.setState({Showsidedrawer:false})
}

SidedrawerToggler=()=>{ 
    this.setState(prevState=>{
        return {Showsidedrawer:!prevState.Showsidedrawer}
    })
}


render()
{
    return(
    <Auxiliary>
        <Toolbar 
        isAuth= { this.props.isAuthenticated}
        clicked={this.SidedrawerToggler}/>
        <Sidedrawer 
        isAuth= { this.props.isAuthenticated}
         open={this.state.Showsidedrawer}
        closed={this.SidedrawerHandler}/>
    <main >
        {this.props.children}
    </main>
    </Auxiliary>)
}}

const MapStatetoProps = state=>{
    return {
isAuthenticated : state.auth.token !== null

    }
}


export default connect (MapStatetoProps) (Layout);