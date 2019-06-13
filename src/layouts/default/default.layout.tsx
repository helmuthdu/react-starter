import * as React from 'react';
import { Fragment } from 'react';
import { Route, RouteProps } from 'react-router-dom';

import './default.layout.scss';

export const DefaultLayout = ({ children }: { children: React.ReactNode }) => <Fragment>{children}</Fragment>;

// eslint-disable-next-line
export const DefaultLayoutRoute = ({ component: Component, ...rest }: { component: any } & RouteProps) => (
  <Route
    {...rest}
    render={(matchProps: object) => (
      <DefaultLayout>
        <Component {...matchProps} />
      </DefaultLayout>
    )}
  />
);

export default DefaultLayoutRoute;
