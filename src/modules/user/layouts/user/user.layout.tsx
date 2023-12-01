import './user.layout.scss';
import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

export const UserLayout = () => (
  <Fragment>
    <Outlet />
  </Fragment>
);

export default UserLayout;
