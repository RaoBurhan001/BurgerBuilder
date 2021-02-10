// import React, { Component } from 'react';
import * as actionTypes from '../actions/actions';

const initialState = {
    ingredients: null,
    total: 200,
    // purchasable: false,
    error: false,
    building: false
};
const PRICE={
    salad:50,
    bacon:200,
    cheese:150,
    meat:300
}
const getReducer=( state = initialState, action ) => {
if (action.type=== actionTypes.ADD_INGREDIENTS)
{
    
return {
    ...state,
    ingredients:{
        ...state.ingredients,  //dig deeper into ingredients
        [action.ingredientName]: state.ingredients[action.ingredientName] +1  // salad:1
    },
    total: state.total + PRICE[action.ingredientName],
    
    // purchasable : state.ingredients ? true : false,
    building : true
}

}
 if(action.type === actionTypes.REMOVE_INGREDIENTS)
{
return{
    ...state,
    ingredients :{
        ...state.ingredients,
        [action.ingredientName]: state.ingredients[action.ingredientName] -1
    },
     total: state.total - PRICE[action.ingredientName],
    //  purchasable :state.ingredients ? true : false,   //state.total < 200 && !state.ingredients ? true : false
     building : true
}
}
if( action.type === actionTypes.SET_INGREDIENTS)
{
    return {
        ...state,
        ingredients :{
            salad:action.ingredients.salad,
            bacon:action.ingredients.bacon,
            meat:action.ingredients.meat,
            cheese:action.ingredients.cheese
        },
        total:200,
        error:false,
        building: false
    }
} 

if( action.type === actionTypes.FAILED_FETCH)
{
    return {
        ...state,
       
        error:true
    }
} 


return state;
}

// return ()


export default getReducer;