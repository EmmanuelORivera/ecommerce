import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';

// Styles
import './Styles/main.scss';
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
