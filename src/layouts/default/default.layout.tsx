import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import './default.layout.css';

export const DefaultLayout = () => (
  <Fragment>
    <Outlet />
  </Fragment>
);

export default DefaultLayout;
