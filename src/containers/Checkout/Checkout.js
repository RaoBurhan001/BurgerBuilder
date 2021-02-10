import React ,{Component} from 'react';
import CehckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import { Redirect, Route } from 'react-router-dom';
// import ContactForm from './ContactForm/ContactForm';
import { connect } from 'react-redux';
// import Spinner from '../../components/UI/Modal/Spinner/Spinner';
// import * as actionTypes from '../../store/actions/index';
class Checkout extends Component{

// state={
//     ingredients:null,
//     price:0
// }

// componentWillMount()    ///component wil mount is to late as it runs before the render but it doesn't prevent the rendering of old props 
// {
//     this.props.onPurchase()
// }
// console.log(this.props)
// const query= new URLSearchParams(this.props.location.search)
// const ingredients={}
// let price=0
// for(let param of query.entries())
// {
//     if(param[0]==='price')
//     {
//         price=param[1]
//     }
//     else{
//     //['salad':'1']
//     ingredients[param[0]]=+param[1]
// }}
// this.setState({ingredients:ingredients ,total:price})



checkoutcancel=()=>
(
    this.props.history.goBack()
)

checkoutContinue=()=>
(
this.props.history.replace('/contact-form')

)


    render()
    {
        let summary = <Redirect to="/"/>
        if(this.props.ingrs)
        {
            const Purchasedredirect = this.props.purchased ? <Redirect to = "/"/> : null
            summary=(
                <div>
                {Purchasedredirect}
               
                <CehckoutSummary 
                continue={this.checkoutContinue}
                cancel={this.checkoutcancel}
                ingredients={this.props.ingrs}   />
             
                 </div>
            )
        }
        return summary
        
    }

}
const mapStatetoProps = state =>{
    return {
ingrs: state.BurgerBuilder.ingredients,
 purchased: state.order.purchased
}}

// const mapDispatchtoProps = dispatch =>{
//     return {
//         onPurchase : ()=>dispatch(actionTypes.purchaseInit())
//         }
// }

export default connect(mapStatetoProps )( Checkout);

// render={(props)=>(
//     //    <ContactForm ingredients={this.state.ingredients} price={this.state.total} {...props}/>
//        //We have to send props in render method else the this.props.history.push('/') in ContactForm wont have anything
//    )}