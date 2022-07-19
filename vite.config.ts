import React from '@vitejs/plugin-react';
import { join } from 'path';
import { defineConfig } from 'vite';

const config = {
  plugins: [React()],
  css: {
    postcss: {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      plugins: [require('precss')({ stage: 0 })]
    }
  },
  resolve: {
    alias: {
      '@': join(__dirname, 'src')
    }
  }
};

if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  config.css.postcss.plugins.push(require('cssnano'));
}

export default defineConfig(config);
