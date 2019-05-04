import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { initialState } from '../../../stores/modules/auth';
import SignInRoute, { Props } from '../sign-in.route';

describe('Route -> SignIn component', () => {
  const props = {
    name: 'john doe'
  };

  const store = configureMockStore()({ auth: initialState });

  it('should match snapshot', () => {
    const wrapper = mount(
      <Provider store={store}>
        <SignInRoute {...props} />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
