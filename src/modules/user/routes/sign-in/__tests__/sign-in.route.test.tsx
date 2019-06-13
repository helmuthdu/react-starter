import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialState } from '../../../stores/modules/user';
import SignInRoute from '../sign-in.route';

describe('Route -> SignIn component', () => {
  const props: any = {
    name: 'john doe'
  };

  const middlewares = [thunk];

  const store = configureMockStore(middlewares)({ user: initialState });

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <SignInRoute {...props} />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
