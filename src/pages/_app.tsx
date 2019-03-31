import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
// modules
import * as authModule from '../modules/auth';
// store
import createStore from '../store';
import * as store from '../store/modules';

export type AppState = authModule.State & {
  loading: store.loading.State;
};

export default class extends App {
  public render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Provider store={createStore([...authModule.stores, ...Object.values(store)])}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}
