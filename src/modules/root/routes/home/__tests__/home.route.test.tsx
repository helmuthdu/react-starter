import { mount } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import HomeRoute from '../home.route';
import thunk from 'redux-thunk';

describe('Route -> Home', () => {
  const initialState = { loading: { count: 1 } };

  const middlewares = [thunk];

  const store = configureMockStore(middlewares)({ loading: initialState });

  it('should match snapshot', () => {
    const wrapper = mount(
      <Provider store={store}>
        <HomeRoute />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
