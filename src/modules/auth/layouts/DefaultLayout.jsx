import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import './DefaultLayout.scss';

export const DefaultLayout = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};

export const DefaultLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <DefaultLayout>
          <Component {...matchProps} />
        </DefaultLayout>
      )}
    />
  );
};

export default DefaultLayoutRoute;
