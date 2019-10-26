import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import HomeRoute from '../home.route';

describe('Route -> Home', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <HomeRoute />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
