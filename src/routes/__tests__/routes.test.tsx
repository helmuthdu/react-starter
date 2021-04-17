import { render } from '@testing-library/react';
import React from 'react';
import AppRouter from '../index';
import { StoreProvider } from '../../stores';

describe('App router', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <StoreProvider logger={process.env.NODE_ENV === 'development'}>
        <AppRouter routes={[]} />
      </StoreProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
