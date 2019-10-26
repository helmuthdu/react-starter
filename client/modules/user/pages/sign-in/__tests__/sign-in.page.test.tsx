import { render } from '@testing-library/react';
import React from 'react';
import SignInPage from '../sign-in.page';

describe('user/page -> SignIn component', () => {
  const props: any = {
    name: 'john doe'
  };

  it('should match snapshot', () => {
    const { asFragment } = render(<SignInPage {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
