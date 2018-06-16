import { shallow } from 'enzyme';
import React from 'react';
import NotFoundPage from './NotFoundPage';

it('renders without crashing', () => {
  shallow(<NotFoundPage />);
});
