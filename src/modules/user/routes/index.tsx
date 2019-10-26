import React, { lazy } from 'react';
import { USER_ROUTES } from './routes';
import DefaultLayoutRoute from '../layouts/default/default.layout';

const SignInRoute = lazy(() => import('./sign-in/sign-in.route'));

export const routes = [
  <DefaultLayoutRoute key={USER_ROUTES.SIGN_IN} path={USER_ROUTES.SIGN_IN} component={SignInRoute} />
];
