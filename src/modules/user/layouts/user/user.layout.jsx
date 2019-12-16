import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import './user.layout.scss';

export const UserLayout = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};

UserLayout.propTypes = {
  children: PropTypes.node
};

export const UserLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <UserLayout>
          <Component {...matchProps} />
        </UserLayout>
      )}
    />
  );
};

UserLayoutRoute.propTypes = {
  component: PropTypes.elementType
};

export default UserLayoutRoute;
