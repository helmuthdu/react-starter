import { shallow } from 'enzyme';
import React from 'react';
import { App } from './index';

describe('App component', () => {
  const history = {
    location: {
      path: '/'
    }
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<App history={history} />);
    expect(wrapper.instance()).toBeNull();
  });
});
