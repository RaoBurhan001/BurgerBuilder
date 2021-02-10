import * as actionTypes from './actions'; 
import axios from'../../axios';
export const addIngredient = (name)=>{
    return {
        type :actionTypes.ADD_INGREDIENTS,
        ingredientName : name
    }
}

export const removeIngredient = (name)=>{
    return {
        type :actionTypes.REMOVE_INGREDIENTS,
        ingredientName : name
    }
}

export const SetIngredients = (name)=>{
    return {type:actionTypes.SET_INGREDIENTS,
    ingredients:name}
}

export const FailedFetch=()=>{
    return {
        type: actionTypes.FAILED_FETCH
    }
}

export const FetchIngredients=()=>{
    return dispatch=>(
            axios.get('https://burgerbuilder-d12e5.firebaseio.com/ingredients.json')
    .then(response=>{
        dispatch(SetIngredients(response.data))})

    .catch(error=>{
        dispatch(FailedFetch())
    })  
    )
}