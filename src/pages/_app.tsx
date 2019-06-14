import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
// modules
import { stores, State } from '../modules';
// store
import createStore from '../stores';
import * as rootStores from '../stores/modules';

declare const window: any;

// Register React Intl's locale data for the user's locale in the browser. This
// locale data was added to the page by `pages/_document.js`. This only happens
// once, on initial page load in the browser.
if (typeof window !== 'undefined' && window.ReactIntlLocaleData) {
  Object.keys(window.ReactIntlLocaleData).forEach(lang => {
    addLocaleData(window.ReactIntlLocaleData[lang]);
  });
}

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
    const initialNow = Date.now();

    return { pageProps, locale, messages, initialNow };
  }

  public render() {
    // @ts-ignore
    const { Component, pageProps, locale, messages, initialNow } = this.props;

    return (
      <Container>
        <IntlProvider locale={locale} messages={messages} initialNow={initialNow}>
          <Provider store={createStore([...rootStores.stores, ...stores])}>
            <Component {...pageProps} />
          </Provider>
        </IntlProvider>
      </Container>
    );
  }
}
