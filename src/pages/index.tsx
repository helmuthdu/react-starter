import DefaultLayout from '@/layouts/default/default.layout';
import HomePage from '../modules/root/pages/home/home.page';

const Page = (): JSX.Element => (
  <DefaultLayout>
    <HomePage />
  </DefaultLayout>
);

export default Page;