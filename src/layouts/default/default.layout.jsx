import PropTypes from 'prop-types';
import React from 'react';
import { Fragment } from 'react';
import { Route } from 'react-router-dom';

import './default.layout.scss';

export const DefaultLayout = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};

DefaultLayout.propTypes = {
  children: PropTypes.node
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

DefaultLayoutRoute.propTypes = {
  component: PropTypes.elementType
};

export default DefaultLayoutRoute;
