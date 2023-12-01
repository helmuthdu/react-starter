import { render } from '@testing-library/react';
import React from 'react';
import { DefaultLayout } from '../default.layout';

describe('layouts -> DefaultLayout component', () => {
  it('should be defined', () => {
    const { asFragment } = render(<DefaultLayout />);

    expect(asFragment()).toBeDefined();
  });
});
