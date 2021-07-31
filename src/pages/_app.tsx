import { Http } from '@/utils';
import { AppInitialProps } from 'next/app';
import { AppContext } from 'next/dist/pages/_app';
import { IntlProvider } from 'react-intl';
import { RecoilRoot } from 'recoil';

import '../styles/all.scss';

const loadTranslationsAsync = async (url: string, language: string): Promise<Record<string, string> | undefined> =>
  await Http.get<Record<string, string>>(`http://${url}/static/locales/${language}.json`);

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
  const messages = await loadTranslationsAsync(ctx.req?.headers.host as string, locale);
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

  return { locale, messages, pageProps };
};

export default App;
