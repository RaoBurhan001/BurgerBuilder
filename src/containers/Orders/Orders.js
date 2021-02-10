import React ,{Component} from'react';
import Order from'../../components/Order/Order';
import axios from'../../axios';
import withError from'../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions/index'
import { connect } from 'react-redux';
//  import Spinner from '../../components/UI/Modal/Spinner/Spinner';
class Orders extends Component{
     state={
        posts:[],
    //     loading :true
     }

    componentDidMount()
    {
      this.props.onFetchinit(this.props.token , this.props.userId)
     
    }
   Delete=(id,e)=>{

  console.log("Deleted")
    }


      
   
    render()
    {
        // let orders = <Spinner />;
        // if ( !this.props.loading ) {
        //     orders = 
        // }
        return (
<div>
    {
       
        this.props.order.map(o =>(
          <Order 
            key={o.id}
            ingredients={o.ingredients}
            price={o.price}
            // cancelled= {this.props.onDelete(o.id)}
            />
        ))
       
        
    }
     {/* <button className="btn btn-danger" onClick={(e) => this.Delete(this.props.order.id, e)}>Delete</button> */}

</div>

        )
    }
}

const MapStatetoProps = state =>{
    return {
        order: state.order.orders,
        loading : state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const MapDispatchtoProps = dispatch =>{
    return {
    onFetchinit : (token ,userId)=> dispatch(actionTypes.fetchInit(token,userId)),
    // onDelete : (id)=>dispatch(actionTypes.DeleteOrder(id))
    }
}

export default connect( MapStatetoProps ,MapDispatchtoProps) (withError( Orders,axios));