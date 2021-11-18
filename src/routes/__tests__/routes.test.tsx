import { render } from '@testing-library/react';
import React from 'react';
import AppRouter from '../index';
import { Provider } from 'react-redux';
import { store } from '../../stores';

describe('App router', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <AppRouter routes={[]} />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
