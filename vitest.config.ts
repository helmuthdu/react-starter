/// <reference types="vitest" />
import React from '@vitejs/plugin-react';
import { join } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [React()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: [
      '**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      '**/__tests__/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
    ],
    setupFiles: './vitest.setup.ts',
    coverage: {
      reporter: ['text', 'lcov']
    }
  },
  resolve: {
    alias: {
      '@': join(__dirname, 'src')
    }
  }
});
