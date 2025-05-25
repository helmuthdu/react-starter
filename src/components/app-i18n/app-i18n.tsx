import type { PropsWithChildren } from 'react';
import { IntlProvider } from 'react-intl';
import { type Locale, useLocale } from '../../locales';

export const AppI18n = ({ locale, children }: PropsWithChildren<{ locale: Locale }>) => {
  const [localeStorage] = useLocale(locale);

  return (
    <IntlProvider locale={localeStorage.locale} messages={localeStorage.messages} onError={() => undefined}>
      {children}
    </IntlProvider>
  );
};
