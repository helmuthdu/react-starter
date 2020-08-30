import Head from 'next/head';
import React, { Fragment } from 'react';

export const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
      </Head>
      {children}
    </Fragment>
  );
};

export default DefaultLayout;
