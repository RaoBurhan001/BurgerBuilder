
import * as actionTypes from './actions'
import axios from 'axios';
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (idToken,userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
      idToken: idToken,
      userId:userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAILURE,
        error: error
    };
};

export const logout =()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        
        type: actionTypes.LOGOUT
    }
}


export const checkAuth = (expiration)=>{
    return dispatch=>{
        setTimeout(()=>{
          dispatch(logout())
        }, expiration *1000)
    }
}



export const auth = (email, password,IsSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
        
            email :email,
            password: password,
            returnSecureToken: true
        }
       console.log(authData)
       let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB0wRjW-q34ShwgZk3D_Cz3LZgvk8v99Mg'
       if(!IsSignup)
       {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB0wRjW-q34ShwgZk3D_Cz3LZgvk8v99Mg'
       }

        axios.post(url ,  authData)
        .then(response  =>{
            console.log(response)
            const expirationdate=  new Date(new Date().getTime() + response.data.expiresIn *1000)  //current date + expiration time
            localStorage.setItem('token', response.data.idToken)
            localStorage.setItem('expirationdate', expirationdate)
            localStorage.setItem('userId', response.data.localId);
          dispatch(authSuccess(response.data.idToken, response.data.localId))
          dispatch (checkAuth(response.data.expiresIn))
        }).catch(error=>{
            dispatch(authFail(error.response.data.error))
        })
        
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
               
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch( checkAuth((expirationDate.getTime() - new Date().getTime()) / 1000 )); //the amount of seconds after we should log out
            } else {
                dispatch(logout());
            
            }   
        }
    };
};