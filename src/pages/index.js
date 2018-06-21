import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router-dom';

import DefaultLayoutRoute from '../layouts/DefaultLayout';
import AboutPage from './AboutPage/AboutPage';
import HomePage from './HomePage/HomePage';
import NotFoundPage from './NotFoundPage/NotFoundPage';

export const App = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <DefaultLayoutRoute exact path="/" component={HomePage} />
        <DefaultLayoutRoute path="/about" component={AboutPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </ConnectedRouter>
  );
};

export default hot(module)(App);
