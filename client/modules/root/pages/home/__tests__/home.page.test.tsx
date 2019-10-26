import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import HomeRoute from '../home.page';
import thunk from 'redux-thunk';

describe('Route -> Home', () => {
  const initialState = { loading: { count: 1 } };

  const middleware = [thunk];

  const store = configureMockStore(middleware)({ loading: initialState });

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <HomeRoute />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
