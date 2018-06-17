import { shallow } from 'enzyme';
import React from 'react';
import NotFoundPage from './NotFoundPage';

it('renders without crashing', () => {
  const wrapper = shallow(<NotFoundPage />);
  expect(wrapper.instance()).toBeNull();
});
