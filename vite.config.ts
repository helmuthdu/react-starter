import React from '@vitejs/plugin-react';
import { join } from 'path';
import { defineConfig } from 'vite';

const config = {
  plugins: [React()],
  resolve: {
    alias: {
      '@': join(__dirname, 'src')
    }
  },
  css: {
    postcss: {
      plugins: [require('postcss-import'), require('postcss-nesting'), require('autoprefixer')]
    }
  }
};

if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  config.css.postcss.plugins.push(require('cssnano'));
}

export default defineConfig(config);
