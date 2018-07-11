import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { Frontload } from 'react-frontload';
import { hot } from 'react-hot-loader';
import Loadable from 'react-loadable';
import { Route, Switch } from 'react-router-dom';

import DefaultLayoutRoute from '../layouts/DefaultLayout';
import NotFound from './NotFound/NotFound';

const HomePage = Loadable({
  loader: () => import('./HomePage/HomePage'),
  loading: () => null
});

const About = Loadable({
  loader: () => import('./About/About'),
  loading: () => null
});

export const AppRoutes = () => {
  return (
    <Switch>
      <DefaultLayoutRoute exact path="/" component={HomePage} />
      <DefaultLayoutRoute path="/about" component={About} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export const AppRouter = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <Frontload noServerRender>
        <AppRoutes />
      </Frontload>
    </ConnectedRouter>
  );
};

export default hot(module)(AppRouter);
