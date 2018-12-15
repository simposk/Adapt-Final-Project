/* eslint-disable*/
import React from 'react';
import { render } from 'react-dom';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';

import App from './App';
import initialState from './initialState';
import initStore from './store';
import * as serviceWorker from './serviceWorker';

import './styles/main.scss';

const history = createBrowserHistory();
const store = initStore(history, initialState);

render(
  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app'),
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
