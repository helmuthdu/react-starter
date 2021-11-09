import { render } from '@testing-library/react';
import React from 'react';
import { UserLayout } from '../user.layout';

describe('user/layouts -> DefaultLayout component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<UserLayout />);
    expect(asFragment()).toBeDefined();
  });
});
