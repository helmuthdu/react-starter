import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../stores';
import AppRouter from '../index';

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
