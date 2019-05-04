import { mount } from 'enzyme';
import React from 'react';
import AboutRoute from '../about.route';

describe('Route -> About', () => {
  it('should match snapshot', () => {
    const wrapper = mount(<AboutRoute />);
    expect(wrapper).toMatchSnapshot();
  });
});
