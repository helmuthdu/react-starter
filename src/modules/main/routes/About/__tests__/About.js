import { shallow } from 'enzyme';
import React from 'react';
import About from '../About';

describe('Route -> About component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<About />);
    expect(wrapper).toMatchSnapshot();
  });
});
