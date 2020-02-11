import React, { lazy } from 'react';
import { USER_ROUTES } from './routes';
import UserLayoutRoute from '../layouts/user/user.layout';

const SignInRoute = lazy(() => import('./sign-in/sign-in.route'));

export const routes = [
  <UserLayoutRoute key={USER_ROUTES.SIGN_IN} path={USER_ROUTES.SIGN_IN} component={SignInRoute} />
];

export default routes;
