import { lazy } from 'react';
import { HOME_ROUTES } from './paths';

const DefaultLayout = lazy(() => import('../../../layouts/default/default.layout'));
const HomeRoute = lazy(() => import('./home/home.route'));
const AboutRoute = lazy(() => import('./about/about.route'));

export const routes = [
  {
    path: HOME_ROUTES.ROOT,
    element: <DefaultLayout />,
    children: [
      { index: true, element: <HomeRoute /> },
      { path: HOME_ROUTES.ABOUT, element: <AboutRoute /> },
    ],
  },
];
