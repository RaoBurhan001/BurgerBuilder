import * as actionTypes from'../actions/actions';

 const initialstate ={
    orders:[],
    loading :false,
    purchased: false
}
 const reducer =(state=initialstate, action)=>{

  
    if(action.type === actionTypes.FETCH_START)
    {
        return {
            ...state,
            loading : true
        }
    }

    if(action.type === actionTypes.FETCH_FAILURE)
    {
        return {
            ...state,
            loading : false
        }
    }

    if(action.type === actionTypes.FETCH_SUCCESS)
    {
        return {
            ...state,
            orders : action.orders,
            loading : false
        }
    }
    if(action.type === actionTypes.PURCHASE_INIT)
    {
        return {
            ...state,
            purchased:false
        }
    }
    if(action.type === actionTypes.PURCHASE_BURGER_START)
    {
        return {
            ...state,
            loading:false
        }
    }
    if(action.type === actionTypes.PURCHASE_SUCCESS)
    {
        const newOrder= {
            ...action.orderdata,
            id: action.id,
            
        }
        return {
            ...state,
            orders: state.orders.concat(newOrder),
            purchased:true,
            loading : false
        }
    }
    if( action.type === actionTypes.PURCHASE_FAILURE )
    {
        return {
            ...state,
            loading:false
        }
    }
    // if(action.type === actionTypes.DELETE_SUCCESS)
    // { const neworders = state.orders.filter(item=> item.id !== action.id)
    //     return {
    //     ...state,
    //     orders: neworders,
    //     loading : true
    // }}
    return state;
 } 

 export default reducer;