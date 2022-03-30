import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(<App />);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
