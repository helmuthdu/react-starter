import React, { lazy } from 'react';
import DefaultLayoutRoute from '../layouts/default.layout';

const SignInRoute = lazy(() => import('./sign-in/sign-in.route'));

export enum USER_ROUTES {
  SIGN_IN = '/sign-in'
}

export const routes = [
  <DefaultLayoutRoute key={USER_ROUTES.SIGN_IN} path={USER_ROUTES.SIGN_IN} component={SignInRoute} />
];

export default routes;
