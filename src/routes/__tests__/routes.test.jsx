import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import AppRouter from '../index';

describe('App router', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <AppRouter routes={[]} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
