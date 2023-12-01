import './default.layout.scss';
import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

export const DefaultLayout = () => (
  <Fragment>
    <Outlet />
  </Fragment>
);

export default DefaultLayout;
