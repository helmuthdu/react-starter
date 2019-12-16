import React, { lazy } from 'react';
import { USER_URL } from './paths';
import UserLayoutRoute from '../layouts/user/user.layout';

const SignInRoute = lazy(() => import('./sign-in/sign-in.route'));

export const routes = [<UserLayoutRoute key={USER_URL.SIGN_IN} path={USER_URL.SIGN_IN} component={SignInRoute} />];
