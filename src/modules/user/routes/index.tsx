import React, { lazy } from 'react';
import { USER_URL } from '../urls';
import DefaultLayoutRoute from '../layouts/default/default.layout';

const SignInRoute = lazy(() => import('./sign-in/sign-in.route'));

export const routes = [<DefaultLayoutRoute key={USER_URL.SIGN_IN} path={USER_URL.SIGN_IN} component={SignInRoute} />];
