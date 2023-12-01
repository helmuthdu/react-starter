import './default.layout.css';
import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

export const DefaultLayout = () => (
  <Fragment>
    <Outlet />
  </Fragment>
);

export default DefaultLayout;
