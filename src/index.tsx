import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import AppRouter from './routes';
import createStore from './store';

import * as appStores from './store/modules';
import * as serviceWorker from './serviceWorker';

import * as authModule from './modules/auth';
import * as mainModule from './modules/main';

export type AppState = authModule.State & {
  loading: appStores.loading.State;
};

export const stores = [...authModule.stores, ...Object.values(appStores)];
export const routes = [...mainModule.routes, ...authModule.routes];

const start = () => {
  const { store, history } = createStore(stores);

  const app = (
    <Provider store={store}>
      <AppRouter history={history} routes={routes} />
    </Provider>
  );

  render(app, document.querySelector('#root'));

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: http://bit.ly/CRA-PWA
  serviceWorker.register();
};

// You can change this to make this app as a module them disable the
// start in when in production
if (process.env.NODE_ENV === 'production') {
  start();
} else {
  start();
}
