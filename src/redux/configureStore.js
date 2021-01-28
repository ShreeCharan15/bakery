import {createStore , combineReducers, applyMiddleware} from 'redux';
import {Cart} from './cart'
import thunk from 'redux-thunk';
import { Home } from './home';
import { Cookies } from './cookies';
import { Cakes } from './cakes';
import { Others } from './others';

export const ConfigureStore=()=>{
    const store= createStore(
     combineReducers({
      cart:Cart,
      home:Home,
      cookies:Cookies,
      cakes:Cakes,
      others:Others
     }),
     applyMiddleware(thunk)
    );
    return store;
  }