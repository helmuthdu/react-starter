import { ConnectedRouter } from 'connected-react-router';
import React, { Suspense } from 'react';
import { Redirect } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import NotFoundRoute from './NotFound/NotFoundRoute';

export const AppRoutes = ({ routes }: any) => {
  return (
    <Suspense fallback={null}>
      <Switch>
        {routes && routes.length && routes.reduce((acc: any, curr: any) => [...acc, curr], [])}
        <Route path="/not-found" component={NotFoundRoute} />
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