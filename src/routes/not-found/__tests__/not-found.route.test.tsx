import { render } from '@testing-library/react';
import NotFoundRoute from '../not-found.route';

describe('Route -> NotFound', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<NotFoundRoute />);

    expect(asFragment()).toMatchSnapshot();
  });
});
