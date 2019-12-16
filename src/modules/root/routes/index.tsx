import React, { lazy } from 'react';
import DefaultLayoutRoute from '../../../layouts/default/default.layout';
import { ROOT_URL } from './paths';

const HomeRoute = lazy(() => import('./home/home.route'));
const AboutRoute = lazy(() => import('./about/about.route'));

export const routes = [
  <DefaultLayoutRoute key={ROOT_URL.ABOUT} path={ROOT_URL.ABOUT} component={AboutRoute} />,
  <DefaultLayoutRoute key={ROOT_URL.HOME} exact path={ROOT_URL.HOME} component={HomeRoute} />
];
