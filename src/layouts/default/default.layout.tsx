import { Fragment } from 'react';

export const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return <Fragment>{children}</Fragment>;
};

export default DefaultLayout;
