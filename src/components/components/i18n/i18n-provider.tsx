import React, { useEffect } from 'react';
import { Http } from '../../../utils';
import isEqual from 'lodash/isEqual';
import { IntlProvider } from 'react-intl';
import { useStorage } from '../../../hooks/storage.hook';
import { LocaleMessages, LocaleStorageID, SupportedLanguages } from './i18n';

const loadTranslationsAsync = async (language: string): Promise<Record<string, string> | undefined> =>
  await Http.get<Record<string, string>>(`${process.env.PUBLIC_URL}/locales/${language}.json`);

export const I18nProvider = ({ locale, children }: { locale: SupportedLanguages; children: any }) => {
  const [localeStorage, setLocaleStorage] = useStorage<LocaleMessages>(LocaleStorageID, { locale, messages: {} });

  useEffect(() => {
    loadTranslationsAsync(locale).then((res = {}) => {
      if (!isEqual(localeStorage.messages, res)) {
        setLocaleStorage({ locale, messages: res });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IntlProvider locale={locale} messages={localeStorage.messages} onError={() => undefined}>
      {children}
    </IntlProvider>
  );
};
