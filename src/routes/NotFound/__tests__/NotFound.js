import { shallow } from 'enzyme';
import React from 'react';
import NotFound from '../NotFound';

describe('Route -> NotFound component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper).toMatchSnapshot();
  });
});
