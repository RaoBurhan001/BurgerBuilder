import React ,{Component}from 'react';
import Auxiliary from'../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from'../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Order from'../../components/Burger/OrderSummary/OrderSummary';
import axios from'../../axios';
import Spinner from'../../components/UI/Modal/Spinner/Spinner';
//import orderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withError from '../../hoc/withErrorHandler/withErrorHandler';
//import order from '../../components/OrderSummary/OrderSummary';
import *as actionTypes from '../../store/actions/index';
import { connect } from 'react-redux';




class BurgerBuilder extends Component{
   
state={
    //    ingredients:null,
    //    total:200,
       purchasable:false,
       purchasing:false,
    //    loading:false,
    //    error:false
   }
   
componentDidMount() {
    console.log(this.props)
    this.props.OnFetchIngredients()

 }



   updatePurchaseState (ingredients) {
   
    const sum = Object.keys( ingredients )
        .map( igKey => {
            return ingredients[igKey];
        } )
        .reduce( ( sum, el ) => {
            return sum + el;
        }, 0 );
return sum > 0 } ;


   

purchaseHandler=()=>{
    if(this.props.isAutenticated)
    {
    this.setState({purchasing:true})}
    else{
    this.props.history.push('/auth')}
};

cancelPurchase=()=>{

    this.setState({purchasing:false})
}

continueHandler=()=>{
    this.props.onInitPurchase()
this.props.history.push('/checkout')


 }


cancelHandler=()=>{
    this.setState({purchasing:false})
}
    render(){

        console.log(this.state.purchasing);

const disableInfo={
    ...this.props.ingrs
}

let ordersummary = null;

let burger = this.props.error ? <p> Oops ! Ingredients can not be load </p> : <Spinner/>


if(this.props.ingrs)
{
    burger=(
<Auxiliary>
<Burger ingredients={this.props.ingrs}/>
        <BuildControls
         ingredientAdded={this.props.IngredientsAdd}
         ingredientRemoved={this.props.IngredientsRemove}
         disabled={disableInfo}
        price={this.props.price}
        isAuth = {this.props.isAutenticated}
        purchasable={this.updatePurchaseState(this.props.ingrs)}
        purchasing={this.purchaseHandler}
        />
</Auxiliary>
    );
     ordersummary=<Order
    ingredients={this.props.ingrs}
    continued={this.continueHandler}
    cancel={this.cancelPurchase}
    price={this.props.price}
    />
    
}

// if(this.state.loading)
// {
//     ordersummary=<Spinner/>
// }



for(let key in disableInfo)
{
    console.log(key);
    disableInfo[key]=disableInfo[key] <=0; //if the tha value of salad is less than or equal to zero it will return true else false
    console.log(disableInfo)
}

        return(
    <Auxiliary> 
        <Modal show={this.state.purchasing} modalClosed={this.cancelPurchase} >
            
        {ordersummary}
        </Modal>
        {burger}
    </Auxiliary>
        
        )
        
    }

   
}
const mapStateToProps = state =>{
    return{
    ingrs: state.BurgerBuilder.ingredients,
    price: state.BurgerBuilder.total,
    error: state.BurgerBuilder.error,
    // purchasable: state.BurgerBuilder.purchasable,
    isAutenticated : state.auth.token !=null 
    }
}
const mapDispatchToProps = dispatch =>{
    return {
    IngredientsAdd : (ingrName)=>dispatch (actionTypes.addIngredient(ingrName)), //sending ingredients name from build controls
    IngredientsRemove : (ingrName)=>dispatch (actionTypes.removeIngredient(ingrName)),
    OnFetchIngredients : ()=>dispatch (actionTypes.FetchIngredients()),
    onInitPurchase: () => dispatch(actionTypes.purchaseInit())
}}
export default  connect( mapStateToProps , mapDispatchToProps)(withError(BurgerBuilder,axios));
