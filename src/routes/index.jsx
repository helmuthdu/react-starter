// @flow
import { ConnectedRouter } from 'connected-react-router';
import React, { Suspense } from 'react';
import { Redirect } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import NotFound from './NotFound/NotFound';

export const AppRoutes = ({ routes }: any) => {
  return (
    <Suspense fallback={null}>
      <Switch>
        {routes && routes.length && routes.reduce((a, b) => [...a, b], [])}
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </Suspense>
  );
};

export const AppRouter = ({ history, routes }: any) => {
  return (
    <ConnectedRouter history={history}>
      <AppRoutes routes={routes} />
    </ConnectedRouter>
  );
};

export default AppRouter;
