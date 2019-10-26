import { render } from '@testing-library/react';
import React from 'react';
import AboutPage from '../about.page';

describe('home/page -> About', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<AboutPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
