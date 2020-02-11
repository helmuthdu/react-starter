import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { UserLayout, UserLayoutRoute } from '../user.layout';

const component = () => <p>lorem ipsum</p>;

describe('user/layouts -> UserLayout component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<UserLayout>{component}</UserLayout>);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('user/layouts -> UserLayoutRoute component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UserLayoutRoute component={component} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
