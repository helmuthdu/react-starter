import React from 'react';
import { DefaultLayout } from '../../modules/user/layouts/default/default.layout';
import SignInRoute from '../../modules/user/pages/sign-in/sign-in.page';

const Page = () => (
  <DefaultLayout>
    <SignInRoute />
  </DefaultLayout>
);

export default Page;
