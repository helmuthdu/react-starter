import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';

const container = document.getElementById('root');
createRoot(container as HTMLElement).render(<App />);
