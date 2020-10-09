import React from 'react';
import { hydrate, render } from 'react-dom';
import App from './app';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root') as HTMLDivElement;
// Sentry.init({ dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0' });

if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
