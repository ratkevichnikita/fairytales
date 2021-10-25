import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import sortingReducers from "./sortingReducers";
import FairytalesListReducer from "./FairytalesListReducer";
import SearchReducer from "./SearchReducer";
import LoginReducer from "./LoginReducer";
import thunkMiddleWare from "redux-thunk";

let reducers = combineReducers({
  sorting: sortingReducers,
  fairytalesList: FairytalesListReducer,
  searching: SearchReducer,
  login: LoginReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)));

window.store = store;

export default  store;