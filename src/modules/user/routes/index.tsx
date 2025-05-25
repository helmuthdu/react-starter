import { lazy } from 'react';
import { USER_ROUTES } from './paths';

const UserLayout = lazy(() => import('../layouts/user/user.layout'));
const SignInRoute = lazy(() => import('./sign-in/sign-in.route'));

export const routes = [
  {
    children: [{ element: <SignInRoute />, index: true }],
    element: <UserLayout />,
    path: USER_ROUTES.ROOT,
  },
];
