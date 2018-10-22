// @flow
import React from 'react';
import { hydrate, render } from 'react-dom';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';

import * as serviceWorker from './serviceWorker';

import mainModule from './modules/main';
import authModule from './modules/example';

import AppRouter from './routes';
import createStore from './store';

const { store, history } = createStore([authModule.store]);

const app = (
  <Provider store={store}>
    <AppRouter history={history} routes={[authModule.routes, mainModule.routes]} />
  </Provider>
);

const root = document.querySelector('#root');

if (process.env.NODE_ENV === 'production') {
  // If we're running in production, we use hydrate to get fast page loads by just
  // attaching event listeners after the initial render
  Loadable.preloadReady().then(() => {
    hydrate(app, root);
  });
} else {
  // If we're not running on the server, just render like normal
  render(app, root);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
