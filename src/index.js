import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {Provider } from 'react-redux';
import { ChakraProvider } from "@chakra-ui/react"
import { extendTheme } from "@chakra-ui/react"
import {ConfigureStore} from './redux/configureStore';

import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
const store = ConfigureStore();
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}
// 3. extend the theme
const theme = extendTheme({ config })
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
             <BrowserRouter>
             <ChakraProvider theme={theme}>
             <App />
             </ChakraProvider>
             

             </BrowserRouter>
             </Provider >
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
