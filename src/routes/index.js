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

export const MAIN_ROUTES = Object.freeze({
  ABOUT: '/about',
  HOME_PAGE: '/',
  NOT_FOUND: '*'
});

export const AppRoutes = ({ routes }) => {
  return (
    <Switch>
      {routes && routes.reduce((a, b) => a.concat(b), [])}
      <DefaultLayoutRoute path={MAIN_ROUTES.ABOUT} component={About} />
      <DefaultLayoutRoute path={MAIN_ROUTES.HOME_PAGE} component={HomePage} />
      <Route path={MAIN_ROUTES.NOT_FOUND} component={NotFound} />
    </Switch>
  );
};

export const AppRouter = ({ history, routes }) => {
  return (
    <ConnectedRouter history={history}>
      <Frontload noServerRender>
        <AppRoutes routes={routes} />
      </Frontload>
    </ConnectedRouter>
  );
};

export default hot(module)(AppRouter);
