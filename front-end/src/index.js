import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk';

import rootReducer from './reducer';
import './index.css';
import App from './app';

const history = createHistory({ basename: '/app' });
const composeEnhancers = typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk, routerMiddleware(history)),
);
const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route match="/" component={App} />
    </ConnectedRouter>
  </Provider>
, document.getElementById('root'));
