import * as React from 'react';
import { lazy } from 'react';
import { USER_ROUTES } from './paths';
import DefaultLayoutRoute from '../layouts/default/default.layout';

const SignInRoute = lazy(() => import('./sign-in/sign-in.route'));

export const routes = [
  <DefaultLayoutRoute key={USER_ROUTES.SIGN_IN} path={USER_ROUTES.SIGN_IN} component={SignInRoute} />
];

export default routes;
