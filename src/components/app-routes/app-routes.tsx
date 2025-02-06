import { addLocaleToRoutePath } from '@/locales';
import { type FC, Suspense } from 'react';
import { type RouteObject, useRoutes } from 'react-router';

export const NotFoundRoute = () => (
  <div>
    <h1>You are here!</h1>
    <h2>But nothing found for you #404</h2>
  </div>
);

export const AppRoutes: FC<{ routes: RouteObject[] }> = ({ routes }: { routes: RouteObject[] }) => {
  const component = useRoutes([
    ...routes.map(addLocaleToRoutePath),
    {
      path: 'not-found',
      element: <NotFoundRoute />,
    },
    {
      path: '*',
      element: <NotFoundRoute />,
    },
  ]);

  return <Suspense fallback={null}>{component}</Suspense>;
};
