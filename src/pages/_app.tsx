import { StoreProvider } from '@/stores';
import { AppInitialProps } from 'next/app';
import { AppContext } from 'next/dist/pages/_app';
import { IntlProvider } from 'react-intl';

import '../styles/all.scss';

const App = ({ Component, pageProps, locale, messages }: any) => {
  return (
    <StoreProvider logger={process.env.NODE_ENV === 'development'}>
      <IntlProvider locale={locale} messages={messages}>
        <Component {...pageProps} />
      </IntlProvider>
    </StoreProvider>
  );
};

App.getInitialProps = async ({ Component, ctx }: AppContext): Promise<AppInitialProps & Record<string, any>> => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  const { req } = ctx;
  const { locale, messages } = req || window.__NEXT_DATA__.props;

  return { pageProps, locale, messages };
};

export default App;
