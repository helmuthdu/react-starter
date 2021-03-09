import { fetchLocaleMessages, localeStore } from '@/stores/locale.store';
import { AppInitialProps } from 'next/app';
import { AppContext } from 'next/dist/pages/_app';
import { useEffect, useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import { RecoilRoot, useRecoilState } from 'recoil';

import '../styles/all.scss';

export const I18n = ({ children }: any) => {
  const [{ locale, messages }, setLocale] = useRecoilState(localeStore);

  useEffect(() => {
    fetchLocaleMessages(locale).then((messages = {}) => {
      setLocale(state => ({ ...state, messages }));
    });
  }, [locale]);

  return useMemo(
    () => (
      <IntlProvider locale={locale} messages={messages}>
        {children}
      </IntlProvider>
    ),
    [messages]
  );
};

const App = ({ Component, pageProps }: any) => (
  <RecoilRoot>
    <I18n>
      <Component {...pageProps} />
    </I18n>
  </RecoilRoot>
);

App.getInitialProps = async ({ Component, ctx }: AppContext): Promise<AppInitialProps & Record<string, any>> => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

export default App;
