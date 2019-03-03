import { shallow } from 'enzyme';
import React from 'react';
import NotFoundRoute from '../not-found.route';

describe('Route -> NotFound', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<NotFoundRoute />);
    expect(wrapper).toMatchSnapshot();
  });
});
