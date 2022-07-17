import React from '@vitejs/plugin-react';
import { join } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [React()],
  resolve: {
    alias: {
      '@': join(__dirname, 'src')
    }
  }
});
