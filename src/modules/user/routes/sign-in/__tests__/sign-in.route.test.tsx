import { mount } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialState } from '../../../stores/modules/user';
import SignInRoute from '../sign-in.route';

describe('Route -> SignIn component', () => {
  const props = {
    name: 'john doe'
  };

  const middlewares = [thunk];

  const store = configureMockStore(middlewares)({ user: initialState });

  it('should match snapshot', () => {
    const wrapper = mount(
      <Provider store={store}>
        <SignInRoute {...props} />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
