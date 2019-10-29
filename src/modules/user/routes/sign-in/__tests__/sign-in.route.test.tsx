import { render } from '@testing-library/react';
import React from 'react';
import { AppTest } from '../../../../../components/utils/app-test';
import SignInRoute from '../sign-in.route';

describe('Route -> SignIn component', () => {
  const props: any = {};

  it('should match snapshot', () => {
    const { asFragment } = render(
      <AppTest>
        <SignInRoute {...props} />
      </AppTest>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
