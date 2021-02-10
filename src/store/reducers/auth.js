import * as actionTypes from '../actions/actions'

const initialState={
    token:null,
    userId:null,
    loading : false,
    error: null,
   
}

const reducer = (state=initialState,actions)=>
{
if(actions.type === actionTypes.AUTH_START)
{
    return {
        ...state,
        loading:true,
        error: null
    }
}


if(actions.type === actionTypes.AUTH_SUCCESS)
{
    return {
        ...state,
        token:actions.idToken,
        userId: actions.userId,
        loading:false,
        error: null
    }
}

if(actions.type === actionTypes.LOGOUT)
{
    return {
        ...state,
        token: null,
        userId: null
    }
}


if(actions.type === actionTypes.AUTH_FAILURE)
{
    return {
        ...state,
        loading:false,
        error: actions.error
    }
}
return state
}

export default reducer;