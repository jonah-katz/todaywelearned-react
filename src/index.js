import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'sanitize.css/sanitize.css';
import initReactFastclick from 'react-fastclick';

import configureStore from './store';
import Routes from './routes';

const store = configureStore();

initReactFastclick();

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
