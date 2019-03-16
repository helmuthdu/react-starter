import dynamic from 'next/dynamic';
import React from 'react';
import DefaultLayout from '../layouts/default.layout';

const SignIn = dynamic(() => import('./sign-in/sign-in.route'));

export const AUTH_ROUTES = Object.freeze({
  SIGN_IN: '/sign-in'
});

export const SignInRoute = () => {
  return <DefaultLayout component={SignIn} />;
};
