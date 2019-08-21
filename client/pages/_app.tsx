import App, { Container } from 'next/app';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import * as rootStores from '../stores/modules';
import { State, stores } from '../modules';
import createStore from '../stores';

declare const window: any;

export type AppState = State & rootStores.State;

export default class extends App {
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
    // @ts-ignore
    const { Component, pageProps, locale, messages } = this.props;

    return (
      <Container>
        <IntlProvider locale={locale} messages={messages}>
          <Provider store={createStore([...rootStores.stores, ...stores])}>
            <Component {...pageProps} />
          </Provider>
        </IntlProvider>
      </Container>
    );
  }
}
