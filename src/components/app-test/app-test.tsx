import type { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router';
import { vi } from 'vitest';

export const AppTest = ({ children }: { children: ReactNode }) => (
  <IntlProvider locale="en" onError={vi.fn()}>
    <MemoryRouter>{children}</MemoryRouter>
  </IntlProvider>
);
