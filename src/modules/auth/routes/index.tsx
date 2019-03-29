import React, { lazy } from 'react';
import DefaultLayoutRoute from '../layouts/default.layout';

const SignInRoute = lazy(() => import('./sign-in/sign-in.route'));

export enum AUTH_ROUTES {
  SIGN_IN = '/sign-in'
}

export const routes = [
  <DefaultLayoutRoute key={AUTH_ROUTES.SIGN_IN} path={AUTH_ROUTES.SIGN_IN} component={SignInRoute} />
];

export default routes;
