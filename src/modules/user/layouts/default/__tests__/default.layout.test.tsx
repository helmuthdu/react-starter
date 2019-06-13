import { render } from '@testing-library/react';
import React from 'react';
import DefaultLayout from '../default.layout';

const component = () => <p>lorem ipsum</p>;

describe('layouts -> DefaultLayout component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<DefaultLayout>{component}</DefaultLayout>);
    expect(asFragment()).toMatchSnapshot();
  });
});
