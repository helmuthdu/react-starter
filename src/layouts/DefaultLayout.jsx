// @flow
import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import './DefaultLayout.scss';

export const DefaultLayout = ({ children }: any) => {
  return <Fragment>{children}</Fragment>;
};

export const DefaultLayoutRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(matchProps: any) => (
        <DefaultLayout>
          <Component {...matchProps} />
        </DefaultLayout>
      )}
    />
  );
};

export default DefaultLayoutRoute;
