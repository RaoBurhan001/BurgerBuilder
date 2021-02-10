import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from'./containers/BurgerBuilder/BurgerBuilder';
import Checkout from'./containers/Checkout/Checkout';
import { Route, Switch,Redirect} from 'react-router-dom';
import Orders from'./containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actionTypes from './store/actions/index';
import { connect } from 'react-redux';
import ContactForm from './containers/Checkout/ContactForm/ContactForm';
//import Layout from './components/Layout/Layout';

class App extends Component {
componentDidMount(){
  this.props.StoreLogin()
}



  render() {

    let routes = null

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path ='/auth' component={Auth}/>
          <Route path="/logout" component={Logout} />
          <Route path={'/contact-form'}
                 component={ContactForm}/>
         <Redirect to ='/'/>
        </Switch>
      );
    }
    return (
      <div >

        <Layout>
        {/* <Link to ='/'>Burger</Link>
        <Link to ='/checkout'>Checkout</Link> */}

           <Switch> 
          <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
       {routes}
       <Redirect to ='/'/>
      

          </Switch>
{/* Use exact or Switch in order to render different page and pattern method in Switch */}
        </Layout>
          
      </div>
    );
  }
}
const MApStatetoProps = state=>{
  return {
    isAuthenticated: state.auth.token !==null
  }
}
const MapDispatchToProps = dispatch =>{
  return {
  StoreLogin :()=>dispatch(actionTypes.authCheckState())
}}
export default connect(MApStatetoProps, MapDispatchToProps)( App);
