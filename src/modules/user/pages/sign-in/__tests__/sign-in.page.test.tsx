import { AppTest } from '@/components/utils/app-test';
import { render } from '@testing-library/react';
import SignInPage from '../sign-in.page';

describe('user/page -> SignIn', () => {
  const props: any = {};

  it('should match snapshot', () => {
    const { asFragment } = render(
      <AppTest>
        <SignInPage {...props} />
      </AppTest>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
