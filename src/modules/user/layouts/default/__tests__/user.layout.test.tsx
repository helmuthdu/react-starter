import { render } from '@testing-library/react';
import UserLayout from '../user.layout';

const component = () => <p>lorem ipsum</p>;

describe('layouts -> UserLayout component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<UserLayout>{component}</UserLayout>);
    expect(asFragment()).toMatchSnapshot();
  });
});
