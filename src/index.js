import React from 'react';
import { render, hydrate } from 'react-dom';
import App from './app';

const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}
