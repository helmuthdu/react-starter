import { render } from '@testing-library/react';
import AboutRoute from '../about.route';

describe('Route -> About', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<AboutRoute />);

    expect(asFragment()).toMatchSnapshot();
  });
});
