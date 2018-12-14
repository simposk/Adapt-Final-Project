import { routerMiddleware } from 'react-router-redux';
import ReduxThunk from 'redux-thunk';
import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import { apiMiddleware } from 'redux-api-middleware';

import rootReducer from '../reducers/index';

let composeEnhancers = compose;

if (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

const initStore = (history, initialState = {}) => createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      ReduxThunk,
      apiMiddleware,
    ),
  ),
);

export default initStore;
