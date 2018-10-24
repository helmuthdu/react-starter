import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import NotFound from './NotFound';

describe('Route -> NotFound component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<NotFound />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
