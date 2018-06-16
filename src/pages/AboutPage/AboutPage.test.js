import { shallow } from 'enzyme';
import React from 'react';
import AboutPage from './AboutPage';

it('renders without crashing', () => {
  shallow(<AboutPage />);
});
