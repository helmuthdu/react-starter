import { StoreProvider } from '@/stores';
import App, { AppInitialProps } from 'next/app';
import { AppContext } from 'next/dist/pages/_app';
import { IntlProvider } from 'react-intl';

import '../styles/all.scss';

export default class extends App {
  public static async getInitialProps({ Component, ctx }: AppContext): Promise<AppInitialProps & Record<string, any>> {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // Get the `locale` and `messages` from the request object on the server.
    // In the browser, use the same values that the server serialized.
    const { req } = ctx;
    const { locale, messages } = req || window.__NEXT_DATA__.props;

    return { pageProps, locale, messages };
  }

  public render(): JSX.Element {
    const { Component, pageProps, locale, messages } = this.props as any;

    return (
      <StoreProvider logger={process.env.NODE_ENV === 'development'}>
        <IntlProvider locale={locale} messages={messages}>
          <Component {...pageProps} />
        </IntlProvider>
      </StoreProvider>
    );
  }
}
