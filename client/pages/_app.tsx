import withRedux from 'next-redux-wrapper';
import App from 'next/app';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { State, stores } from '../modules';
import createStore from '../stores';
import * as rootStores from '../stores/modules';

export type AppState = State & rootStores.State;

class Applet extends App {
  public static async getInitialProps({ Component, router, ctx }: any) {
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

  public render() {
    const { Component, pageProps, locale, messages, store } = this.props as any;

    return (
      <IntlProvider locale={locale} messages={messages}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </IntlProvider>
    );
  }
}
export default withRedux(() => createStore([...rootStores.stores, ...stores]))(Applet);