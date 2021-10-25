import {auth} from "../api/api";

const IS_AUTH = 'IS_AUTH';

let initialState = {
  loginPage: true,
  isAuth: JSON.parse(localStorage.getItem('fairytales_auth')) ? true : null,
}

const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
      case IS_AUTH:
       return {
         ...state,
         isAuth: action.auth,
       }
      default:
        return state
    }
};

export const  setUserAuth = (auth) => ({type:IS_AUTH, auth})

export const getAuth = () => {

  return (dispatch) => {
    auth.checkAuth().then(response => {
      if (response && response.data) {
        dispatch(setUserAuth(true))
      }
    })
  }
}

export default LoginReducer;