import { render } from '@testing-library/react';
import React from 'react';
import SignInRoute from '../sign-in.route';

describe('Route -> SignIn component', () => {
  const props: any = {
    name: 'john doe'
  };

  it('should match snapshot', () => {
    const { asFragment } = render(<SignInRoute {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
