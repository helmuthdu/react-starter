import dynamic from 'next/dynamic';
import * as React from 'react';
import DefaultLayout from '../layouts/default.layout';

const SignIn = dynamic(() => import('./sign-in/sign-in.route'));

export const SignInRoute = () => {
  return <DefaultLayout component={SignIn} />;
};

export const routes = { SignInRoute };
