import { UserLayout } from '../../modules/user/layouts/default/user.layout';
import SignInRoute from '../../modules/user/pages/sign-in/sign-in.page';

const Page = () => (
  <UserLayout>
    <SignInRoute />
  </UserLayout>
);

export default Page;
