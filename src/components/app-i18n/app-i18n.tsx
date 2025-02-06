import { type Locale, useLocale } from '@/locales';
import type { FC, JSXElementConstructor, ReactElement } from 'react';
import { IntlProvider } from 'react-intl';

// biome-ignore lint/suspicious/noExplicitAny: -
export const AppI18n: FC<{ locale: Locale; children: ReactElement<any, string | JSXElementConstructor<any>> }> = ({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactElement;
}) => {
  const [localeStorage] = useLocale(locale);

  return (
    <IntlProvider locale={localeStorage.locale} messages={localeStorage.messages} onError={() => undefined}>
      {children}
    </IntlProvider>
  );
};
