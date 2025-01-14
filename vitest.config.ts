/// <reference types="vitest" />
import { join } from 'node:path';
import React from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [React()],
  resolve: {
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: [
      '**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      '**/__tests__/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
    setupFiles: './vitest.setup.ts',
    coverage: {
      reporter: ['text', 'lcov'],
    },
  },
});
