import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AppRoutes } from '..';
import { initialState } from '../../modules/user/stores/modules/user';

describe('App router', () => {
  const middlewares = [thunk];

  const store = configureMockStore(middlewares)({ user: initialState });

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <AppRoutes routes={[]} />
        </MemoryRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
