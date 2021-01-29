import {createStore , combineReducers, applyMiddleware} from 'redux';
import {Cart} from './cart'
import thunk from 'redux-thunk';
import { Home } from './home';
import { Cookies } from './cookies';
import { Cakes } from './cakes';
import { Others } from './others';
import { User } from './user';
import { Orders } from './orders';

export const ConfigureStore=()=>{
    const store= createStore(
     combineReducers({
      cart:Cart,
      home:Home,
      cookies:Cookies,
      cakes:Cakes,
      others:Others,
      user:User,
      orders:Orders,
     }),
     applyMiddleware(thunk)
    );
    return store;
  }