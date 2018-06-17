import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './pages';

import registerServiceWorker from './registerServiceWorker';
import store, { history } from './store';

const target = document.querySelector('#root');

render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  target
);

registerServiceWorker();
