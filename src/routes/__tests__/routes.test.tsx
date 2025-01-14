import { render } from '@testing-library/react';
import AppRouter from '../index';

describe('App router', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<AppRouter routes={[]} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
