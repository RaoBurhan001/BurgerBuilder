import * as actionTypes from './actions';
import axios from '../../axios';
export const purchasesuccess=(id,orderdata)=>{
    return {
        type: actionTypes.PURCHASE_SUCCESS,
        id: id,
        orderdata: orderdata
    }
}

export const purchasefailure =(error)=>{
    return {
        type: actionTypes.PURCHASE_FAILURE,
        error:error
    }
}
export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};
export const PurchaseHandler=(orderData , token)=>{
    return dispatch => {
       dispatch( purchaseBurgerStart() );
        axios.post( '/orders.json?auth=' + token , orderData )
            .then( response => {
                console.log( response.data );
                dispatch(  purchasesuccess( response.data.name, orderData ) );
            } )
            .catch( error => {
                dispatch( purchasefailure( error ) );
            } );
    };
};


export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchstart = ()=>{
    return { type : actionTypes.FETCH_START}
}

export const fetchsuccess = (orders)=>{
   console.log("FETCH SUCCESS", orders)
    return{
        type: actionTypes.FETCH_SUCCESS,
        orders: orders
    }
}

export const fetchfailure = (error)=>{
    return {
        type: actionTypes.FETCH_FAILURE,
        error:error
    }
}

export const fetchInit = (token, userId)=>{
    return dispatch =>{
        dispatch(fetchstart())
        const QueryParams =   '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        console.log(token)
        console.log(userId)
        axios.get('/orders.json' + QueryParams)
        .then(res=>{
           let fetchOrders=[];
           for(let key in res.data)
           {
               fetchOrders.push({
                   ...res.data[key],
                   id:key
               })
           }
           console.log(fetchOrders)
           dispatch(fetchsuccess(fetchOrders))
        
        }).catch(error=>
        {
            dispatch(fetchfailure(error))
        })
    } 
}

// export const DeleteSuccesfully=()=>{
//     return {
//         type: actionTypes.DELETE_SUCCESS
//     }
// }


// export const DeleteFailure=(error)=>{
//     return {
//         type: actionTypes.DELETE_FAILURE,
//         error: error
//     }
// }



// export const DeleteOrder = (id)=>{
//     return dispatch=>{
//         axios.delete('/orders.json?auth=' + id)
//         .then(res => {
//           console.log(res);
//           console.log(res.data);
//         dispatch (DeleteSuccesfully())
//     }).catch(error=>{
//         dispatch(DeleteFailure(error))
//     })
// }}