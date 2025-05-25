import type { PropsWithChildren } from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router';
import { vi } from 'vitest';

export const AppTest = ({ children }: PropsWithChildren) => (
  <IntlProvider locale="en" onError={vi.fn()}>
    <MemoryRouter>{children}</MemoryRouter>
  </IntlProvider>
);
