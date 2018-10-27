import { shallow } from 'enzyme';
import React from 'react';
import NotFound from '../NotFound';

describe('Route -> NotFound component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper).toMatchSnapshot();
  });
});
