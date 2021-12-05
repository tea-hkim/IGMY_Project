import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';

const rootElement = document.getElementById('root');
=======
import App from './App';
>>>>>>> 8de3da5dbf2b7f277c7576a777a3213105be8edc

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  rootElement,
);
<<<<<<< HEAD
=======

>>>>>>> 8de3da5dbf2b7f277c7576a777a3213105be8edc
