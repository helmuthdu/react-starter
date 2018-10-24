import { shallow } from 'enzyme';
import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { AppRouter } from '.';

describe('App component', () => {
  const history = {
    location: {
      path: '/'
    }
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<AppRouter history={history} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
