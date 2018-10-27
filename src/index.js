// @flow
import React from 'react';
import { hydrate, render } from 'react-dom';
import { Provider } from 'react-redux';
import authModule from './modules/auth';

import mainModule from './modules/main';

import AppRouter from './routes';

import * as serviceWorker from './serviceWorker';
import createStore from './store';

const { store, history } = createStore([authModule.store]);

const app = (
  <Provider store={store}>
    <AppRouter history={history} routes={[mainModule.routes, authModule.routes]} />
  </Provider>
);

const root = document.querySelector('#root');

if (process.env.NODE_ENV === 'production') {
  // If we're running in production, we use hydrate to get fast page loads by just
  // attaching event listeners after the initial render
  hydrate(app, root);
} else {
  // If we're not running on the server, just render like normal
  render(app, root);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
