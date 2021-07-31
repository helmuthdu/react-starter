import { Http } from '@/utils';
import { AppInitialProps } from 'next/app';
import { AppContext } from 'next/dist/pages/_app';
import { IntlProvider } from 'react-intl';
import { RecoilRoot } from 'recoil';

import '../styles/all.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const App = ({ Component, pageProps, locale, messages }: any) => (
  <RecoilRoot>
    <IntlProvider locale={locale} messages={messages} onError={() => undefined}>
      <Component {...pageProps} />
    </IntlProvider>
  </RecoilRoot>
);

App.getInitialProps = async ({ Component, ctx }: AppContext): Promise<AppInitialProps & Record<string, any>> => {
  const locale = (ctx.locale ?? ctx.defaultLocale) as string;
  const messages = await Http.get(`http://${ctx.req?.headers.host}/static/locales/${locale}.json`);
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

  return { locale, messages, pageProps };
};

export default App;
