import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { UserLayout, UserLayoutRoute } from '../user.layout';

const Component = () => <p>lorem ipsum</p>;

describe('auth/layouts -> UserLayout component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <UserLayout>
        <Component />
      </UserLayout>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('auth/layouts -> DefaultLayoutRoute component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UserLayoutRoute component={Component} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
