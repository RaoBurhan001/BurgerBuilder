import React , {Component}from 'react'
import Input from '../../components/input/input';
import Button from '../../components/UI/Modal/Button/Button';
import classes from './Auth.css';
import Spinner from '../../components/UI/Modal/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { ChangeValidity} from '../../store/utilityfunctions/validity';
import { Redirect } from 'react-router-dom';
class Auth extends Component {

    state={
        orderForm:{
            // name:{
            
            //         elementtype: 'input',
            //         elementconfig:{
            //             type:'name',
            //             placeholder:'Name'
            //         },
            //         value:'',
            //         validation: {
            //             required: true,
            //             minLength: 4
            //         },
            //         valid: false,
            //         touched:false
            //             }
            // ,
        email:{
    elementtype: 'input',
    elementconfig:{
        type:'email',
        placeholder:'E-Mail'
    },
    value:'',
    validation: {
        required: true,
        isEmail: true
    },
    valid: false,
    touched:false
        },
    
        password:{
            elementtype: 'input',
            elementconfig:{
                type:'password',
                placeholder:'Password'
            },
            value:'',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched:false
                }
    },
isSignup :true}


        
ChangeValueHandler=(event,controlName)=>{

             const updatedControls = {
            ...this.state.orderForm,
            [controlName]: {
                ...this.state.orderForm[controlName],
                value: event.target.value,
                valid: ChangeValidity(event.target.value, this.state.orderForm[controlName].validation),
                touched: true
            }
        };
        this.setState({orderForm: updatedControls});
    }

changeSigninhandler =()=>{
this.setState(prevState=>{
    return {
    isSignup :!prevState.isSignup
}
})}


submitHandler = (event)=>{
event.preventDefault();
this.props.onAuth(this.state.orderForm.email.value, this.state.orderForm.password.value , this.state.isSignup)
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
let errorMessage = null
if(this.props.error)
{
    errorMessage = (
        <p> {this.props.error.message} </p>  //message is the property provided by the firebase
    )
}
 

let form=(
    <form >
        { !this.state.isSignup ? <h3> SIGN IN</h3> : <h3>SIGN UP</h3>}
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
 
</form>)
if(this.props.loading){
    form =<Spinner/>
}

let authredirect =null;
if(this.props.isAuthenticated && this.props.building)
{
    authredirect = <Redirect to ='/checkout'/>
}
if(this.props.isAuthenticated  && !this.props.building)
{
    authredirect = <Redirect to = '/'/>
}

return (
            <div className={classes.Auth}>
                {authredirect }
        {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                <Button btnType='Success'>SUBMIT</Button>
                </form>
                
<Button btnType = 'Danger'
     clicked= {this.changeSigninhandler}> SWITCH TO
    {this.state.isSignup  ?' SIGN IN ' : ' SIGN UP ' }</Button>
            </div>
        )
        
    }
}


const MapStatetoProps = state=>{
    return{
        loading : state.auth.loading,
        error : state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building  :  state.BurgerBuilder.building
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, IsSignin) => dispatch(actions.auth(email, password,IsSignin))
    };
};

export default connect(MapStatetoProps, mapDispatchToProps)(Auth);