import { shallow } from 'enzyme';
import React from 'react';
import AboutRoute from '../about.route';

describe('Route -> About', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<AboutRoute />);
    expect(wrapper).toMatchSnapshot();
  });
});
