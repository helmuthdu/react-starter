import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
// modules
import { stores } from '../modules';
// store
import createStore from '../stores';
import * as rootStores from '../stores/modules';

export type AppState = authModule.State & {
  loading: rootStores.loading.State;
};

export default class extends App {
  public render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Provider store={createStore([...Object.values(rootStores), ...stores])}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}
