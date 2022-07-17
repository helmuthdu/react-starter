import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import './user.layout.css';

export const UserLayout = () => (
  <Fragment>
    <Outlet />
  </Fragment>
);

export default UserLayout;
