import React ,{Component} from'react';
import Button from'../../../components/UI/Modal/Button/Button';
import classes from'./ContactForm.css';
import axios from '../../../axios';
import ErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Modal/Spinner/Spinner';
import Input from '../../../components/input/input';
import { connect } from 'react-redux';
import { ChangeValidity} from '../../../store/utilityfunctions/validity';
import * as actionTypes from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';
class Contact extends Component{

state={
    orderForm:{
    name:{
elementtype: 'input',
elementconfig:{
    type:'text',
    placeholder:'Your Name'
},
value:'',
validation: {
    required: true
},
valid: false,
touched:false
    },
    email:{
        elementtype: 'input',
        elementconfig:{
            type:'email',
            placeholder:'Your Mail'
        },
        value:'',
        
        validation: {
            required: true
        },
        valid: false,
        touched:false
            },
        street:{
            elementtype: 'input',
            elementconfig:{
                type:'text',
                placeholder:'Street'
            },
            value:'',
            
            validation: {
                required: true
            },
            valid: false,
            touched:false
                },
        postalcode:{
            elementtype: 'input',
            elementconfig:{
                type:'text',
                placeholder:'Postal Code'
            },
            value:'',
            
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched:false

                },
                delieverymethod:{
                    elementtype: 'select',
                    elementconfig:{
                        options:[
                        {Value:'fastest' , DisplayValue:'Fastest'},
                        {Value :'cheapest', DisplayValue:'Cheapest'}],
                        value:''
                    },
                    valid:true
                    },
                    
                        },
    isValid:false,
 
    loading : false
}



ChangeValueHandler=(event,inputIdentifier)=>{

    const updateOrderform= {
        ...this.state.orderForm
    }
    const updateElement={
        ...updateOrderform[inputIdentifier]
    }
    updateElement.value=event.target.value;
    updateElement.valid= ChangeValidity(updateElement.value,updateElement.validation)
    updateElement.touched=true;
    updateOrderform[inputIdentifier]=updateElement
    let formValid=true;
    for(let key in updateOrderform)
    {
        formValid=updateOrderform[key].valid && formValid
    }
    console.log(formValid)
    
    this.setState({orderForm:updateOrderform , isValid:formValid})
}




OrderHandler=(event)=>{
    event.preventDefault();
// this.setState({loading:true})
const formData = {};
for (let formElementIdentifier in this.state.orderForm) {
    formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
}
    //its like name = name.value(Burhan)
    const order={ // this is tha data of order which we need in Order data
    ingredients:this.props.ingrs,
    price:this.props.price,
    orderData:formData,
    userId:this.props.userId
   }
 console.log(order)
   this.props.onOrder(order ,this.props.token)



}

    render()
    {
        
const formElement=[]
for(let key in this.state.orderForm)
{
    formElement.push({
        id:key,
        Config:this.state.orderForm[key]
        //in elementConfig the whole object will be stored of name {} email{} and ...
    })
}

        let form=(
            <form onSubmit={this.OrderHandler}>
    {formElement.map(element=>(
        <Input 
        key={element.id}
         elementtype={element.Config.elementtype}
         elementconfig={element.Config.elementconfig}
         value={element.Config.value}
         invalid={!element.Config.valid}
         shouldValidate={element.Config.validation}
         touch={element.Config.touched}
         changed={(event)=>this.ChangeValueHandler(event,element.id)}

        />
    ))}
         <Button btnType='Success' disabled={!this.state.isValid}>ORDER</Button>
</form>)

        if(this.state.loading)
        {
             form=<Spinner/>
        }
     
        let summary = <Redirect to="/"/>
        if(this.props.ingrs)
        {
            const Purchasedredirect = this.props.purchased ? <Redirect to = "/"/> : null
            summary=(
                <div>
                {Purchasedredirect}
               
            
             
                 </div>
            )
        }
       return(
<div className={classes.Contactform}>
    <h3>ddadadadd</h3>
    <h1>Enter Your Details here</h1>
       {form}
       {summary}
    
</div>
        )
    }
}
const mapStatetoProps = state=>{
    return {
        ingrs:state.BurgerBuilder.ingredients,
        price: state.BurgerBuilder.total ,
        token : state.auth.token,
        userId: state.auth.userId,
        purchased: state.order.purchased
    }
}

const mapDispatchtoProps = dispatch =>{
    return {
    onOrder: (orderData ,token )=> dispatch(actionTypes.PurchaseHandler(orderData , token))
}}
export default connect(mapStatetoProps,mapDispatchtoProps) (ErrorHandler( Contact,axios));