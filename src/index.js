import React from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { DefaultLayoutRoute } from './layouts/DefaultLayout';
import AboutPage from './pages/AboutPage/AboutPage';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

import registerServiceWorker from './registerServiceWorker';
import store, { history } from './store';

const target = document.querySelector('#root');

const ConnectedSwitch = connect(state => ({
  location: state.location
}))(Switch);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ConnectedSwitch>
        <DefaultLayoutRoute exact path="/" component={HomePage} />
        <DefaultLayoutRoute path="/about" component={AboutPage} />
        <Route path="*" component={NotFoundPage} />
      </ConnectedSwitch>
    </ConnectedRouter>
  </Provider>,
  target
);
registerServiceWorker();
